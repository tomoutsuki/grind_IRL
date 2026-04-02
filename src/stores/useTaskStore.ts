import { create } from "zustand";
import { createId } from "../domain/id";
import { DropResult, InventoryItem, Task, TaskCategory } from "../domain/types";
import { getDropTableForTaskCategory } from "../data/dropTables";
import { calculateTaskEffort } from "../engines/effortCalculator";
import { generateDrops } from "../engines/dropEngine";
import { useInventoryStore } from "./useInventoryStore";
import { usePlayerStore } from "./usePlayerStore";

export interface CreateTaskInput {
  title: string;
  category: TaskCategory;
  durationMinutes: number;
  difficulty?: number;
}

interface TaskStoreState {
  tasks: Task[];
  addTask: (input: CreateTaskInput) => Task;
  completeTask: (taskId: string) => Task | undefined;
  toggleTaskCompletion: (taskId: string) => Task | undefined;
  toggleTaskAndProcess: (taskId: string, rng?: () => number) => TaskFlowResult | null;
  updateTask: (taskId: string, input: Partial<CreateTaskInput>) => Task | undefined;
  removeTask: (taskId: string) => void;
  setTasks: (tasks: Task[]) => void;
  resetTasks: () => void;
}

export interface TaskFlowResult {
  taskId: string;
  effort: number;
  drops: DropResult[];
  inventory: InventoryItem[];
}

export const useTaskStore = create<TaskStoreState>((set, get) => ({
  tasks: [],
  addTask: (input) => {
    const task: Task = {
      id: createId(),
      title: input.title,
      category: input.category,
      durationMinutes: input.durationMinutes,
      difficulty: input.difficulty ?? 1,
      completed: false,
    };
    set((state) => ({ tasks: [...state.tasks, task] }));
    return task;
  },
  completeTask: (taskId) => {
    let completedTask: Task | undefined;
    set((state) => ({
      tasks: state.tasks.map((task) => {
        if (task.id !== taskId || task.completed) return task;
        completedTask = { ...task, completed: true, completedAt: new Date().toISOString() };
        return completedTask;
      }),
    }));
    return completedTask;
  },
  toggleTaskCompletion: (taskId) => {
    let toggledTask: Task | undefined;
    set((state) => ({
      tasks: state.tasks.map((task) => {
        if (task.id !== taskId) return task;
        toggledTask = task.completed
          ? { ...task, completed: false, completedAt: undefined }
          : { ...task, completed: true, completedAt: new Date().toISOString() };
        return toggledTask;
      }),
    }));
    return toggledTask;
  },
  toggleTaskAndProcess: (taskId, rng = Math.random) => {
    const task = get().tasks.find((entry) => entry.id === taskId);
    if (!task) return null;
    if (task.completed) {
      get().toggleTaskCompletion(taskId);
      return { taskId, effort: 0, drops: [], inventory: useInventoryStore.getState().toItems() };
    }
    const completedTask = get().completeTask(taskId);
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
  },
  updateTask: (taskId, input) => {
    let updatedTask: Task | undefined;
    set((state) => ({
      tasks: state.tasks.map((task) => {
        if (task.id !== taskId) return task;
        updatedTask = {
          ...task,
          title: input.title ?? task.title,
          category: input.category ?? task.category,
          durationMinutes: input.durationMinutes ?? task.durationMinutes,
          difficulty: input.difficulty ?? task.difficulty,
        };
        return updatedTask;
      }),
    }));
    return updatedTask;
  },
  removeTask: (taskId) => {
    set((state) => ({ tasks: state.tasks.filter((task) => task.id !== taskId) }));
  },
  setTasks: (tasks) => set({ tasks }),
  resetTasks: () => set({ tasks: [] }),
}));
