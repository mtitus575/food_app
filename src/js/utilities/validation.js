// INPUT VALIDATION AND SANITIZATION MODULE

export const Validator = {
  // Sanitize HTML content to prevent XSS
  sanitizeHTML(input) {
    if (typeof input !== "string") return "";

    // Create a temporary element to decode HTML entities safely
    const tempDiv = document.createElement("div");
    tempDiv.textContent = input;
    return tempDiv.innerHTML;
  },

  // Validate and sanitize ingredient name
  validateIngredientName(name) {
    if (typeof name !== "string") return "";

    // Remove potentially dangerous characters but keep spaces, letters, numbers, and common food chars
    const sanitized = name.replace(/[<>\"'&]/g, "").trim();

    // Limit length to prevent excessive data
    return sanitized.substring(0, 100);
  },

  // Enhanced text validation for general purposes
  validateText(text, maxLength = 100) {
    if (typeof text !== "string") return "";

    // Remove dangerous characters and trim
    const sanitized = text.replace(/[<>\"'&]/g, "").trim();

    // Limit length
    return sanitized.substring(0, maxLength);
  },

  // Validate search queries
  validateSearchQuery(query) {
    if (typeof query !== "string") return "";

    // Remove script tags, dangerous characters
    const sanitized = query
      .replace(/<script[^>]*>.*?<\/script>/gi, "")
      .replace(/[<>\"'&]/g, "")
      .trim();

    // Limit length and return
    return sanitized.substring(0, 100);
  },

  // Validate numeric input (amount, nutrition values)
  validateNumber(value, min = 0, max = 999999) {
    const num = parseFloat(value);
    if (isNaN(num)) return 0;
    return Math.max(min, Math.min(max, num));
  },

  // Validate unit input
  validateUnit(unit) {
    if (typeof unit !== "string") return "whole";

    const validUnits = [
      "g",
      "kg",
      "ml",
      "l",
      "whole",
      "cup",
      "cups",
      "tsp",
      "tbsp",
      "oz",
      "lb",
      "pinch",
      "pinches",
      "bunch",
      "bunches",
      "can",
      "cans",
      "sachet",
      "sachets",
      "pouch",
      "pouches",
      // Keep some full forms for backward compatibility
      "grams",
      "kilograms",
      "milliliters",
      "liters",
      "teaspoons",
      "tablespoons",
    ];
    const sanitized = unit
      .toLowerCase()
      .replace(/[<>\"'&]/g, "")
      .trim();

    // Check if it's a valid unit, otherwise default to 'whole'
    return validUnits.includes(sanitized) ? sanitized : "whole";
  },

  // Validate and sanitize localStorage data
  validateStorageData(data, expectedStructure = {}) {
    if (!data || typeof data !== "object") return null;

    try {
      // Basic structure validation
      const validated = {};

      // If it's an array, validate each item
      if (Array.isArray(data)) {
        return data.map((item) =>
          this.validateStorageData(item, expectedStructure)
        );
      }

      // For objects, validate each property
      for (const [key, value] of Object.entries(data)) {
        if (typeof key === "string" && key.length < 100) {
          if (typeof value === "string") {
            validated[key] = this.sanitizeHTML(value);
          } else if (typeof value === "number" && !isNaN(value)) {
            validated[key] = this.validateNumber(value);
          } else if (typeof value === "object") {
            validated[key] = this.validateStorageData(value, expectedStructure);
          }
        }
      }

      return validated;
    } catch (error) {
      console.error("Error validating storage data:", error);
      return null;
    }
  },

  // Safe JSON parse with validation
  safeJSONParse(jsonString, fallback = null) {
    try {
      if (typeof jsonString !== "string") return fallback;

      const parsed = JSON.parse(jsonString);
      return this.validateStorageData(parsed) || fallback;
    } catch (error) {
      console.error("Invalid JSON in storage:", error);
      return fallback;
    }
  },

  // Validate localStorage keys
  validateStorageKey(key) {
    if (typeof key !== "string" || key.length === 0 || key.length > 100) {
      return false;
    }
    // Only allow alphanumeric, underscore, and hyphen
    return /^[a-zA-Z0-9_-]+$/.test(key);
  },

  // Validate ingredient object
  validateIngredient(ingredient) {
    if (!ingredient || typeof ingredient !== "object") {
      return {
        ingredient: "",
        amount: 1,
        unit: "whole",
        calories: 0,
        protein_g: 0,
        fat_total_g: 0,
        carbohydrates_total_g: 0,
        fiber_g: 0,
        sugar_g: 0,
        sodium_mg: 0,
      };
    }

    return {
      ingredient: this.validateIngredientName(ingredient.ingredient || ""),
      amount: this.validateNumber(ingredient.amount, 0.01, 10000),
      unit: this.validateUnit(ingredient.unit || "whole"),
      calories: this.validateNumber(ingredient.calories, 0, 9999),
      protein_g: this.validateNumber(ingredient.protein_g, 0, 999),
      fat_total_g: this.validateNumber(ingredient.fat_total_g, 0, 999),
      carbohydrates_total_g: this.validateNumber(
        ingredient.carbohydrates_total_g,
        0,
        999
      ),
      fiber_g: this.validateNumber(ingredient.fiber_g, 0, 999),
      sugar_g: this.validateNumber(ingredient.sugar_g, 0, 999),
      sodium_mg: this.validateNumber(ingredient.sodium_mg, 0, 99999),
    };
  },

  // Validate shopping list item
  validateShoppingListItem(item) {
    if (!item || typeof item !== "object") {
      return {
        id: "",
        name: "",
        amount: 1,
        unit: "whole",
        checked: false,
      };
    }

    return {
      id: this.sanitizeHTML(String(item.id || "")),
      name: this.validateIngredientName(item.name || ""),
      amount: this.validateNumber(item.amount, 0.01, 10000),
      unit: this.validateUnit(item.unit || "whole"),
      checked: Boolean(item.checked),
    };
  },

  // Validate recipe object structure
  validateRecipe(recipe) {
    if (!recipe || typeof recipe !== "object") {
      return null;
    }

    const validatedRecipe = {
      id: this.validateNumber(recipe.id, 1, 999999),
      name: this.validateText(recipe.name, 200),
      image: this.validateText(recipe.image, 500),
      instructions: Array.isArray(recipe.instructions)
        ? recipe.instructions.map((instruction) =>
            this.validateText(instruction, 1000)
          )
        : [],
      ingredients: Array.isArray(recipe.ingredients)
        ? recipe.ingredients.map((ingredient) =>
            this.validateIngredient(ingredient)
          )
        : [],
      servings: this.validateNumber(recipe.servings, 1, 50),
      cookingTime: this.validateText(recipe.cookingTime, 50),
      difficulty: this.validateText(recipe.difficulty, 20),
    };

    // Ensure recipe has required fields
    if (!validatedRecipe.name || !validatedRecipe.id) {
      console.warn("Recipe missing required fields:", validatedRecipe);
      return null;
    }

    return validatedRecipe;
  },
};
