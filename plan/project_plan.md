# Project Plan: Food App (Vanilla JS, CSS, HTML SPA)

## Overview

A single page application (SPA) built with vanilla JavaScript, CSS, and HTML to manage recipes, ingredients, and users, with nutritional analysis and weekly meal planning. No frameworks will be used.

## Objectives

1. **Recipe Management**

   - Add, edit, and delete recipes manually (using an array of objects or similar data structure).
   - Add, remove, or change ingredients for each recipe.
   - Each recipe should have a name, description, list of ingredients (with quantities and units), instructions, cuisine label (assignable by user), and optional tags.
   - Recipes should be viewable in a list and as individual detail pages.
   - Users must be able to:
     - Create a new recipe from scratch.
     - Edit any part of an existing recipe (name, ingredients, instructions, etc).
     - Delete a recipe.
     - Duplicate a recipe for easy modification.
   - Ingredient management within a recipe should allow:
     - Adding new ingredients (with name, quantity, and unit).
     - Editing or removing existing ingredients.
   - UI should provide clear forms for recipe and ingredient management, with validation for required fields.
   - Changes to recipes should update the data structure and reflect immediately in the UI.
   - (Optional) Support for importing/exporting recipes as JSON for backup or sharing.

2. **Nutritional Information**

   - Integrate with an external API to fetch nutritional info for ingredients.
   - Nutritional info should only be fetched after a recipe is saved (not during editing).
   - Cache nutritional info results for each recipe for 14 days (2 weeks) to prevent repeated API calls.
   - If a recipe or its ingredients are changed, refresh the nutritional info and reset the cache timer.
   - Display nutritional info for each recipe, using cached data when available.

3. **Meal Planning**

   - Bundle recipes into meal/cuisine types.
   - Only 7 recipes are displayed for each week, selected randomly from the available recipes (with option to reset/randomize via a button click).
   - Users can manually randomize/reset the weekly selection at any time.
   - Each meal, once marked as cooked by the user, should be greyed out but still displayed in the weekly list.
   - After all 7 meals are marked as cooked, the weekly recipes are automatically refreshed with a new random selection.
   - Produce an ingredient list per recipe.
   - Generate a shopping list for 7 days' worth of recipes.

4. **User Management & Nutrition Goals**
   - Add up to 5 users.
   - Each user has a profile displaying their personal details (name, age, etc.), weight, and nutritional goals (calories, protein, etc.).
   - On the main screen, a small icon represents each user and tracks their daily nutritional intake compared to their goals.
   - Users can log additional items eaten outside the planned recipes, which are included in their daily intake tracking.
   - Compare meal nutrition (from recipes and additional items) to user intake needs and display progress visually.

## Milestones

1. **Data Structure & Recipe CRUD**

   - Define recipe and ingredient data models.
   - Implement add/remove/change for recipes and ingredients.

2. **API Integration**

   - Research and select a nutrition API.
   - Integrate API for ingredient nutrition lookup.

3. **Meal/Cuisine Bundling & Weekly Plan**

   - Categorize recipes by meal/cuisine type.
   - Implement random selection logic for weekly plan.

4. **Shopping List Generation**

   - Aggregate ingredients for selected recipes.
   - Output a consolidated shopping list.

5. **User Profiles & Nutrition Comparison**
   - Implement user management (max 5 users).
   - Allow setting of nutrition goals.
   - Compare planned meals' nutrition to user needs.

## Deliverables

- Recipe and ingredient management UI
- Nutrition info integration
- Weekly meal planner
- Shopping list generator
- User profiles with nutrition goal tracking

## Next Steps

## Efficient Build Plan (Vanilla JS, CSS, HTML)

### 1. Project Setup

- Create a clear folder structure: `/src` for JS, `/styles` for CSS, `/assets` for images, and an `index.html` at root.
- Set up a basic HTML shell with a root div for dynamic content.

### 2. Data Models & Mock Data

- Define JS objects/arrays for recipes, ingredients, users.
- Store data in-memory for now; use `localStorage` for persistence.

