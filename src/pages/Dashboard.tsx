import TaskInput from "../features/tasks/TaskInput";
import TaskList from "../features/tasks/TaskList";
import { ITEM_BY_ID } from "../data/items";
import { usePlayerStore } from "../stores/usePlayerStore";
import { useTaskStore } from "../stores/useTaskStore";

const Dashboard = () => {
  const addTask = useTaskStore((state) => state.addTask);
  const recentDrops = usePlayerStore((state) => state.recentDrops);

  return (
    <section className="grid gap-6 lg:grid-cols-[340px_1fr]">
      <div className="space-y-4">
        <TaskInput />
        <article className="rounded-xl bg-panel p-4 shadow-game">
          <h3 className="font-bold">Quick Actions</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            <button onClick={() => addTask({ title: "Study sprint", category: "study", durationMinutes: 60, difficulty: 1 })} className="rounded-md border border-ink/25 px-3 py-1 text-sm">+ Study 1h</button>
            <button onClick={() => addTask({ title: "Work block", category: "work", durationMinutes: 60, difficulty: 1 })} className="rounded-md border border-ink/25 px-3 py-1 text-sm">+ Work 1h</button>
          </div>
        </article>
        <article className="rounded-xl bg-panel p-4 shadow-game">
          <h3 className="font-bold">Recent Drops</h3>
          <ul className="mt-2 space-y-1 text-sm text-ink/80">
            {recentDrops.slice(0, 6).map((drop, index) => (
              <li key={`${drop.itemId}-${drop.rarity}-${index}`}>
                +{drop.quantity} {ITEM_BY_ID[drop.itemId]?.name ?? drop.itemId} ({drop.rarity})
              </li>
            ))}
            {recentDrops.length === 0 ? <li>No drops yet.</li> : null}
          </ul>
        </article>
      </div>
      <TaskList />
    </section>
  );
};

export default Dashboard;
