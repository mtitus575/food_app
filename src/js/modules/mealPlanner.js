// WEEKLY MEAL PLANNING:
import { DataManager } from "./dataManager.js";
import { uiManager } from "./uiManager.js";
export {
  selectWeeklyRecipes,
  isTimeToReset,
  markAsCooked,
  resetWeeklyPlan,
  getShoppingList,
  saveShoppingListItemState,
  clearShoppingList,
};

/*Sequential Recipe Selector - cycles through available weeks */
function selectWeeklyRecipes() {
  console.log("🔥 selectWeeklyRecipes() called");

  // ONE-TIME FIX: Clear any corrupted empty plans
  const existingPlan = DataManager.load("WeeklyRecipes");
  if (
    existingPlan &&
    existingPlan.planDate === null &&
    existingPlan.recipes.length === 0
  ) {
    console.log("🧹 Clearing corrupted empty plan");
    DataManager.save("WeeklyRecipes", null);
  }

  // Get all recipes from our data store
  const allRecipes = DataManager.getInitialRecipes();

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

  // SIMPLE DEBUGGING - Direct localStorage check
  console.log("🔍 Direct localStorage check:");
  const rawData = window.localStorage
    ? window.localStorage.getItem("WeeklyRecipes")
    : "localStorage not available";
  console.log("Raw localStorage data:", rawData);

  // Get the previously selected week from localStorage
  const previousPlan = DataManager.load("WeeklyRecipes");
  let lastWeek = 0;

  console.log("🔍 DataManager.load result:", previousPlan);

  if (
    previousPlan &&
    previousPlan.recipes &&
    Array.isArray(previousPlan.recipes) &&
    previousPlan.recipes.length > 0
  ) {
    console.log("✅ Found previous plan with recipes");
    console.log("First recipe week:", previousPlan.recipes[0].week);

    if (
      previousPlan.recipes[0] &&
      typeof previousPlan.recipes[0].week === "number"
    ) {
      lastWeek = previousPlan.recipes[0].week;
      console.log(`✅ Last selected week was: ${lastWeek}`);
    } else {
      console.log("❌ First recipe has no valid week property");
    }
  } else {
    console.log("❌ No valid previous plan found, starting from week 0");
  }

  // Find the next week in sequence
  let nextWeekIndex = weekNumbers.indexOf(lastWeek) + 1;

  // If lastWeek wasn't found in weekNumbers (returns -1), or we reached the end, cycle back to beginning
  if (
    weekNumbers.indexOf(lastWeek) === -1 ||
    nextWeekIndex >= weekNumbers.length
  ) {
    nextWeekIndex = 0; // Start from the first week
  }

  const selectedWeek = weekNumbers[nextWeekIndex];
  console.log(
    `Selected next week in sequence: ${selectedWeek} (lastWeek was: ${lastWeek}, lastWeek found at index: ${weekNumbers.indexOf(
      lastWeek
    )}, nextWeekIndex: ${nextWeekIndex})`
  );

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

    console.log("Saving weekly plan:", weeklyPlan);
    console.log(
      "Weekly plan recipes week numbers:",
      weeklyPlan.recipes.map((r) => r.week)
    );

    const saveResult = DataManager.save("WeeklyRecipes", weeklyPlan);
    console.log("Save result:", saveResult);

    // Verify save by immediately loading it back
    const verification = DataManager.load("WeeklyRecipes");
    console.log("Verification load:", verification);

    // Manual test - save and load with raw localStorage
    console.log("🧪 Manual localStorage test:");
    const manualSave = JSON.stringify(weeklyPlan);
    window.localStorage.setItem("WeeklyRecipes_Manual", manualSave);
    const manualLoad = window.localStorage.getItem("WeeklyRecipes_Manual");
    const manualParsed = JSON.parse(manualLoad);
    console.log("Manual save/load test:", manualParsed);

    // Clear all cooked recipe statuses when selecting new weekly recipes
    try {
      if (DataManager.clearAllCookedRecipes) {
        DataManager.clearAllCookedRecipes();
      }
    } catch (error) {
      console.warn(
        "Could not clear cooked recipes during weekly selection:",
        error
      );
    }

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
  console.log("🕒 isTimeToReset() called");

  const weeklyPlan = DataManager.load("WeeklyRecipes");
  console.log("🕒 Loaded plan for time check:", weeklyPlan);

  // If no plan exists at all (null/undefined), no reset needed - just means no weekly plan selected yet
  if (!weeklyPlan) {
    console.log(
      "🕒 No plan exists - no reset needed, user hasn't selected weekly recipes yet"
    );
    return false;
  }

  // If plan exists but has no planDate, it's corrupted - reset needed
  if (!weeklyPlan.planDate) {
    console.log(
      "🕒 Plan exists but no planDate - corrupted data, reset needed"
    );
    return true;
  }

  // If plan exists but has empty recipes array, it's corrupted - reset needed
  if (!weeklyPlan.recipes || weeklyPlan.recipes.length === 0) {
    console.log(
      "🕒 Plan exists but empty recipes array - corrupted data, reset needed"
    );
    return true;
  }

  //convert ISO strings to Date Objects:
  const currentDate = new Date();
  const weeklyPlanDate = new Date(weeklyPlan.planDate);

  const timeDiffMs = currentDate - weeklyPlanDate;
  const timeDiffDays = timeDiffMs / (1000 * 60 * 60 * 24);
  console.log(`🕒 Time difference in days: ${timeDiffDays}`);

  const shouldReset = timeDiffDays >= 7;
  console.log(`🕒 Should reset: ${shouldReset}`);
  return shouldReset;
}

