import { getDropTableForTaskCategory } from "../data/dropTables";
import { calculateTaskEffort } from "../engines/effortCalculator";
import { generateDrops } from "../engines/dropEngine";
import { DropResult, InventoryItem } from "../domain/types";
import { useInventoryStore } from "../stores/useInventoryStore";
import { usePlayerStore } from "../stores/usePlayerStore";
import { CreateTaskInput, useTaskStore } from "../stores/useTaskStore";

interface TaskFlowResult {
  taskId: string;
  effort: number;
  drops: DropResult[];
  inventory: InventoryItem[];
}

export const completeTaskAndUpdateState = (
  taskId: string,
  rng: () => number = Math.random,
): TaskFlowResult | null => {
  const completedTask = useTaskStore.getState().completeTask(taskId);
  if (!completedTask) return null;
  const effort = calculateTaskEffort(completedTask);
  const table = getDropTableForTaskCategory(completedTask.category);
  const drops = generateDrops(table, completedTask.category, effort, rng);
  useInventoryStore.getState().addDrops(drops);
  usePlayerStore.getState().addEffort(effort);
  usePlayerStore.getState().registerCompletedTask(completedTask.id);
  return {
    taskId: completedTask.id,
    effort,
    drops,
    inventory: useInventoryStore.getState().toItems(),
  };
};

export const runExampleTaskFlow = (
  input: CreateTaskInput,
  rng: () => number = Math.random,
): TaskFlowResult | null => {
  const task = useTaskStore.getState().addTask(input);
  return completeTaskAndUpdateState(task.id, rng);
};