### 3. Core UI & CRUD

- Build UI components as JS functions that render HTML into the root div.
- Implement recipe list/detail, add/edit/delete, ingredient management, cuisine labeling.
- User profile page and user icons on main screen.

### 4. Meal Planning Logic

- Weekly randomization, manual reset, greying out cooked meals, auto-refresh after 7.
- Shopping list and ingredient aggregation.

### 5. Nutrition API Integration

- Use `fetch` to call nutrition API after recipe save.
- Implement 2-week caching using `localStorage` with timestamps.
- Display nutrition info per recipe and user.

### 6. User Nutrition Tracking

- Track daily intake, including extra items, and compare to goals.
- Visual progress bars or icons for each user.

### 7. Polish & Testing

- Responsive CSS, error handling, form validation.
- Manual testing in browser.

### 8. Documentation & Deployment

- Write a simple README.
- Deploy as static site (GitHub Pages, Netlify, etc).

## Estimated Timeline

## Critical Analysis & Most Efficient Plan

### **Core Priorities (Based on Requirements Analysis):**

1. **localStorage-first architecture** - All data persistence without backend
2. **Recipe CRUD with immediate UI updates** - Core functionality
3. **Weekly meal planning with state management** - Complex but essential
4. **User tracking with visual feedback** - Multi-user requirement
5. **API integration with smart caching** - External dependency

### **Detailed Step-by-Step Milestones**

#### **Milestone 1: Foundation & Data Architecture (Day 1-2)**

**Detailed Steps:**

- **File Structure:**
  ```
  /src
    /js
      - app.js (main controller)
      - dataManager.js (localStorage operations)
      - recipeManager.js (recipe CRUD)
      - userManager.js (user management)
      - mealPlanner.js (weekly planning)
      - nutritionCache.js (API caching)
    /styles
      - main.css
      - components.css
  index.html
  ```
- **Data Models (localStorage keys):**
  ```javascript
  recipes: [{ id, name, description, ingredients: [{name, quantity, unit}], instructions, cuisine, nutritionData, nutritionCacheExpiry }]
  users: [{ id, name, age, weight, goals: {calories, protein, carbs, fat}, dailyIntake: [{date, items}] }]
  weeklyPlan: { recipes: [recipeId], cookedMeals: [boolean], planDate }
  nutritionCache: { ingredientName: {data, expiry} }
  ```
- **localStorage Manager with versioning:**
  - Auto-migration for data structure changes
  - Export/import functionality for backup
  - Data validation on load

#### **Milestone 2: Recipe Management System (Day 3-5)**

**Detailed Steps:**

- **Day 3: Basic Recipe CRUD**
  - Add recipe form with dynamic ingredient list
  - Recipe list view with search/filter by cuisine
  - Delete with confirmation modal
- **Day 4: Advanced Recipe Features**
  - Edit mode with pre-populated forms
  - Duplicate recipe functionality
  - Ingredient quantity/unit validation
  - Real-time form validation
- **Day 5: Recipe UI Polish**
  - Recipe detail view with formatted instructions
  - Responsive grid layout for recipe cards
  - Modal/overlay system for forms

#### **Milestone 3: User Management & Profiles (Day 6-7)**

**Detailed Steps:**

- **Day 6: User CRUD & Profiles**
  - User creation form (max 5 validation)
  - Profile editing with nutrition goals
  - User avatar/icon system for main screen
- **Day 7: Daily Intake Tracking**
  - Add additional food items interface
  - Daily intake calculation and display
  - Progress bars/visual indicators for nutrition goals

#### **Milestone 4: Meal Planning Engine (Day 8-10)**

**Detailed Steps:**

- **Day 8: Weekly Selection Logic**
  - Random recipe selection by cuisine type
  - Manual randomize/reset button
  - Week view with 7 recipe slots
- **Day 9: Meal State Management**
  - Mark meals as cooked (grey out)
  - Auto-refresh after 7 meals cooked
  - Persistent weekly plan state
