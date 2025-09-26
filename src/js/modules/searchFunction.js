import { RECIPE_BANK } from "../data/initialRecipes.js";

export function searchItem(uiManager) {
  const searchKey = document
    .querySelector(".search_input")
    .value.trim()
    .toLowerCase();
  console.log("Retrieving items with the search key:", searchKey);

  console.log("Searching...");

  const matches = RECIPE_BANK.filter((recipe) => {
    const nameMatch = recipe.name.toLowerCase().includes(searchKey);
    const ingredientMatch = recipe.ingredients.some((ingredient) => {
      return ingredient.name.toLowerCase().includes(searchKey);
    });

    return nameMatch || ingredientMatch;
  });

  if (matches.length > 0) {
    console.log("Matches found!");
    console.log(matches);

    console.log("Hiding other recipes...");
    uiManager.clearRecipeDisplay();

    console.log("Creating recipe cards with the matched results");
    uiManager.createRecipeCard(matches);

    // Update the total count to show search results count
    uiManager.loadTotalRecipes(matches, false, true);
  } else {
    // Handle case when no matches found
    console.log("No matches found for:", searchKey);
    uiManager.clearRecipeDisplay();

    // Show 0 recipes when no matches found
    uiManager.loadTotalRecipes([], false, true);

    // You might want to show a "No results found" message here
    alert(`No recipes found for "${searchKey}". Try a different search term.`);
  }
}
