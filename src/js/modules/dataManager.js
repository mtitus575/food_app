// LOCAL STORAGE OPERATIONS:

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
    this.recipes = this.load("recipes") || this.getSampleRecipes();
    this.users = this.load("users") || this.getSampleUsers();
    this.weeklyPlan =
      this.load("WeeklyRecipes") || this.getEmptyWeeklyRecipes();
  },

  // Sample data methods:
  getSampleRecipes() {
    return [
      {
        id: 1,
        name: "Spaghetti Carbonara",
        ingredients: ["pasta", "eggs", "bacon", "cheese"],
        instructions: "Cook pasta, mix with eggs and bacon...",
      },
    ];
  },

  getSampleUsers() {
    return [
      {
        id: 1,
        name: "Demo User",
        age: 25,
        weight: 70,
        nutritionGoals: { calories: 2000, protein: 150 },
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
