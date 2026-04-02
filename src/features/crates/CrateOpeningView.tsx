import { useState } from "react";
import { CRATE_DEFINITIONS } from "../../data/crateDropTables";
import { ITEM_BY_ID } from "../../data/items";
import { DropResult } from "../../domain/types";
import { useInventoryStore } from "../../stores/useInventoryStore";

const CrateOpeningView = () => {
  const inventory = useInventoryStore((state) => state.inventory);
  const openCrate = useInventoryStore((state) => state.openCrate);
  const [lastDrops, setLastDrops] = useState<DropResult[]>([]);

  const available = CRATE_DEFINITIONS.filter((crate) => (inventory[crate.itemId] ?? 0) > 0);

  return (
    <section className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {available.map((crate) => (
          <article key={crate.itemId} className="rounded-xl border border-ink/15 bg-white p-4">
            <h3 className="font-bold">{crate.name}</h3>
            <p className="text-sm text-ink/70">Owned: {inventory[crate.itemId]}</p>
            <button
              onClick={() => setLastDrops(openCrate(crate.itemId).drops)}
              className="mt-3 w-full rounded-md bg-accent px-3 py-2 text-sm font-semibold text-white"
            >
              Open Crate
            </button>
          </article>
        ))}
      </div>
      <div className="rounded-xl bg-panel p-4 shadow-game">
        <h3 className="font-bold">Last Rewards</h3>
        {lastDrops.length === 0 ? (
          <p className="text-sm text-ink/70">Open a crate to reveal loot.</p>
        ) : (
          <ul className="mt-2 space-y-1 text-sm">
            {lastDrops.map((drop) => (
              <li key={`${drop.itemId}-${drop.rarity}`}>
                +{drop.quantity} {ITEM_BY_ID[drop.itemId]?.name ?? drop.itemId} ({drop.rarity})
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default CrateOpeningView;
