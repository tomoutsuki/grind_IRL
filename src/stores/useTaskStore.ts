import { create } from "zustand";
import { createId } from "../domain/id";
import { Task, TaskCategory } from "../domain/types";

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
  removeTask: (taskId: string) => void;
  resetTasks: () => void;
}

export const useTaskStore = create<TaskStoreState>((set) => ({
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
  removeTask: (taskId) => {
    set((state) => ({ tasks: state.tasks.filter((task) => task.id !== taskId) }));
  },
  resetTasks: () => set({ tasks: [] }),
}));
