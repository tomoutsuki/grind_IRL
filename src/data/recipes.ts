import { Recipe } from "../domain/types";
import { ITEM_IDS } from "./items";

export const RECIPES: Recipe[] = [
  {
    id: "recipe-smelt-iron-ingot",
    name: "Smelt Iron Ingot",
    inputs: [
      { itemId: ITEM_IDS.IRON_ORE, quantity: 3 },
      { itemId: ITEM_IDS.COAL, quantity: 1 },
    ],
    output: { itemId: ITEM_IDS.IRON_INGOT, quantity: 1 },
    craftTimeSeconds: 12,
    tags: ["smelting", "material"],
  },
  {
    id: "recipe-forge-training-sword",
    name: "Forge Training Sword",
    inputs: [
      { itemId: ITEM_IDS.WOOD_LOG, quantity: 2 },
      { itemId: ITEM_IDS.IRON_INGOT, quantity: 2 },
    ],
    output: { itemId: ITEM_IDS.TRAINING_SWORD, quantity: 1 },
    craftTimeSeconds: 20,
    tags: ["forge", "weapon"],
  },
  {
    id: "recipe-brew-stamina-potion",
    name: "Brew Stamina Potion",
    inputs: [
      { itemId: ITEM_IDS.STUDY_SCROLL, quantity: 1 },
      { itemId: ITEM_IDS.MYSTIC_DUST, quantity: 1 },
    ],
    output: { itemId: ITEM_IDS.STAMINA_POTION, quantity: 1 },
    craftTimeSeconds: 18,
    tags: ["alchemy", "consumable"],
  },
  {
    id: "recipe-assemble-wooden-crate",
    name: "Assemble Wooden Crate",
    inputs: [
      { itemId: ITEM_IDS.WOOD_LOG, quantity: 5 },
      { itemId: ITEM_IDS.IRON_INGOT, quantity: 1 },
    ],
    output: { itemId: ITEM_IDS.WOODEN_CRATE, quantity: 1 },
    craftTimeSeconds: 25,
    tags: ["crate", "assembly"],
  },
  {
    id: "recipe-assemble-supply-box",
    name: "Assemble Supply Box",
    inputs: [
      { itemId: ITEM_IDS.WOODEN_CRATE, quantity: 1 },
      { itemId: ITEM_IDS.IRON_INGOT, quantity: 2 },
      { itemId: ITEM_IDS.COAL, quantity: 3 },
    ],
    output: { itemId: ITEM_IDS.SUPPLY_BOX, quantity: 1 },
    craftTimeSeconds: 30,
    tags: ["crate", "upgrade"],
  },
  {
    id: "recipe-assemble-ancient-chest",
    name: "Assemble Ancient Chest",
    inputs: [
      { itemId: ITEM_IDS.SUPPLY_BOX, quantity: 1 },
      { itemId: ITEM_IDS.MYSTIC_DUST, quantity: 2 },
      { itemId: ITEM_IDS.IRON_INGOT, quantity: 2 },
    ],
    output: { itemId: ITEM_IDS.ANCIENT_CHEST, quantity: 1 },
    craftTimeSeconds: 45,
    tags: ["crate", "legendary"],
  },
];