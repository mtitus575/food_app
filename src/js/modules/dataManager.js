// LOCAL STORAGE OPERATIONS:

import { RECIPE_BANK } from "../data/initialRecipes.js";
import { VALID_UNITS } from "../data/initialRecipes.js";
import { Validator } from "../utilities/validation.js";

// Create a localStorage polyfill for Node.js environment
const getLocalStorage = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    return window.localStorage;
  } else {
    // Simple in-memory storage for Node.js
    let storage = {};
    return {
      getItem(key) {
        return storage[key] || null;
      },
      setItem(key, value) {
        storage[key] = value.toString();
      },
      removeItem(key) {
        delete storage[key];
      },
      clear() {
        storage = {};
      },
    };
  }
};

// Use the appropriate localStorage based on environment
const localStorage = getLocalStorage();

const DataManager = {
  recipes: [],
  users: [],
  weeklyPlan: {
    recipes: [],
    cookedMeals: [],
  },
  nutritionCache: [],

  //Methods to store and retrieve data:
  save(key, data) {
    try {
      // Validate the key
      if (!Validator.validateStorageKey(key)) {
        console.error("Invalid storage key:", key);
        return false;
      }

      // Validate and sanitize data before saving
      const validatedData = Validator.validateStorageData(data);
      if (validatedData === null) {
        console.error("Invalid data structure provided for storage");
        return false;
      }

      // Validate data size (localStorage has ~5-10MB limit)
      const jsonString = JSON.stringify(validatedData);
      if (jsonString.length > 5000000) {
        // 5MB limit
        console.error("Data too large for localStorage");
        return false;
      }

      localStorage.setItem(key, jsonString);
      return true;
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      return false;
    }
  },
  load(key) {
    try {
      if (!Validator.validateStorageKey(key)) {
        console.error("Invalid storage key:", key);
        return null;
      }

      const data = localStorage.getItem(key);
      return data ? Validator.safeJSONParse(data) : null;
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      return null;
    }
  },
  clear() {
    return localStorage.clear();
  },
  //Method to retrieve data from storage on loading / display sample data:
  //Note arrow functions do not have a `this` context.
  init() {
    console.log("=== DataManager.init() called ===");

    const recipes = (this.recipes =
      this.load("recipes") || this.getInitialRecipes());
    const users = (this.users = this.load("users") || this.getSampleUsers());

    console.log("Loading WeeklyRecipes from localStorage...");
    const loadedWeeklyPlan = this.load("WeeklyRecipes");
    console.log("Loaded WeeklyRecipes:", loadedWeeklyPlan);

    const weeklyPlan = (this.weeklyPlan =
      loadedWeeklyPlan || this.getEmptyWeeklyRecipes());

    console.log("Final weeklyPlan assigned:", weeklyPlan);

    return { recipes: recipes, users: users, weeklyPlan: weeklyPlan };
  },

  // Sample data methods:
  getInitialRecipes() {
    return RECIPE_BANK;
  },

  getSampleUsers() {
    return [
      {
        id: 1,
        name: "Demo User1",
        age: 32,
        weight: 91,
        nutritionGoals: { calories: 1700, protein: 170 },
      },
      {
        id: 2,
        name: "Demo User2",
        age: 30,
        weight: 61,
        nutritionGoals: { calories: 1400, protein: 61 },
      },
    ];
  },

  getEmptyWeeklyRecipes() {
    return {
      recipes: [],
      cookedMeals: [],
      planDate: null,
    };
  },

  // Cooked recipes management
  getCookedRecipes() {
    return this.load("cookedRecipes") || [];
  },

  markRecipeAsCooked(recipeId) {
    try {
      const cookedRecipes = this.getCookedRecipes();
      const cookedEntry = {
        id: recipeId,
        cookedDate: new Date().toISOString(),
        timestamp: Date.now(),
      };

      // Add if not already marked as cooked
      if (!cookedRecipes.find((cooked) => cooked.id === recipeId)) {
        cookedRecipes.push(cookedEntry);
        this.save("cookedRecipes", cookedRecipes);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error marking recipe as cooked:", error);
      return false;
    }
  },

  isRecipeCooked(recipeId) {
    const cookedRecipes = this.getCookedRecipes();
    return cookedRecipes.some((cooked) => cooked.id === recipeId);
  },

  unmarkRecipeAsCooked(recipeId) {
    try {
      const cookedRecipes = this.getCookedRecipes();
      const filteredRecipes = cookedRecipes.filter(
        (cooked) => cooked.id !== recipeId
      );
      this.save("cookedRecipes", filteredRecipes);
      return true;
    } catch (error) {
      console.error("Error unmarking recipe as cooked:", error);
      return false;
    }
  },

  clearAllCookedRecipes() {
    try {
      this.save("cookedRecipes", []);
      console.log(
        "✅ All cooked recipe statuses cleared for new weekly selection"
      );
      return true;
    } catch (error) {
      console.error("Error clearing cooked recipes:", error);
      return false;
    }
  },
};

export { DataManager };
