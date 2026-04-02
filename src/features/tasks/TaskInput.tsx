import { FormEvent, useState } from "react";
import NumericTaskInput from "../../components/NumericTaskInput";
import { TaskCategory } from "../../domain/types";
import { useTaskStore } from "../../stores/useTaskStore";

const categories: TaskCategory[] = ["study", "work", "fitness", "chores", "creative"];

const TaskInput = () => {
  const addTask = useTaskStore((state) => state.addTask);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<TaskCategory>("study");
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [difficulty, setDifficulty] = useState(1);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim()) return;
    addTask({ title: title.trim(), category, durationMinutes, difficulty });
    setTitle("");
    setDurationMinutes(60);
    setDifficulty(1);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-xl bg-panel p-4 shadow-game">
      <h2 className="text-lg font-bold">Add Task</h2>
      <label className="flex flex-col gap-2 text-sm font-semibold text-ink/80">
        Task Name
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Deep work session"
          className="rounded-lg border border-ink/20 bg-white px-3 py-2"
        />
      </label>
      <label className="flex flex-col gap-2 text-sm font-semibold text-ink/80">
        Category
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value as TaskCategory)}
          className="rounded-lg border border-ink/20 bg-white px-3 py-2"
        >
          {categories.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>
      <div className="grid grid-cols-2 gap-3">
        <NumericTaskInput label="Duration (min)" value={durationMinutes} min={5} onChange={setDurationMinutes} />
        <NumericTaskInput label="Difficulty" value={difficulty} min={1} max={5} onChange={setDifficulty} />
      </div>
      <button className="w-full rounded-lg bg-accent px-4 py-2 font-bold text-white">Add Task</button>
    </form>
  );
};

export default TaskInput;
