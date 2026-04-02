import TaskCard from "./TaskCard";
import { useTaskStore } from "../../stores/useTaskStore";

const TaskList = () => {
  const tasks = useTaskStore((state) => state.tasks);
  if (tasks.length === 0) {
    return <p className="rounded-xl bg-panel p-4 text-sm text-ink/70">No tasks yet. Add one to start farming drops.</p>;
  }
  return (
    <section className="space-y-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </section>
  );
};

export default TaskList;
