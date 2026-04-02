import { DropTable } from "../domain/types";
import { ITEM_IDS } from "./items";

export interface CrateDefinition {
  itemId: string;
  name: string;
  effort: number;
  dropTable: DropTable;
}

export const CRATE_DEFINITIONS: CrateDefinition[] = [
  {
    itemId: ITEM_IDS.WOODEN_CRATE,
    name: "Wooden Crate",
    effort: 10,
    dropTable: {
      id: "crate-wooden",
      taskCategory: "any",
      rollsPerTask: 2,
      rarityRates: [
        { rarity: "common", chance: 1 },
        { rarity: "uncommon", chance: 0.35 },
        { rarity: "rare", chance: 0.08 },
      ],
      entries: [
        { itemId: ITEM_IDS.WOOD_LOG, rarity: "common", weight: 8, minEffort: 1 },
        { itemId: ITEM_IDS.COAL, rarity: "common", weight: 6, minEffort: 1 },
        { itemId: ITEM_IDS.STUDY_SCROLL, rarity: "uncommon", weight: 3, minEffort: 6 },
        { itemId: ITEM_IDS.SUPPLY_BOX, rarity: "rare", weight: 1, minEffort: 8 },
      ],
    },
  },
  {
    itemId: ITEM_IDS.SUPPLY_BOX,
    name: "Supply Box",
    effort: 18,
    dropTable: {
      id: "crate-supply",
      taskCategory: "any",
      rollsPerTask: 3,
      rarityRates: [
        { rarity: "common", chance: 1 },
        { rarity: "uncommon", chance: 0.55 },
        { rarity: "rare", chance: 0.2 },
      ],
      entries: [
        { itemId: ITEM_IDS.IRON_ORE, rarity: "common", weight: 8, minEffort: 1 },
        { itemId: ITEM_IDS.COAL, rarity: "common", weight: 7, minEffort: 1 },
        { itemId: ITEM_IDS.IRON_INGOT, rarity: "uncommon", weight: 4, minEffort: 12 },
        { itemId: ITEM_IDS.WORK_GLOVES, rarity: "rare", weight: 2, minEffort: 16 },
      ],
    },
  },
  {
    itemId: ITEM_IDS.ANCIENT_CHEST,
    name: "Ancient Chest",
    effort: 28,
    dropTable: {
      id: "crate-ancient",
      taskCategory: "any",
      rollsPerTask: 4,
      rarityRates: [
        { rarity: "common", chance: 1 },
        { rarity: "uncommon", chance: 0.7 },
        { rarity: "rare", chance: 0.35 },
      ],
      entries: [
        { itemId: ITEM_IDS.IRON_INGOT, rarity: "common", weight: 6, minEffort: 10 },
        { itemId: ITEM_IDS.STAMINA_POTION, rarity: "uncommon", weight: 4, minEffort: 15 },
        { itemId: ITEM_IDS.MYSTIC_DUST, rarity: "rare", weight: 2, minEffort: 20 },
        { itemId: ITEM_IDS.TRAINING_SWORD, rarity: "rare", weight: 1, minEffort: 24 },
      ],
    },
  },
];

export const CRATE_BY_ITEM_ID = CRATE_DEFINITIONS.reduce<Record<string, CrateDefinition>>(
  (index, definition) => {
    index[definition.itemId] = definition;
    return index;
  },
  {},
);
