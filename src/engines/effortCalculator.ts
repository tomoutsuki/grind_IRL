import { Task, TaskCategory } from "../domain/types";

export type GecCoefficients = Record<TaskCategory, number>;

export const DEFAULT_GEC_COEFFICIENTS: GecCoefficients = {
  study: 10,
  work: 25,
  fitness: 18,
  chores: 12,
  creative: 15,
};

const clampToZero = (value: number): number => (value < 0 ? 0 : value);

export const minutesToHours = (minutes: number): number => {
  return clampToZero(minutes) / 60;
};

export const resolveTaskGecPerHour = (
  category: TaskCategory,
  coefficients: GecCoefficients = DEFAULT_GEC_COEFFICIENTS,
): number => {
  return coefficients[category] ?? 0;
};

export const calculateTaskEffort = (
  task: Task,
  coefficients: GecCoefficients = DEFAULT_GEC_COEFFICIENTS,
): number => {
  const hours = minutesToHours(task.durationMinutes);
  const baseGec = resolveTaskGecPerHour(task.category, coefficients);
  const difficulty = task.difficulty > 0 ? task.difficulty : 1;
  return Number((hours * baseGec * difficulty).toFixed(2));
};
