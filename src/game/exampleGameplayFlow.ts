import { CRATE_DEFINITIONS } from "../data/crateDropTables";
import { RECIPES } from "../data/recipes";
import { runExampleTaskFlow } from "../flows/taskCompletionFlow";
import { useInventoryStore } from "../stores/useInventoryStore";

const fixedRng = (): number => 0.05;

export interface ExampleGameplayResult {
  taskResult: ReturnType<typeof runExampleTaskFlow>;
  openedCrateId: string | null;
  crateDropsCount: number;
  craftedRecipeId: string | null;
}

export const runExampleGameplayFlow = (): ExampleGameplayResult => {
  const taskResult = runExampleTaskFlow(
    { title: "Work shift", category: "work", durationMinutes: 60, difficulty: 1 },
    fixedRng,
  );
  const inventoryStore = useInventoryStore.getState();
  const crate = CRATE_DEFINITIONS.find((entry) => inventoryStore.getQuantity(entry.itemId) > 0);
  const crateResult = crate ? inventoryStore.openCrate(crate.itemId, fixedRng) : null;
  const crafted = inventoryStore.craftRecipe(RECIPES[0].id, RECIPES);
  return {
    taskResult,
    openedCrateId: crate?.itemId ?? null,
    crateDropsCount: crateResult?.drops.length ?? 0,
    craftedRecipeId: crafted.craftable ? RECIPES[0].id : null,
  };
};
