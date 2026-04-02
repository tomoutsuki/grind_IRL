import { useState } from "react";
import NumericTaskInput from "../../components/NumericTaskInput";
import { Task, TaskCategory } from "../../domain/types";
import { useTaskStore } from "../../stores/useTaskStore";

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const updateTask = useTaskStore((state) => state.updateTask);
  const removeTask = useTaskStore((state) => state.removeTask);
  const toggleTaskAndProcess = useTaskStore((state) => state.toggleTaskAndProcess);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [category, setCategory] = useState<TaskCategory>(task.category);
  const [durationMinutes, setDurationMinutes] = useState(task.durationMinutes);
  const [difficulty, setDifficulty] = useState(task.difficulty);

  const saveTask = () => {
    updateTask(task.id, { title, category, durationMinutes, difficulty });
    setEditing(false);
  };

  const completionLabel = task.completed ? "Reopen" : "Complete";
  const categoryOptions: TaskCategory[] = ["study", "work", "fitness", "chores", "creative"];

  return (
    <article className="space-y-3 rounded-xl border border-ink/15 bg-white p-4">
      {editing ? (
        <>
          <input value={title} onChange={(event) => setTitle(event.target.value)} className="w-full rounded-lg border border-ink/20 px-3 py-2" />
          <select value={category} onChange={(event) => setCategory(event.target.value as TaskCategory)} className="w-full rounded-lg border border-ink/20 px-3 py-2">
            {categoryOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <div className="grid grid-cols-2 gap-2">
            <NumericTaskInput label="Minutes" value={durationMinutes} min={5} onChange={setDurationMinutes} />
            <NumericTaskInput label="Difficulty" value={difficulty} min={1} max={5} onChange={setDifficulty} />
          </div>
        </>
      ) : (
        <>
          <h3 className="text-base font-bold">{task.title}</h3>
          <p className="text-sm text-ink/70">{task.category} • {task.durationMinutes}m • difficulty {task.difficulty}</p>
        </>
      )}
      <div className="flex flex-wrap gap-2">
        {editing ? (
          <>
            <button onClick={saveTask} className="rounded-md bg-accent px-3 py-1 text-sm font-bold text-white">Save</button>
            <button onClick={() => setEditing(false)} className="rounded-md border border-ink/30 px-3 py-1 text-sm">Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => toggleTaskAndProcess(task.id)} className="rounded-md bg-accent px-3 py-1 text-sm font-bold text-white">{completionLabel}</button>
            <button onClick={() => setEditing(true)} className="rounded-md border border-ink/30 px-3 py-1 text-sm">Edit</button>
          </>
        )}
        <button onClick={() => removeTask(task.id)} className="rounded-md border border-red-300 px-3 py-1 text-sm text-red-600">Delete</button>
      </div>
    </article>
  );
};

export default TaskCard;
