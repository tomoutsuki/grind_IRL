import { InventoryItem, InventoryState, Recipe } from "../domain/types";
import {
  addItemToInventory,
  cloneInventory,
  consumeItem,
  getItemQuantity,
} from "./inventoryEngine";

export interface CraftStep {
  recipeId: string;
  times: number;
}

export interface CraftPlan {
  craftable: boolean;
  steps: CraftStep[];
  missing: InventoryItem[];
  inventoryAfter: InventoryState;
}

interface CraftContext {
  inventory: InventoryState;
  steps: CraftStep[];
  missing: Record<string, number>;
  recipeByOutput: Record<string, Recipe>;
}

export const indexRecipesById = (recipes: Recipe[]): Record<string, Recipe> => {
  const index: Record<string, Recipe> = {};
  for (const recipe of recipes) index[recipe.id] = recipe;
  return index;
};

export const indexRecipesByOutput = (recipes: Recipe[]): Record<string, Recipe> => {
  const index: Record<string, Recipe> = {};
  for (const recipe of recipes) {
    if (!index[recipe.output.itemId]) index[recipe.output.itemId] = recipe;
  }
  return index;
};

const recordStep = (steps: CraftStep[], recipeId: string): void => {
  const existing = steps.find((step) => step.recipeId === recipeId);
  if (existing) existing.times += 1;
  else steps.push({ recipeId, times: 1 });
};

const mapMissingToItems = (missing: Record<string, number>): InventoryItem[] => {
  return Object.entries(missing)
    .filter(([, quantity]) => quantity > 0)
    .map(([itemId, quantity]) => ({ itemId, quantity }));
};

function ensureItem(
  itemId: string,
  quantity: number,
  context: CraftContext,
  stack: Set<string>,
): boolean {
  if (getItemQuantity(context.inventory, itemId) >= quantity) return true;
  const recipe = context.recipeByOutput[itemId];
  if (!recipe || stack.has(itemId)) {
    const deficit = quantity - getItemQuantity(context.inventory, itemId);
    context.missing[itemId] = (context.missing[itemId] ?? 0) + Math.max(deficit, 0);
    return false;
  }
  stack.add(itemId);
  while (getItemQuantity(context.inventory, itemId) < quantity) {
    if (!craftRecipeOnce(recipe, context, stack)) {
      stack.delete(itemId);
      return false;
    }
  }
  stack.delete(itemId);
  return true;
}

function craftRecipeOnce(recipe: Recipe, context: CraftContext, stack: Set<string>): boolean {
  if (recipe.output.quantity <= 0) return false;
  for (const input of recipe.inputs) {
    if (!ensureItem(input.itemId, input.quantity, context, stack)) return false;
  }
  for (const input of recipe.inputs) {
    const consumed = consumeItem(context.inventory, input.itemId, input.quantity);
    if (!consumed.success) return false;
    context.inventory = consumed.inventory;
  }
  context.inventory = addItemToInventory(
    context.inventory,
    recipe.output.itemId,
    recipe.output.quantity,
  );
  recordStep(context.steps, recipe.id);
  return true;
}

export const buildCraftPlan = (
  targetRecipeId: string,
  recipes: Recipe[],
  inventory: InventoryState,
  craftTimes = 1,
): CraftPlan => {
  const recipeById = indexRecipesById(recipes);
  const rootRecipe = recipeById[targetRecipeId];
  const context: CraftContext = {
    inventory: cloneInventory(inventory),
    steps: [],
    missing: {},
    recipeByOutput: indexRecipesByOutput(recipes),
  };
  if (!rootRecipe || craftTimes < 1) {
    return { craftable: false, steps: [], missing: [], inventoryAfter: context.inventory };
  }
  for (let index = 0; index < craftTimes; index += 1) {
    if (!craftRecipeOnce(rootRecipe, context, new Set<string>())) {
      return {
        craftable: false,
        steps: context.steps,
        missing: mapMissingToItems(context.missing),
        inventoryAfter: context.inventory,
      };
    }
  }
  return { craftable: true, steps: context.steps, missing: [], inventoryAfter: context.inventory };
};

export const canCraftRecipe = (
  targetRecipeId: string,
  recipes: Recipe[],
  inventory: InventoryState,
): boolean => {
  return buildCraftPlan(targetRecipeId, recipes, inventory, 1).craftable;
};

export const applyCraftPlan = (plan: CraftPlan, current: InventoryState): InventoryState => {
  return plan.craftable ? plan.inventoryAfter : cloneInventory(current);
};