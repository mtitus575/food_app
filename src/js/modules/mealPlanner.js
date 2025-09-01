// WEEKLY MEAL PLANNING:
import { DataManager } from "./dataManager.js";
import { uiManager } from "./uiManager.js";
export {
  selectWeeklyRecipes,
  isTimeToReset,
  markAsCooked,
  resetWeeklyPlan,
  getShoppingList,
};

/*Sequential Recipe Selector - cycles through available weeks */
function selectWeeklyRecipes() {
  // Get all recipes from our data store
  const allRecipes = DataManager.getInitialRecipes();
  console.log(`Total recipes available: ${allRecipes.length}`);

  // Find all available week numbers (filter out undefined and null values)
  const weekNumbers = [
    ...new Set(allRecipes.map((recipe) => recipe.week).filter(Boolean)),
  ].sort((a, b) => a - b); // Sort weeks numerically: 1, 2, 3, etc.

  console.log(`Available week numbers: ${weekNumbers}`);

  // Safety check - if no valid week numbers, default to week 1
  if (weekNumbers.length === 0) {
    console.warn(
      "No valid week numbers found in recipes. Defaulting to week 1"
    );
    weekNumbers.push(1);
  }

  // Get the previously selected week from localStorage
  const previousPlan = DataManager.load("WeeklyRecipes");
  let lastWeek = 0;

  if (previousPlan && previousPlan.recipes && previousPlan.recipes.length > 0) {
    lastWeek = previousPlan.recipes[0].week;
    console.log(`Last selected week was: ${lastWeek}`);
  }

  // Find the next week in sequence
  let nextWeekIndex = weekNumbers.indexOf(lastWeek) + 1;

  // If we reached the end of available weeks, start from the beginning
  if (nextWeekIndex >= weekNumbers.length || nextWeekIndex < 0) {
    nextWeekIndex = 0;
  }

  const selectedWeek = weekNumbers[nextWeekIndex];
  console.log(`Selected next week in sequence: ${selectedWeek}`);

  // Filter recipes by the selected week
  const weeklyRecipes = allRecipes.filter(
    (recipe) => recipe.week === selectedWeek
  );

  // Save the selected recipes to localStorage with today's date
  if (weeklyRecipes.length > 0) {
    const weeklyPlan = {
      recipes: weeklyRecipes,
      cookedMeals: [],
      planDate: new Date().toISOString(),
    };

    DataManager.save("WeeklyRecipes", weeklyPlan);
    console.log(
      `Saved ${weeklyRecipes.length} recipes from week ${selectedWeek} to localStorage`
    );

    return weeklyRecipes;
  } else {
    console.log(`No recipes found for week ${selectedWeek}`);
    return [];
  }
}

/*Resets the Weekly Recipes */
function isTimeToReset() {
  const weeklyPlan = DataManager.load("WeeklyRecipes");

  if (!weeklyPlan || !weeklyPlan.planDate) {
    console.log("No plan data found, reset needed.");
    return true;
  }
  //convert ISO strings to Date Objects:
  const currentDate = new Date();
  const weeklyPlanDate = new Date(weeklyPlan.planDate);

  const timeDiffMs = currentDate - weeklyPlanDate;
  const timeDiffDays = timeDiffMs / (1000 * 60 * 60 * 24);
  console.log(`The time difference in days:`, timeDiffDays);

  return timeDiffDays >= 7;
}

/*Mark a Recipe as Cooked */
function markAsCooked(recipeId) {
  // Marks a recipe as cooked
}
// markAsCooked(recipeId)

/*Resets the weekly recipes manually */
function resetWeeklyPlan() {
  //Resets the plan manually
}
// resetWeeklyPlan()

/*Make a shopping list from the selected recipes */
function getShoppingList() {
  //Generates a shopping list from selected recipes
}
// getShoppingList()
