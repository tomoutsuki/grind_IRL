import { DropTable, TaskCategory } from "../domain/types";
import { ITEM_IDS } from "./items";

export const DROP_TABLES: DropTable[] = [
  {
    id: "drop-study",
    taskCategory: "study",
    rollsPerTask: 1,
    rarityRates: [
      { rarity: "common", chance: 1 },
      { rarity: "uncommon", chance: 0.65 },
      { rarity: "rare", chance: 0.15 },
    ],
    entries: [
      { itemId: ITEM_IDS.WOOD_LOG, rarity: "common", weight: 8, minEffort: 1 },
      { itemId: ITEM_IDS.STUDY_SCROLL, rarity: "common", weight: 5, minEffort: 4 },
      { itemId: ITEM_IDS.WOODEN_CRATE, rarity: "uncommon", weight: 3, minEffort: 8 },
      { itemId: ITEM_IDS.MYSTIC_DUST, rarity: "rare", weight: 1, minEffort: 12 },
    ],
  },
  {
    id: "drop-work",
    taskCategory: "work",
    rollsPerTask: 1,
    rarityRates: [
      { rarity: "common", chance: 1 },
      { rarity: "uncommon", chance: 0.65 },
      { rarity: "rare", chance: 0.15 },
    ],
    entries: [
      { itemId: ITEM_IDS.IRON_ORE, rarity: "common", weight: 9, minEffort: 1 },
      { itemId: ITEM_IDS.COAL, rarity: "common", weight: 7, minEffort: 1 },
      { itemId: ITEM_IDS.WORK_GLOVES, rarity: "uncommon", weight: 2, minEffort: 10 },
      { itemId: ITEM_IDS.SUPPLY_BOX, rarity: "rare", weight: 1, minEffort: 16 },
    ],
  },
  {
    id: "drop-generic",
    taskCategory: "any",
    rollsPerTask: 1,
    rarityRates: [
      { rarity: "common", chance: 1 },
      { rarity: "uncommon", chance: 0.4 },
      { rarity: "rare", chance: 0.1 },
    ],
    entries: [
      { itemId: ITEM_IDS.WOOD_LOG, rarity: "common", weight: 5, minEffort: 1 },
      { itemId: ITEM_IDS.IRON_ORE, rarity: "common", weight: 5, minEffort: 1 },
      { itemId: ITEM_IDS.STUDY_SCROLL, rarity: "uncommon", weight: 2, minEffort: 6 },
      { itemId: ITEM_IDS.WOODEN_CRATE, rarity: "uncommon", weight: 1, minEffort: 9 },
      { itemId: ITEM_IDS.MYSTIC_DUST, rarity: "rare", weight: 1, minEffort: 15 },
      { itemId: ITEM_IDS.ANCIENT_CHEST, rarity: "rare", weight: 1, minEffort: 24 },
    ],
  },
];

export const getDropTableForTaskCategory = (category: TaskCategory): DropTable => {
  return (
    DROP_TABLES.find((table) => table.taskCategory === category) ??
    DROP_TABLES.find((table) => table.taskCategory === "any") ??
    DROP_TABLES[0]
  );
};
