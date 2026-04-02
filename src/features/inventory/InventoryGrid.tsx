import { ITEM_BY_ID } from "../../data/items";

interface InventoryGridProps {
  entries: Array<[string, number]>;
  onSelect: (itemId: string) => void;
}

const InventoryGrid = ({ entries, onSelect }: InventoryGridProps) => {
  if (entries.length === 0) {
    return <p className="rounded-xl bg-panel p-4 text-sm text-ink/70">Inventory is empty.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {entries.map(([itemId, quantity]) => (
        <button
          key={itemId}
          onClick={() => onSelect(itemId)}
          className="rounded-xl border border-ink/15 bg-white p-4 text-left"
        >
          <p className="text-xs text-ink/50">{ITEM_BY_ID[itemId]?.category ?? "unknown"}</p>
          <h3 className="mt-2 font-bold">{ITEM_BY_ID[itemId]?.name ?? itemId}</h3>
          <p className="mt-3 text-sm text-ink/75">x{quantity}</p>
        </button>
      ))}
    </div>
  );
};

export default InventoryGrid;
