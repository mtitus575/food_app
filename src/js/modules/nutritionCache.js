// NUTRITION API INTEGRATION:
import { api_key_calNinjas } from "../../../assets/config.js";

class NutritionAPI {
  constructor() {
    this.baseURL = "https://api.calorieninjas.com/v1/nutrition";
    this.apiKey = api_key_calNinjas;
    this.cache = this.loadCache();

    // Rate limiting: store request timestamps
    this.requestTimestamps = [];
    this.MAX_REQUESTS_PER_MINUTE = 10; // Adjust based on API limits
    this.requestDelay = 100; // Minimum delay between requests (ms)
    this.lastRequestTime = 0;
  }

  // Load cache from localStorage
  loadCache() {
    try {
      return JSON.parse(localStorage.getItem("nutritionCache")) || {};
    } catch (error) {
      console.error("Error loading nutrition cache:", error);
      return {};
    }
  }

  // Save cache to localStorage
  saveCache() {
    try {
      localStorage.setItem("nutritionCache", JSON.stringify(this.cache));
    } catch (error) {
      console.error("Error saving nutrition cache:", error);
    }
  }

  // Rate limiting enforcement
  async enforceRateLimit() {
    const now = Date.now();

    // Remove timestamps older than 1 minute
    this.requestTimestamps = this.requestTimestamps.filter(
      (timestamp) => now - timestamp < 60000
    );

    // Check if we've exceeded the rate limit
    if (this.requestTimestamps.length >= this.MAX_REQUESTS_PER_MINUTE) {
      const oldestRequest = Math.min(...this.requestTimestamps);
      const waitTime = 60000 - (now - oldestRequest);
      console.warn(
        `Rate limit reached. Waiting ${waitTime}ms before next request.`
      );
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }

    // Ensure minimum delay between requests
    const timeSinceLastRequest = now - this.lastRequestTime;
    if (timeSinceLastRequest < this.requestDelay) {
      await new Promise((resolve) =>
        setTimeout(resolve, this.requestDelay - timeSinceLastRequest)
      );
    }

    // Record this request
    this.requestTimestamps.push(Date.now());
    this.lastRequestTime = Date.now();
  }

  // Generate cache key for ingredient
  getCacheKey(ingredient) {
    return `${ingredient.amount}_${ingredient.unit}_${ingredient.name}`.toLowerCase();
  }

