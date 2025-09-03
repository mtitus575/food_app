// NUTRITION API INTEGRATION WITH SECURE KEY MANAGEMENT:
import { api_key_calNinjas, hasApiKey } from "../../../assets/config.secure.js";

class NutritionAPI {
  constructor() {
    this.baseURL = "https://api.calorieninjas.com/v1/nutrition";
    this.apiKey = api_key_calNinjas;
    this.cache = this.loadCache();
    this.isDemo = localStorage.getItem("nutritionMode") === "demo";

    // Rate limiting: store request timestamps
    this.requestTimestamps = [];
    this.MAX_REQUESTS_PER_MINUTE = 10; // Adjust based on API limits
    this.requestDelay = 100; // Minimum delay between requests (ms)
    this.lastRequestTime = 0;
  }

  // Check if we can make API calls
  canUseAPI() {
    return hasApiKey() && !this.isDemo && this.apiKey !== "DEMO_MODE";
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

    // If no API key available or in demo mode, return mock data
    if (!this.canUseAPI()) {
      return this.generateMockNutritionData(ingredient);
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
      return this.generateMockNutritionData(ingredient);
    }
  }

  // Generate realistic mock nutrition data
  generateMockNutritionData(ingredient) {
    console.log(`📊 Using demo nutrition data for: ${ingredient.name}`);

    // Base nutrition values per 100g (realistic averages)
    const nutritionBases = {
      // Proteins
      chicken: {
        calories: 165,
        protein_g: 31,
        fat_total_g: 3.6,
        carbohydrates_total_g: 0,
      },
      beef: {
        calories: 250,
        protein_g: 26,
        fat_total_g: 17,
        carbohydrates_total_g: 0,
      },
      salmon: {
        calories: 208,
        protein_g: 22,
        fat_total_g: 12,
        carbohydrates_total_g: 0,
      },
      cod: {
        calories: 82,
        protein_g: 18,
        fat_total_g: 0.7,
        carbohydrates_total_g: 0,
      },

      // Vegetables
      tomato: {
        calories: 18,
        protein_g: 0.9,
        fat_total_g: 0.2,
        carbohydrates_total_g: 3.9,
      },
      onion: {
        calories: 40,
        protein_g: 1.1,
        fat_total_g: 0.1,
        carbohydrates_total_g: 9.3,
      },
      "bell pepper": {
        calories: 31,
        protein_g: 1,
        fat_total_g: 0.3,
        carbohydrates_total_g: 7,
      },
      carrot: {
        calories: 41,
        protein_g: 0.9,
        fat_total_g: 0.2,
        carbohydrates_total_g: 10,
      },

      // Grains
      rice: {
        calories: 130,
        protein_g: 2.7,
        fat_total_g: 0.3,
        carbohydrates_total_g: 28,
      },
      pasta: {
        calories: 131,
        protein_g: 5,
        fat_total_g: 1.1,
        carbohydrates_total_g: 25,
      },

      // Default for unknown ingredients
      default: {
        calories: 50,
        protein_g: 2,
        fat_total_g: 1,
        carbohydrates_total_g: 8,
      },
    };

    // Find best match for ingredient
    const ingredientName = ingredient.name.toLowerCase();
    let nutritionBase = nutritionBases.default;

    for (const [key, value] of Object.entries(nutritionBases)) {
      if (ingredientName.includes(key)) {
        nutritionBase = value;
        break;
      }
    }

    // Scale nutrition based on amount and unit
    const scaleFactor = this.calculateScaleFactor(
      ingredient.amount,
      ingredient.unit
    );

    const mockData = {
      items: [
        {
          calories: Math.round(nutritionBase.calories * scaleFactor),
          protein_g:
            Math.round(nutritionBase.protein_g * scaleFactor * 10) / 10,
          fat_total_g:
            Math.round(nutritionBase.fat_total_g * scaleFactor * 10) / 10,
          carbohydrates_total_g:
            Math.round(nutritionBase.carbohydrates_total_g * scaleFactor * 10) /
            10,
          fiber_g:
            Math.round(
              nutritionBase.carbohydrates_total_g * 0.1 * scaleFactor * 10
            ) / 10,
          sugar_g:
            Math.round(
              nutritionBase.carbohydrates_total_g * 0.3 * scaleFactor * 10
            ) / 10,
          sodium_mg: Math.round(50 * scaleFactor),
        },
      ],
      isDemoData: true,
    };

    // Cache demo data too
    this.cache[this.getCacheKey(ingredient)] = mockData;
    this.saveCache();

    return mockData;
  }

  // Calculate scaling factor for different units
  calculateScaleFactor(amount, unit) {
    const unitConversions = {
      g: amount / 100, // Nutrition bases are per 100g
      ml: amount / 100, // Approximate for liquids
      tbsp: (amount * 15) / 100, // 1 tbsp ≈ 15ml
      tsp: (amount * 5) / 100, // 1 tsp ≈ 5ml
      whole: amount * 0.5, // Approximate for whole items
      cup: (amount * 200) / 100, // 1 cup ≈ 200g average
      piece: amount * 0.3, // Approximate for pieces
      can: (amount * 400) / 100, // 1 can ≈ 400g
      pack: (amount * 250) / 100, // 1 pack ≈ 250g
    };

    return unitConversions[unit.toLowerCase()] || amount / 100;
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
