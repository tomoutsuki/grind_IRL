import { useMemo, useState } from "react";
import { ITEM_BY_ID } from "../data/items";
import InventoryGrid from "../features/inventory/InventoryGrid";
import { useInventoryStore } from "../stores/useInventoryStore";

const InventoryPage = () => {
  const inventory = useInventoryStore((state) => state.inventory);
  const entries = useMemo(() => Object.entries(inventory).filter(([, qty]) => qty > 0), [inventory]);
  const [selected, setSelected] = useState<string>(entries[0]?.[0] ?? "");
  const selectedItem = ITEM_BY_ID[selected];

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <InventoryGrid entries={entries} onSelect={setSelected} />
      <aside className="rounded-xl bg-panel p-4 shadow-game">
        <h3 className="font-bold">Item Details</h3>
        {selectedItem ? (
          <>
            <p className="mt-2 text-lg font-semibold">{selectedItem.name}</p>
            <p className="mt-2 text-sm text-ink/70">{selectedItem.description}</p>
            <p className="mt-3 text-sm">Category: {selectedItem.category}</p>
            <p className="text-sm">Owned: {inventory[selectedItem.id] ?? 0}</p>
          </>
        ) : (
          <p className="mt-2 text-sm text-ink/70">Select an item from the grid.</p>
        )}
      </aside>
    </section>
  );
};

export default InventoryPage;
