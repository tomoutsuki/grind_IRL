import { DropResult, InventoryState } from "../domain/types";
import { generateDrops } from "../engines/dropEngine";
import { addDropsToInventory, consumeItem } from "../engines/inventoryEngine";
import { CrateDefinition } from "../data/crateDropTables";

export interface OpenCrateResult {
  success: boolean;
  drops: DropResult[];
  inventoryAfter: InventoryState;
  reason?: string;
}

export const getCrateQuantity = (inventory: InventoryState, crateItemId: string): number => {
  return inventory[crateItemId] ?? 0;
};

export const listAvailableCrates = (
  inventory: InventoryState,
  crates: CrateDefinition[],
): Array<CrateDefinition & { quantity: number }> => {
  return crates
    .map((crate) => ({ ...crate, quantity: getCrateQuantity(inventory, crate.itemId) }))
    .filter((crate) => crate.quantity > 0);
};

export const openCrateInInventory = (
  inventory: InventoryState,
  crateItemId: string,
  crates: CrateDefinition[],
  rng: () => number = Math.random,
): OpenCrateResult => {
  const crate = crates.find((entry) => entry.itemId === crateItemId);
  if (!crate) return { success: false, drops: [], inventoryAfter: inventory, reason: "missing-crate" };
  const consumed = consumeItem(inventory, crateItemId, 1);
  if (!consumed.success) {
    return { success: false, drops: [], inventoryAfter: inventory, reason: "no-quantity" };
  }
  const drops = generateDrops(crate.dropTable, "creative", crate.effort, rng);
  const inventoryAfter = addDropsToInventory(consumed.inventory, drops);
  return { success: true, drops, inventoryAfter };
};
