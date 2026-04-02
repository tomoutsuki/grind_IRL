import RecipeList from "../features/crafting/RecipeList";
import { useInventoryStore } from "../stores/useInventoryStore";

const CraftingPage = () => {
  const inventory = useInventoryStore((state) => state.inventory);
  const craftRecipe = useInventoryStore((state) => state.craftRecipe);
  const getCraftPlan = useInventoryStore((state) => state.getCraftPlan);

  return <RecipeList inventory={inventory} craftRecipe={craftRecipe} getCraftPlan={getCraftPlan} />;
};

export default CraftingPage;