/*Mark a Recipe as Cooked */
function markAsCooked(recipeId) {
  // Marks a recipe as cooked
}
// markAsCooked(recipeId)

/*Resets the weekly recipes manually */
function resetWeeklyPlan() {
  // Clear the weekly plan from localStorage completely
  DataManager.save("WeeklyRecipes", null);

  // Clear all cooked recipe statuses when resetting weekly plan
  try {
    if (DataManager.clearAllCookedRecipes) {
      DataManager.clearAllCookedRecipes();
    }
  } catch (error) {
    console.warn("Could not clear cooked recipes during reset:", error);
  }

  console.log("Weekly plan has been reset manually");

  // Return all recipes to display
  return DataManager.getInitialRecipes();
}

/*Make a shopping list from the selected recipes */
function getShoppingList() {
  const weeklyPlan = DataManager.load("WeeklyRecipes");

  if (!weeklyPlan || !weeklyPlan.recipes || weeklyPlan.recipes.length === 0) {
    console.warn("No weekly recipes found for shopping list");
    return null;
  }

  // Helper function to normalize ingredient names and units for better duplicate detection
  // This consolidates ingredients like "bell pepper" and "bell peppers", "grams" and "g", etc.
  // All units are normalized to shorthand forms (g, ml, tbsp, etc.)
  function normalizeIngredient(ingredient) {
    // Normalize ingredient name - remove extra spaces, convert to lowercase
    let normalizedName = ingredient.name.toLowerCase().trim();

    // Handle common ingredient name variations
    const nameMapping = {
      "bell pepper": "bell peppers",
      "bell peppers": "bell peppers",
      "green pepper": "bell peppers",
      "red pepper": "bell peppers",
      onion: "onions",
      "garlic clove": "garlic cloves",
      garlic: "garlic cloves",
      tomato: "tomatoes",
      carrot: "carrots",
      potato: "potatoes",
      lemon: "lemons",
      lime: "limes",
    };

    if (nameMapping[normalizedName]) {
      normalizedName = nameMapping[normalizedName];
    }

    // Normalize units to use shorthand forms
    let normalizedUnit = ingredient.unit.toLowerCase().trim();
    const unitMapping = {
      grams: "g",
      gram: "g",
      kilograms: "kg",
      kilogram: "kg",
      milliliters: "ml",
      milliliter: "ml",
      liters: "l",
      liter: "l",
      piece: "whole",
      pieces: "whole",
      item: "whole",
      items: "whole",
      tablespoons: "tbsp",
      tablespoon: "tbsp",
      teaspoons: "tsp",
      teaspoon: "tsp",
      can: "cans",
      tin: "cans",
      pack: "packs",
      packet: "packs",
      pouch: "pouches",
    };

    if (unitMapping[normalizedUnit]) {
      normalizedUnit = unitMapping[normalizedUnit];
    }

    return {
      normalizedName,
      normalizedUnit,
      displayName: ingredient.name, // Keep original name for display
      displayUnit: ingredient.unit, // Keep original unit for display
      amount: ingredient.amount,
    };
  }

  // Aggregate all ingredients from selected recipes
  const ingredientMap = new Map();

  weeklyPlan.recipes.forEach((recipe) => {
    if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
      recipe.ingredients.forEach((ingredient) => {
        const normalized = normalizeIngredient(ingredient);
        const key = `${normalized.normalizedName}_${normalized.normalizedUnit}`;

        if (ingredientMap.has(key)) {
          // Add to existing ingredient amount
          const existing = ingredientMap.get(key);
          existing.amount += normalized.amount;
        } else {
          // Add new ingredient
          ingredientMap.set(key, {
            name: normalized.displayName,
            amount: normalized.amount,
            unit: normalized.displayUnit,
            normalizedName: normalized.normalizedName,
            normalizedUnit: normalized.normalizedUnit,
            checked: false,
            id: Date.now() + Math.random(), // Unique ID for each item
          });
        }
      });
    }

    // Also include any added ingredients
    if (recipe.addedIngredients && Array.isArray(recipe.addedIngredients)) {
      recipe.addedIngredients.forEach((ingredient) => {
        const normalized = normalizeIngredient(ingredient);
        const key = `${normalized.normalizedName}_${normalized.normalizedUnit}`;

        if (ingredientMap.has(key)) {
          const existing = ingredientMap.get(key);
          existing.amount += normalized.amount;
        } else {
          ingredientMap.set(key, {
            name: normalized.displayName,
            amount: normalized.amount,
            unit: normalized.displayUnit,
            normalizedName: normalized.normalizedName,
            normalizedUnit: normalized.normalizedUnit,
            checked: false,
            id: Date.now() + Math.random(),
          });
        }
      });
    }
  });

  // Convert map to array and sort alphabetically
  const shoppingList = Array.from(ingredientMap.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // Load any existing shopping list state from localStorage
  const savedShoppingList = DataManager.load("ShoppingList");
  if (savedShoppingList && savedShoppingList.items) {
    // Merge checked states from saved list
    shoppingList.forEach((item) => {
      const savedItem = savedShoppingList.items.find(
        (saved) =>
          (saved.normalizedName || saved.name.toLowerCase()) ===
            (item.normalizedName || item.name.toLowerCase()) &&
          (saved.normalizedUnit || saved.unit.toLowerCase()) ===
            (item.normalizedUnit || item.unit.toLowerCase())
      );
      if (savedItem) {
        item.checked = savedItem.checked;
      }
    });
  }

  const shoppingListData = {
    items: shoppingList,
    createdDate: new Date().toISOString(),
    weeklyPlanDate: weeklyPlan.planDate,
  };

  // Save the shopping list
  DataManager.save("ShoppingList", shoppingListData);

  return shoppingListData;
}

/*Save shopping list item check state */
function saveShoppingListItemState(itemId, checked) {
  const shoppingList = DataManager.load("ShoppingList");
  if (shoppingList && shoppingList.items) {
    const item = shoppingList.items.find((item) => item.id === itemId);
    if (item) {
      item.checked = checked;
      DataManager.save("ShoppingList", shoppingList);
    }
  }
}

/*Clear shopping list */
function clearShoppingList() {
  DataManager.save("ShoppingList", null);
}
// getShoppingList()