  // Fetch nutrition data for a single ingredient
  async fetchIngredientData(ingredient) {
    const cacheKey = this.getCacheKey(ingredient);

    // Check cache first
    if (this.cache[cacheKey]) {
      // console.log(`Using cached data for: ${ingredient.name}`);
      return this.cache[cacheKey];
    }

    try {
      // Rate limiting check
      await this.enforceRateLimit();

      const query = `${ingredient.amount} ${ingredient.unit} ${ingredient.name}`;
      // console.log(`Fetching nutrition data for: ${query}`);

      const response = await fetch(
        `${this.baseURL}?query=${encodeURIComponent(query)}`,
        {
          method: "GET",
          headers: {
            "X-Api-Key": this.apiKey,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();

      // Cache the result
      if (data.items && data.items.length > 0) {
        this.cache[cacheKey] = data;
        this.saveCache();
        // console.log(`Cached nutrition data for: ${ingredient.name}`);
      }

      return data;
    } catch (error) {
      console.error(
        `Error fetching nutrition data for ${ingredient.name}:`,
        error
      );

      // Fallback to mock data if API fails
      // console.log(`Falling back to mock data for: ${ingredient.name}`);
      const mockData = {
        items: [
          {
            calories: Math.floor(Math.random() * 100) + 50,
            protein_g: Math.floor(Math.random() * 10) + 2,
            fat_total_g: Math.floor(Math.random() * 8) + 1,
            carbohydrates_total_g: Math.floor(Math.random() * 20) + 5,
            fiber_g: Math.floor(Math.random() * 3) + 1,
            sugar_g: Math.floor(Math.random() * 5) + 1,
            sodium_mg: Math.floor(Math.random() * 200) + 50,
          },
        ],
      };

      return mockData;
    }
  }

  // Fetch nutrition data for all ingredients in a recipe
  async fetchRecipeNutrition(recipe) {
    if (!recipe.ingredients || !Array.isArray(recipe.ingredients)) {
      console.warn("No ingredients found in recipe");
      return null;
    }

    // console.log(`Fetching nutrition data for recipe: ${recipe.name}`);
    const nutritionData = [];
    const totals = {
      calories: 0,
      protein_g: 0,
      fat_total_g: 0,
      carbohydrates_total_g: 0,
      fiber_g: 0,
      sugar_g: 0,
      sodium_mg: 0,
    };

    for (const ingredient of recipe.ingredients) {
      const data = await this.fetchIngredientDataWithUserPriority(ingredient);

      if (data && data.items && data.items.length > 0) {
        const item = data.items[0];

        // Store individual ingredient nutrition (for verification against shop labels)
        const ingredientNutrition = {
          ingredient: ingredient.name,
          amount: ingredient.amount,
          unit: ingredient.unit,
          calories: item.calories || 0,
          protein_g: item.protein_g || 0,
          fat_total_g: item.fat_total_g || 0,
          carbohydrates_total_g: item.carbohydrates_total_g || 0,
          fiber_g: item.fiber_g || 0,
          sugar_g: item.sugar_g || 0,
          sodium_mg: item.sodium_mg || 0,
        };

        nutritionData.push(ingredientNutrition);

        // Add to totals (this will be the total for the entire recipe)
        totals.calories += item.calories || 0;
        totals.protein_g += item.protein_g || 0;
        totals.fat_total_g += item.fat_total_g || 0;
        totals.carbohydrates_total_g += item.carbohydrates_total_g || 0;
        totals.fiber_g += item.fiber_g || 0;
        totals.sugar_g += item.sugar_g || 0;
        totals.sodium_mg += item.sodium_mg || 0;
      }
    }

    // Calculate per-portion nutrition (divide totals by servings)
    const servings = recipe.servings || 4; // Default to 4 if not specified
    const perPortion = {
      calories: totals.calories / servings,
      protein_g: totals.protein_g / servings,
      fat_total_g: totals.fat_total_g / servings,
      carbohydrates_total_g: totals.carbohydrates_total_g / servings,
      fiber_g: totals.fiber_g / servings,
      sugar_g: totals.sugar_g / servings,
      sodium_mg: totals.sodium_mg / servings,
    };

    return {
      ingredients: nutritionData, // Individual ingredient nutrition for verification
      totals: totals, // Total for entire recipe
      perPortion: perPortion, // Nutrition per single portion
      servings: servings,
      recipeName: recipe.name,
    };
  }

  // Save user-edited nutrition data (takes priority over fetched data)
  saveUserEdit(ingredient, nutritionValues) {
    // console.log("saveUserEdit called with:", { ingredient, nutritionValues });

    const cacheKey = this.getCacheKey(ingredient);
    // console.log("Generated cache key:", cacheKey);

    const userEditKey = `user_edit_${cacheKey}`;
    // console.log("User edit key:", userEditKey);

    const userEditData = {
      items: [nutritionValues],
      isUserEdited: true,
      editDate: new Date().toISOString(),
    };

    // console.log("User edit data to save:", userEditData);

    this.cache[userEditKey] = userEditData;
    this.saveCache();
    // console.log(`Saved user edit for: ${ingredient.name}`);
    // console.log("Current cache keys:", Object.keys(this.cache));
  }

  // Check if user has edited this ingredient
  getUserEdit(ingredient) {
    const cacheKey = this.getCacheKey(ingredient);
    const userEditKey = `user_edit_${cacheKey}`;
    const result = this.cache[userEditKey] || null;
    // console.log(
    //   `getUserEdit for ${ingredient.name}: found ${result ? "YES" : "NO"}`
    // );
    if (result) {
      // console.log("User edit data:", result);
    }
    return result;
  }

  // Modified fetchIngredientData to check for user edits first
  async fetchIngredientDataWithUserPriority(ingredient) {
    // console.log(
    //   `fetchIngredientDataWithUserPriority called for: ${ingredient.name}`
    // );

    // Check for user edits first (highest priority)
    const userEdit = this.getUserEdit(ingredient);
    if (userEdit) {
      // console.log(`Using user-edited data for: ${ingredient.name}`, userEdit);
      return userEdit;
    }

    // Fall back to regular API/cache data
    // console.log(
    //   `No user edit found, fetching regular data for: ${ingredient.name}`
    // );
    return await this.fetchIngredientData(ingredient);
  }

  // Clear nutrition cache
  clearCache() {
    this.cache = {};
    localStorage.removeItem("nutritionCache");
    // console.log("Nutrition cache cleared");
  }

  // Clear only user edits
  clearUserEdits() {
    const keys = Object.keys(this.cache);
    keys.forEach((key) => {
      if (key.startsWith("user_edit_")) {
        delete this.cache[key];
      }
    });
    this.saveCache();
    // console.log("User edits cleared");
  }
}

// Export function to get nutrition API instance
export function getIngredientData() {
  return new NutritionAPI();
}
