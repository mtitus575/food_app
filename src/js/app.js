// ## MAIN CONTROLLER: ##

//Import modules here:
import { DataManager } from "./modules/dataManager.js";
import { uiManager } from "./modules/uiManager.js";
import {
  selectWeeklyRecipes,
  isTimeToReset,
  markAsCooked,
  resetWeeklyPlan,
  getShoppingList,
} from "./modules/mealPlanner.js";

function startApp() {
  // Initialize the data manager - only call this once
  const data = DataManager.init();

  // Get total saved recipes and display to DOM:
  const displayTotalRecipes = uiManager.loadTotalRecipes();

  let recipesToDisplay;

  //Check if 7 days have passed since last weekly recipes selection
  if (isTimeToReset()) {
    // Time to reset - create empty weekly plan
    const newWeeklyPlan = {
      recipes: [],
      cookedMeals: [],
      planDate: null,
    };

    // Save empty plan to localStorage
    DataManager.save("WeeklyRecipes", newWeeklyPlan);
    console.log("The saved recipes have been reset in localStorage.");

    // After reset, show all recipes
    recipesToDisplay = data.recipes;
    console.log("Displaying all recipes after reset.");
  }
  // No reset needed, check if we have weekly recipes to display
  else if (data.weeklyPlan.recipes && data.weeklyPlan.recipes.length > 0) {
    // We have weekly recipes, display those
    recipesToDisplay = data.weeklyPlan.recipes;
    console.log("Displaying saved weekly recipes.");
  }
  // No reset needed but no weekly recipes found
  else {
    // Fall back to all recipes
    recipesToDisplay = data.recipes;
    console.log("No weekly recipes found, displaying all recipes.");
  }

  // Display the determined recipes
  uiManager.createRecipeCard(recipesToDisplay);

  console.log("Application started successfully");
}
startApp();
