export type TaskCategory = "study" | "work" | "fitness" | "chores" | "creative";

export type ItemCategory =
  | "material"
  | "weapon"
  | "armor"
  | "tool"
  | "consumable"
  | "crate";

export type DropRarity = "common" | "uncommon" | "rare" | "epic";

export interface ItemEffect {
  type: string;
  value: number;
  duration?: number;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  assetPath: string;
  category: ItemCategory;
  attributes: Record<string, number | string | boolean>;
  effects: ItemEffect[];
  duration?: number;
}

export interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  durationMinutes: number;
  difficulty: number;
  completed: boolean;
  completedAt?: string;
}

export interface DropRate {
  rarity: DropRarity;
  chance: number;
}

export interface DropTableEntry {
  itemId: string;
  rarity: DropRarity;
  weight: number;
  minEffort: number;
  maxEffort?: number;
}

export interface DropTable {
  id: string;
  taskCategory: TaskCategory | "any";
  rollsPerTask: number;
  rarityRates: DropRate[];
  entries: DropTableEntry[];
}

export interface RecipeInput {
  itemId: string;
  quantity: number;
}

export interface RecipeOutput {
  itemId: string;
  quantity: number;
}

export interface Recipe {
  id: string;
  name: string;
  inputs: RecipeInput[];
  output: RecipeOutput;
  craftTimeSeconds: number;
  tags?: string[];
}

export interface InventoryItem {
  itemId: string;
  quantity: number;
}

export interface DropResult {
  itemId: string;
  rarity: DropRarity;
  quantity: number;
}

export type InventoryState = Record<string, number>;