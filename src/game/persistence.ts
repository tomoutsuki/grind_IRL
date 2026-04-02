import { Task, InventoryState } from "../domain/types";
import { useInventoryStore } from "../stores/useInventoryStore";
import { usePlayerStore } from "../stores/usePlayerStore";
import { useTaskStore } from "../stores/useTaskStore";

const STORAGE_KEY = "grind-irl-state-v1";

interface PersistedSnapshot {
  tasks: Task[];
  inventory: InventoryState;
  player: {
    totalEffort: number;
    level: number;
    completedTaskIds: string[];
    craftedItems: Record<string, number>;
  };
}

let persistenceActive = false;

const parseSnapshot = (value: string | null): PersistedSnapshot | null => {
  if (!value) return null;
  try {
    return JSON.parse(value) as PersistedSnapshot;
  } catch {
    return null;
  }
};

const readSnapshot = (): PersistedSnapshot => {
  const player = usePlayerStore.getState();
  return {
    tasks: useTaskStore.getState().tasks,
    inventory: useInventoryStore.getState().inventory,
    player: {
      totalEffort: player.totalEffort,
      level: player.level,
      completedTaskIds: player.completedTaskIds,
      craftedItems: player.craftedItems,
    },
  };
};

const writeSnapshot = (): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(readSnapshot()));
};

const hydrateFromStorage = (): void => {
  const parsed = parseSnapshot(localStorage.getItem(STORAGE_KEY));
  if (!parsed) return;
  useTaskStore.getState().setTasks(parsed.tasks);
  useInventoryStore.getState().setInventory(parsed.inventory);
  usePlayerStore.getState().setPlayerProgress(parsed.player);
};

export const initializePersistence = (): void => {
  if (persistenceActive || typeof window === "undefined") return;
  hydrateFromStorage();
  useTaskStore.subscribe(writeSnapshot);
  useInventoryStore.subscribe(writeSnapshot);
  usePlayerStore.subscribe(writeSnapshot);
  persistenceActive = true;
};