- **Day 10: Shopping List Generation**
  - Aggregate ingredients from weekly recipes
  - Combine duplicate ingredients with quantities
  - Printable/exportable shopping list

#### **Milestone 5: Nutrition API Integration (Day 11-12)**

**Detailed Steps:**

- **Day 11: API Integration**
  - Research nutrition APIs (Edamam, Spoonacular, USDA)
  - Implement fetch after recipe save
  - Error handling for API failures
- **Day 12: Smart Caching System**
  - 14-day cache with timestamps
  - Cache invalidation on recipe changes
  - Fallback for offline/API down scenarios

#### **Milestone 6: UI/UX Polish & Optimization (Day 13-14)**

**Detailed Steps:**

- **Day 13: Responsive Design**
  - Mobile-first CSS design
  - Touch-friendly interfaces
  - Performance optimization (lazy loading)
- **Day 14: User Experience**
  - Loading states and feedback
  - Form validation with helpful messages
  - Accessibility improvements

#### **Milestone 7: Testing & Deployment (Day 15)**

**Detailed Steps:**

- Manual testing across browsers
- localStorage quota handling
- Deploy to static hosting
- Create user documentation

### **Data Structure Update Strategy (No Backend Required)**

**Version Control for localStorage:**

```javascript
const DATA_VERSION = "1.0";
const dataManager = {
  migrate: (oldVersion, newVersion) => {
    // Handle data structure changes
  },
  exportData: () => JSON.stringify(getAllData()),
  importData: (jsonString) => {
    // Validate and import with version checking
  },
};
```

**Total Timeline: 15 days** (assumes 6-8 hours/day focused work)

## Skill-Based Implementation Strategy

### **Beginner Level Approach (Start Here)**

If you're comfortable with basic JavaScript:

- Start with **single HTML file** approach
- Use **simple functions** instead of classes/modules
- **Manual DOM manipulation** with `getElementById`, `innerHTML`
- **Basic event listeners** on individual elements
- **Simple arrays** for data storage before localStorage

**Recommended Starting Point:**

```javascript
// Simple recipe array
let recipes = [];
function addRecipe() {
  /* basic implementation */
}
function displayRecipes() {
  /* loop through array, create HTML */
}
```

### **Intermediate Level Approach**

If you've practiced DOM manipulation, arrays, and objects:

- Use **object-oriented approach** with constructor functions
- Implement **localStorage** for persistence
- Use **event delegation** for dynamic content
- Create **reusable functions** for common tasks

**Example Structure:**

```javascript
function Recipe(name, ingredients, instructions) {
  this.id = Date.now();
  this.name = name;
  // etc.
}
const recipeManager = {
  add: function (recipe) {
    /* implementation */
  },
  save: function () {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  },
};
```

### **Advanced Level Approach**

If you're comfortable with ES6+ and async/await:

- Use **ES6 modules** and **classes**
- Implement **async/await** for API calls
- Use **modern array methods** (map, filter, reduce)
- Create **component-based architecture**

### **Simplified Milestone Progression Based on Skills**

#### **Phase 1: Core Skills Practice (If Beginner)**

- **Recipe List**: Practice arrays, loops, DOM manipulation
- **Add Recipe Form**: Practice form handling, input validation
- **Simple CRUD**: Practice array methods (push, splice, find)

#### **Phase 2: Data Management (If Intermediate)**

- **localStorage Integration**: Practice JSON stringify/parse
- **Data Validation**: Practice error handling
- **Search/Filter**: Practice array methods

#### **Phase 3: Advanced Features (If Advanced)**

- **API Integration**: Practice fetch, promises
- **Complex State Management**: Practice object manipulation
- **UI Components**: Practice modular code organization

## Notes

### **Development Tips Based on Learning Stage:**

- **Start simple**: Build one feature completely before moving to next
- **Use console.log extensively**: Debug and understand data flow
- **Test in small increments**: Don't build large features all at once
- **Use browser dev tools**: Learn debugging techniques
- **Comment your code**: Explain complex logic for future reference
