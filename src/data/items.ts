import { Item } from "../domain/types";

export const ITEM_IDS = {
  WOOD_LOG: "11111111-1111-4111-8111-111111111111",
  IRON_ORE: "22222222-2222-4222-8222-222222222222",
  COAL: "33333333-3333-4333-8333-333333333333",
  IRON_INGOT: "44444444-4444-4444-8444-444444444444",
  STUDY_SCROLL: "55555555-5555-4555-8555-555555555555",
  WORK_GLOVES: "66666666-6666-4666-8666-666666666666",
  TRAINING_SWORD: "77777777-7777-4777-8777-777777777777",
  BASIC_CRATE: "88888888-8888-4888-8888-888888888888",
  MYSTIC_DUST: "99999999-9999-4999-8999-999999999999",
  STAMINA_POTION: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
} as const;

export const ITEMS: Item[] = [
  {
    id: ITEM_IDS.WOOD_LOG,
    name: "Wood Log",
    description: "Basic crafting material from long study sessions.",
    assetPath: "/assets/items/wood_log.png",
    category: "material",
    attributes: { grade: 1 },
    effects: [],
  },
  {
    id: ITEM_IDS.IRON_ORE,
    name: "Iron Ore",
    description: "Heavy ore dropped from work-focused tasks.",
    assetPath: "/assets/items/iron_ore.png",
    category: "material",
    attributes: { grade: 1 },
    effects: [],
  },
  {
    id: ITEM_IDS.COAL,
    name: "Coal",
    description: "Fuel used in smelting recipes.",
    assetPath: "/assets/items/coal.png",
    category: "material",
    attributes: { fuel: true },
    effects: [],
  },
  {
    id: ITEM_IDS.IRON_INGOT,
    name: "Iron Ingot",
    description: "Refined material for advanced crafting.",
    assetPath: "/assets/items/iron_ingot.png",
    category: "material",
    attributes: { grade: 2 },
    effects: [],
  },
  {
    id: ITEM_IDS.STUDY_SCROLL,
    name: "Study Scroll",
    description: "A consumable that boosts focus output.",
    assetPath: "/assets/items/study_scroll.png",
    category: "consumable",
    attributes: { focusBoost: 10 },
    effects: [{ type: "focus", value: 10, duration: 900 }],
    duration: 900,
  },
  {
    id: ITEM_IDS.WORK_GLOVES,
    name: "Work Gloves",
    description: "Tool item that helps with grind-heavy tasks.",
    assetPath: "/assets/items/work_gloves.png",
    category: "tool",
    attributes: { durability: 100 },
    effects: [{ type: "effortMultiplier", value: 5 }],
  },
  {
    id: ITEM_IDS.TRAINING_SWORD,
    name: "Training Sword",
    description: "Entry weapon crafted from basic materials.",
    assetPath: "/assets/items/training_sword.png",
    category: "weapon",
    attributes: { attack: 12 },
    effects: [{ type: "taskStreakBonus", value: 3 }],
  },
  {
    id: ITEM_IDS.BASIC_CRATE,
    name: "Basic Crate",
    description: "Crate that rolls additional random loot.",
    assetPath: "/assets/items/basic_crate.png",
    category: "crate",
    attributes: { tier: 1 },
    effects: [{ type: "openCrate", value: 1 }],
  },
  {
    id: ITEM_IDS.MYSTIC_DUST,
    name: "Mystic Dust",
    description: "Rare alchemy component for potion crafting.",
    assetPath: "/assets/items/mystic_dust.png",
    category: "material",
    attributes: { rarityScore: 80 },
    effects: [],
  },
  {
    id: ITEM_IDS.STAMINA_POTION,
    name: "Stamina Potion",
    description: "Consumable that boosts output for 20 minutes.",
    assetPath: "/assets/items/stamina_potion.png",
    category: "consumable",
    attributes: { staminaBoost: 20 },
    effects: [{ type: "stamina", value: 20, duration: 1200 }],
    duration: 1200,
  },
];

export const ITEM_BY_ID = ITEMS.reduce<Record<string, Item>>((index, item) => {
  index[item.id] = item;
  return index;
}, {});
