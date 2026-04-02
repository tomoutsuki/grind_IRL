import { CreateTaskInput, TaskFlowResult, useTaskStore } from "../stores/useTaskStore";

export const completeTaskAndUpdateState = (
  taskId: string,
  rng: () => number = Math.random,
): TaskFlowResult | null => {
  return useTaskStore.getState().toggleTaskAndProcess(taskId, rng);
};

export const toggleTaskAndRunFlow = (
  taskId: string,
  rng: () => number = Math.random,
): TaskFlowResult | null => {
  return useTaskStore.getState().toggleTaskAndProcess(taskId, rng);
};

export const runExampleTaskFlow = (
  input: CreateTaskInput,
  rng: () => number = Math.random,
): TaskFlowResult | null => {
  const task = useTaskStore.getState().addTask(input);
  return completeTaskAndUpdateState(task.id, rng);
};
