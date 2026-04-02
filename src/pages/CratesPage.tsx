import CrateOpeningView from "../features/crates/CrateOpeningView";

const CratesPage = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Crates</h2>
      <p className="text-sm text-ink/70">Select crate items from inventory and roll for rewards.</p>
      <CrateOpeningView />
    </section>
  );
};

export default CratesPage;
