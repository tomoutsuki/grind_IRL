import { ReactNode, useEffect, useState } from "react";
import CraftingPage from "./pages/CraftingPage";
import CratesPage from "./pages/CratesPage";
import Dashboard from "./pages/Dashboard";
import InventoryPage from "./pages/InventoryPage";
import { initializePersistence } from "./game/persistence";

type PageKey = "dashboard" | "inventory" | "crafting" | "crates";

const pageMap: Record<PageKey, ReactNode> = {
  dashboard: <Dashboard />,
  inventory: <InventoryPage />,
  crafting: <CraftingPage />,
  crates: <CratesPage />,
};

const App = () => {
  const [page, setPage] = useState<PageKey>("dashboard");

  useEffect(() => {
    initializePersistence();
  }, []);

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-panel p-4 shadow-game">
        <h1 className="text-2xl font-black tracking-tight">grind IRL</h1>
        <nav className="flex flex-wrap gap-2">
          {(["dashboard", "inventory", "crafting", "crates"] as PageKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setPage(key)}
              className={`rounded-full px-4 py-2 text-sm font-bold ${
                page === key ? "bg-accent text-white" : "bg-accentSoft text-ink"
              }`}
            >
              {key}
            </button>
          ))}
        </nav>
      </header>
      {pageMap[page]}
    </main>
  );
};

export default App;