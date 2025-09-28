// ## MAIN CONTROLLER: ##

//Import modules here:
import { DataManager } from "./modules/dataManager.js";
import { uiManager } from "./modules/uiManager.js";
import { ApiKeyManager } from "./modules/apiKeyManager.js";
import { RecipeManager } from "./modules/recipeManager.js";
import { RecipeFormHandler } from "./modules/recipeFormHandler.js";
import {
  selectWeeklyRecipes,
  isTimeToReset,
  markAsCooked,
  resetWeeklyPlan,
  getShoppingList,
} from "./modules/mealPlanner.js";

function startApp() {
  // console.log("🚀 App starting...");

  // Initialize API key management for production
  ApiKeyManager.init();

  // Initialize the data manager - only call this once
  const data = DataManager.init();

  let recipesToDisplay;
  let isWeeklySelection = false;

  // console.log("🕒 Checking if time to reset...");
  //Check if 7 days have passed since last weekly recipes selection
  if (isTimeToReset()) {
    console.log("⚠️ RESETTING WEEKLY PLAN - Time to reset returned true");

    // DON'T save an empty plan - just clear it completely
    DataManager.save("WeeklyRecipes", null);
    console.log("Weekly recipes cleared from localStorage.");

    // After reset, show all recipes
    recipesToDisplay = data.recipes;
    isWeeklySelection = false;
    // Disable shopping list button since no weekly recipes after reset
    uiManager.toggleShoppingListButton(false);
    // Set initial state to all recipes
    uiManager.setViewState("all");
    // console.log("Displaying all recipes after reset.");
  }
  // No reset needed, check saved view state first, then data availability
  else {
    // Get the previously saved view state
    const savedViewMode = uiManager.getCurrentViewMode();

    // If user was viewing weekly recipes AND we have weekly data, restore weekly view
    if (
      savedViewMode === "weekly" &&
      data.weeklyPlan.recipes &&
      data.weeklyPlan.recipes.length > 0
    ) {
      // We have weekly recipes, display those
      recipesToDisplay = data.weeklyPlan.recipes;
      isWeeklySelection = true;
      // Show reset button since weekly recipes are displayed
      uiManager.toggleResetButton(true);
      // Enable shopping list button since weekly recipes are available
      uiManager.toggleShoppingListButton(true);
      // Set initial state to weekly recipes
      uiManager.setViewState("weekly");
      // console.log("Restoring saved weekly recipes view.");
    }
    // Otherwise, show all recipes (either user was viewing all, or no weekly data available)
    else {
      // Fall back to all recipes
      recipesToDisplay = data.recipes;
      isWeeklySelection = false;
      // Hide reset button since we're showing all recipes
      uiManager.toggleResetButton(false);
      // Disable shopping list button since no weekly recipes
      uiManager.toggleShoppingListButton(false);
      // Set initial state to all recipes
      uiManager.setViewState("all");
      // console.log("Displaying all recipes (default or no weekly data).");
    }
  }

  // Display the determined recipes
  uiManager.createRecipeCard(recipesToDisplay, isWeeklySelection);

  // Get total saved recipes and display to DOM with correct context:
  uiManager.loadTotalRecipes(recipesToDisplay, isWeeklySelection);

  // console.log("Application started successfully");

  // Initialize the recipe form handler
  new RecipeFormHandler();
}
startApp();

// Make RecipeManager available globally for testing
window.RecipeManager = RecipeManager;
