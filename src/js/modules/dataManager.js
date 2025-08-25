// LOCAL STORAGE OPERATIONS:

import { RECIPE_BANK } from "../data/initialRecipes.js";
import { VALID_UNITS } from "../data/initialRecipes.js";

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
    localStorage.setItem(key, JSON.stringify(data));
  },
  load(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },
  //Method to retrieve data from storage on loading / display sample data:
  //Note arrow functions do not have a `this` context.
  init() {
    this.recipes = this.load("recipes") || this.getInitialRecipes();
    this.users = this.load("users") || this.getSampleUsers();
    this.weeklyPlan =
      this.load("WeeklyRecipes") || this.getEmptyWeeklyRecipes();
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
};

export { DataManager };

//testing:
const testRecipes = DataManager.getInitialRecipes();
console.log(testRecipes[0].cookTime);
