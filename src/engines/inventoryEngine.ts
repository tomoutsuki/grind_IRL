import { DropResult, InventoryItem, InventoryState } from "../domain/types";

export interface InventoryMutation {
  inventory: InventoryState;
  success: boolean;
}

export const cloneInventory = (inventory: InventoryState): InventoryState => {
  return { ...inventory };
};

export const getItemQuantity = (inventory: InventoryState, itemId: string): number => {
  return inventory[itemId] ?? 0;
};

export const addItemToInventory = (
  inventory: InventoryState,
  itemId: string,
  quantity: number,
): InventoryState => {
  if (quantity <= 0) return cloneInventory(inventory);
  const current = getItemQuantity(inventory, itemId);
  return { ...inventory, [itemId]: current + quantity };
};

export const addDropsToInventory = (
  inventory: InventoryState,
  drops: DropResult[],
): InventoryState => {
  return drops.reduce((nextInventory, drop) => {
    return addItemToInventory(nextInventory, drop.itemId, drop.quantity);
  }, cloneInventory(inventory));
};

export const consumeItem = (
  inventory: InventoryState,
  itemId: string,
  quantity: number,
): InventoryMutation => {
  if (quantity <= 0) return { inventory: cloneInventory(inventory), success: true };
  const current = getItemQuantity(inventory, itemId);
  if (current < quantity) return { inventory: cloneInventory(inventory), success: false };
  const remaining = current - quantity;
  const nextInventory = cloneInventory(inventory);
  if (remaining === 0) delete nextInventory[itemId];
  else nextInventory[itemId] = remaining;
  return { inventory: nextInventory, success: true };
};

export const hasRequiredItems = (
  inventory: InventoryState,
  requiredItems: InventoryItem[],
): boolean => {
  return requiredItems.every((required) => {
    return getItemQuantity(inventory, required.itemId) >= required.quantity;
  });
};

export const toInventoryItems = (inventory: InventoryState): InventoryItem[] => {
  return Object.entries(inventory)
    .filter(([, quantity]) => quantity > 0)
    .map(([itemId, quantity]) => ({ itemId, quantity }));
};
