import { Validator } from "../utilities/validation.js";
import { DataManager } from "./dataManager.js";
import { uiManager } from "./uiManager.js";
import { getIngredientData } from "./nutritionCache.js";

// RECIPE CRUD OPERATIONS:
export class RecipeManager {
  static async addRecipe(recipeData) {
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

    //3. Create Recipe Object with ID and filter out any null ingredients:
    const newRecipe = {
      id: newId,
      week: recipeData.week || 1,
      name: recipeData.name,
      ingredients: (recipeData.ingredients || []).filter(
        (ing) =>
          ing && typeof ing === "object" && ing.name && ing.name.trim() !== ""
      ),
      addedIngredients: [], //user modifications
      instructions: (() => {
        console.log(
          "🔍 RECIPE MANAGER: Raw instructions from form:",
          recipeData.instructions
        );
        const filtered = (recipeData.instructions || []).filter(
          (inst) => inst && typeof inst === "string" && inst.trim() !== ""
        );
        console.log("🔍 RECIPE MANAGER: Filtered instructions:", filtered);
        return filtered;
      })(),
      prepTime: recipeData.prepTime || 0,
      cookTime: recipeData.cookTime || 0,
      servings: recipeData.servings || 1,
      image: recipeData.image || "",
      nutritionalInfo: [],
    };

    //3.5. Fetch nutrition data for the recipe
    try {
      console.log("🍎 RECIPE MANAGER: Starting nutrition fetch process...");
      console.log(
        "🍎 RECIPE MANAGER: Recipe to fetch nutrition for:",
        newRecipe
      );
      console.log(
        "🍎 RECIPE MANAGER: Recipe ingredients:",
        newRecipe.ingredients
      );

      const nutritionAPI = getIngredientData();
      console.log(
        "🍎 RECIPE MANAGER: Nutrition API instance created:",
        nutritionAPI
      );

      console.log("🍎 RECIPE MANAGER: Calling fetchRecipeNutrition...");
      const nutritionData = await nutritionAPI.fetchRecipeNutrition(newRecipe);
      console.log(
        "🍎 RECIPE MANAGER: Raw nutrition data returned:",
        nutritionData
      );

      if (nutritionData) {
        newRecipe.nutritionalInfo = nutritionData;
        console.log("🍎 RECIPE MANAGER: Nutrition data assigned to recipe!");
        console.log(
          "🍎 RECIPE MANAGER: Final nutritionalInfo:",
          newRecipe.nutritionalInfo
        );
      } else {
        console.warn("🍎 RECIPE MANAGER: No nutrition data returned");
      }
    } catch (error) {
      console.error("🍎 RECIPE MANAGER: Error fetching nutrition data:", error);
      console.error("🍎 RECIPE MANAGER: Error stack:", error.stack);
      // Continue without nutrition data - don't fail the whole recipe creation
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
