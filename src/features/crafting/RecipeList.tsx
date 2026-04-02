import { ITEM_BY_ID } from "../../data/items";
import { RECIPES } from "../../data/recipes";
import { CraftPlan } from "../../engines/craftingEngine";
import { InventoryState, Recipe } from "../../domain/types";

interface RecipeListProps {
  inventory: InventoryState;
  craftRecipe: (recipeId: string, recipes: Recipe[], times?: number) => CraftPlan;
  getCraftPlan: (recipeId: string, recipes: Recipe[], times?: number) => CraftPlan;
}

const RecipeList = ({ inventory, craftRecipe, getCraftPlan }: RecipeListProps) => {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {RECIPES.map((recipe) => {
        const plan = getCraftPlan(recipe.id, RECIPES);
        return (
          <article key={recipe.id} className="rounded-xl border border-ink/15 bg-white p-4">
            <h3 className="font-bold">{recipe.name}</h3>
            <p className="text-sm text-ink/70">Creates {recipe.output.quantity} {ITEM_BY_ID[recipe.output.itemId]?.name}</p>
            <ul className="mt-3 space-y-1 text-sm">
              {recipe.inputs.map((input) => (
                <li key={`${recipe.id}-${input.itemId}`}>
                  {ITEM_BY_ID[input.itemId]?.name ?? input.itemId}: {inventory[input.itemId] ?? 0}/{input.quantity}
                </li>
              ))}
            </ul>
            {plan.craftable ? (
              <button onClick={() => craftRecipe(recipe.id, RECIPES)} className="mt-4 w-full rounded-md bg-accent px-3 py-2 text-sm font-semibold text-white">Craft</button>
            ) : (
              <p className="mt-4 rounded-md bg-accentSoft px-3 py-2 text-xs text-ink/70">
                Missing: {plan.missing.map((entry) => `${ITEM_BY_ID[entry.itemId]?.name ?? entry.itemId} x${entry.quantity}`).join(", ")}
              </p>
            )}
          </article>
        );
      })}
    </section>
  );
};

export default RecipeList;
