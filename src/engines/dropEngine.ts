import {
  DropRarity,
  DropResult,
  DropTable,
  DropTableEntry,
  TaskCategory,
} from "../domain/types";

type RngFunction = () => number;

const clampChance = (value: number): number => {
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
};

export const getRollCountFromEffort = (effort: number, baseRolls: number): number => {
  const bonusRolls = Math.floor(Math.max(effort, 0) / 30);
  return Math.max(1, baseRolls + bonusRolls);
};

export const pickWeightedEntry = <T extends { weight: number }>(
  entries: T[],
  rng: RngFunction = Math.random,
): T | null => {
  const totalWeight = entries.reduce((sum, entry) => sum + Math.max(entry.weight, 0), 0);
  if (entries.length === 0 || totalWeight <= 0) return null;
  let cursor = rng() * totalWeight;
  for (const entry of entries) {
    cursor -= Math.max(entry.weight, 0);
    if (cursor <= 0) return entry;
  }
  return entries[entries.length - 1] ?? null;
};

export const rollRarity = (table: DropTable, rng: RngFunction = Math.random): DropRarity => {
  const ordered = [...table.rarityRates].sort((a, b) => b.chance - a.chance);
  for (const rate of ordered) {
    if (rng() <= clampChance(rate.chance)) return rate.rarity;
  }
  return ordered[ordered.length - 1]?.rarity ?? "common";
};

const filterEntryPool = (
  entries: DropTableEntry[],
  effort: number,
  rarity: DropRarity,
): DropTableEntry[] => {
  const validEffort = entries.filter((entry) => {
    const withinMin = effort >= entry.minEffort;
    const withinMax = entry.maxEffort === undefined || effort <= entry.maxEffort;
    return withinMin && withinMax;
  });
  const byRarity = validEffort.filter((entry) => entry.rarity === rarity);
  return byRarity.length > 0 ? byRarity : validEffort;
};

export const mergeDropResults = (drops: DropResult[]): DropResult[] => {
  const merged: Record<string, DropResult> = {};
  for (const drop of drops) {
    const key = `${drop.itemId}:${drop.rarity}`;
    const current = merged[key];
    merged[key] = current
      ? { ...current, quantity: current.quantity + drop.quantity }
      : { ...drop };
  }
  return Object.values(merged);
};

export const generateDrops = (
  table: DropTable,
  taskCategory: TaskCategory,
  effort: number,
  rng: RngFunction = Math.random,
): DropResult[] => {
  if (table.taskCategory !== "any" && table.taskCategory !== taskCategory) return [];
  const rolls = getRollCountFromEffort(effort, table.rollsPerTask);
  const drops: DropResult[] = [];
  for (let index = 0; index < rolls; index += 1) {
    const rarity = rollRarity(table, rng);
    const pool = filterEntryPool(table.entries, effort, rarity);
    const picked = pickWeightedEntry(pool, rng);
    if (picked) drops.push({ itemId: picked.itemId, rarity: picked.rarity, quantity: 1 });
  }
  return mergeDropResults(drops);
};
