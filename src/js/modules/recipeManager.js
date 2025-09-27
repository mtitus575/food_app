import { Validator } from "../utilities/validation.js";
import { DataManager } from "./dataManager.js";
import { uiManager } from "./uiManager.js";

// RECIPE CRUD OPERATIONS:
export class RecipeManager {
  static addRecipe(recipeData) {
    //1. Basic validation: checking required fields before ID generation:
    if (!recipeData || !recipeData.name) {
      throw new Error("Recipe must have a name");
    }

    //2. Generate new, unique ID and get existing recipes:
    let recipes = DataManager.load("recipes") || [];
    // If no recipes in storage, start with initial recipes
    if (recipes.length === 0) {
      recipes = [...DataManager.getInitialRecipes()];
    }
    // Get the highest ID from existing recipes
    const existingIds = recipes.map((r) => r.id);
    const newId = Math.max(...existingIds, 0) + 1;

    //3. Create Recipe Object with ID:
    const newRecipe = {
      id: newId,
      week: recipeData.week || 1,
      name: recipeData.name,
      ingredients: recipeData.ingredients || [],
      addedIngredients: [], //user modifications
      instructions: recipeData.instructions || [],
      prepTime: recipeData.prepTime || 0,
      cookTime: recipeData.cookTime || 0,
      servings: recipeData.servings || 1,
      image: recipeData.image || "",
      nutritionalInfo: [],
    };

    //4. Validate complete recipe object:
    const validatedRecipe = Validator.validateRecipe(newRecipe);
    if (!validatedRecipe) {
      throw new Error("Invalid recipe data after validation");
    }

    //4. Persist the Data: Saving to storage
    recipes.push(newRecipe);
    DataManager.save("recipes", recipes);

    //5. Update UI to show new recipes
    const allRecipes = DataManager.load("recipes");
    uiManager.refreshRecipeDisplay(allRecipes, false);

    // Update the total recipe count display
    uiManager.loadTotalRecipes(allRecipes, false);

    return newRecipe;
  }
}
