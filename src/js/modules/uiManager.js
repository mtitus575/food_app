import { DataManager } from "./dataManager.js";
import { titleCase } from "../utilities/helperFunctions.js";
import { createComponent } from "../utilities/helperFunctions.js";
import {
  selectWeeklyRecipes,
  resetWeeklyPlan,
  getShoppingList,
  saveShoppingListItemState,
} from "./mealPlanner.js";
import { getIngredientData } from "./nutritionCache.js";
import { Validator } from "../utilities/validation.js";
import { searchItem } from "./searchFunction.js";

export const uiManager = {
  // State tracker for current view mode
  currentViewState: {
    mode: "all", // 'all' or 'weekly'
    isSearchActive: false,
  },

  // Method to update current view state
  setViewState: function (mode) {
    this.currentViewState.mode = mode;
    // Persist view state to localStorage
    DataManager.save("currentViewState", { mode: mode });
    console.log(`View state updated to: ${mode}`);
  },

  // Method to get current view state
  getCurrentViewMode: function () {
    // Try to load from localStorage first
    const saved = DataManager.load("currentViewState");
    if (saved && saved.mode) {
      this.currentViewState.mode = saved.mode;
    }
    return this.currentViewState.mode;
  },

  // Method to set search state
  setSearchState: function (isActive) {
    this.currentViewState.isSearchActive = isActive;
  },

  loadTotalRecipes: function (
    recipesToShow = null,
    isWeeklySelection = false,
    isSearchResult = false
  ) {
    const recipeTotal = document.getElementById("recipe_total");

    if (recipesToShow && recipesToShow.length !== undefined) {
      // Show count of currently displayed recipes (weekly, search results, or specific set)
      recipeTotal.textContent = recipesToShow.length;
    } else {
      // Fallback: Show total recipes available
      const recipeSavedTotal = DataManager.getInitialRecipes().length;
      recipeTotal.textContent = recipeSavedTotal;
    }

    return recipeTotal.textContent;
  },
  createRecipeCard: function (input, isWeeklySelection = false) {
    // const recipeArray = DataManager.init().recipes; //saved array from my dataset.
    const recipeArray = input;
    const recipeContainer = document.getElementById("recipe_wrapper"); //Parent element for recipies.

    for (let recipe of recipeArray) {
      //for each recipe, create a card components:
      const recipeCard = document.createElement("div");
      const recipeImg = document.createElement("img");
      const recipeName = document.createElement("h3");

      //create classNames for each element:
      recipeCard.className = "recipe_item";
      recipeImg.className = "recipeImg";
      recipeName.className = "recipeName";

      // Check if recipe is cooked and add styling
      const isCooked = DataManager.isRecipeCooked(recipe.id);
      if (isCooked) {
        recipeCard.classList.add("recipe-cooked");
      }

      //Append the card to the parent container and it's child elements:
      recipeContainer.append(recipeCard);
      recipeCard.append(recipeImg, recipeName);

      //building out the recipeCard:
      recipeImg.src = recipe.image;
      recipeName.textContent = titleCase(recipe.name);

      // Add cooked indicator if recipe is cooked
      if (isCooked) {
        const cookedIndicator = document.createElement("div");
        cookedIndicator.className = "cooked-indicator";
        cookedIndicator.textContent = "✓ Cooked";
        recipeCard.appendChild(cookedIndicator);
      }

      //add an event listener to each card:
      recipeCard.addEventListener(
        "click",
        uiEventHandlers.handleRecipeClick(recipe)
      );
    }
  },

  // Helper function to sort recipes with cooked ones at the bottom
  sortRecipesByCookedStatus: function (recipes) {
    return [...recipes].sort((a, b) => {
      const aCooked = DataManager.isRecipeCooked(a.id);
      const bCooked = DataManager.isRecipeCooked(b.id);

      // If one is cooked and the other isn't, put cooked at the bottom
      if (aCooked && !bCooked) return 1;
      if (!aCooked && bCooked) return -1;

      // If both have same cooked status, maintain original order
      return 0;
    });
  },

  // Function to refresh recipe display with proper ordering
  refreshRecipeDisplay: function (recipes, isWeeklySelection = false) {
    // Clear existing display
    this.clearRecipeDisplay();

    // Sort recipes and recreate display
    const sortedRecipes = this.sortRecipesByCookedStatus(recipes);
    this.createRecipeCard(sortedRecipes, isWeeklySelection);
  },

  // Function to show/hide the reset button based on weekly recipes status
  toggleResetButton: function (show) {
    const resetBtn = document.getElementById("resetWeeklyRecipe");
    const weeklyBtn = document.getElementById("getWeeklyRecipe");
    if (resetBtn) {
      resetBtn.style.display = show ? "block" : "none";
      weeklyBtn.style.display = show ? "none" : "block";
    }
  },

  // Function to clear the recipe display
  clearRecipeDisplay: function () {
    const recipeContainer = document.getElementById("recipe_wrapper");
    if (recipeContainer) {
      // Safe clearing of content - remove all child nodes
      while (recipeContainer.firstChild) {
        recipeContainer.removeChild(recipeContainer.firstChild);
      }
    }
  },

  // Function to enable/disable shopping list button based on weekly recipes status
  toggleShoppingListButton: function (enable) {
    const shoppingListBtn = document.getElementById("shoppingListBtn");
    if (shoppingListBtn) {
      shoppingListBtn.disabled = !enable;
      shoppingListBtn.style.opacity = enable ? "1" : "0.6";
      shoppingListBtn.style.cursor = enable ? "pointer" : "not-allowed";
      shoppingListBtn.style.display = enable ? "block" : "none";
    }
  },

  // Function to show shopping list and hide recipes
  showShoppingList: function (shoppingListData) {
    // Hide the hero section (recipes)
    const heroSection = document.querySelector(".hero");
    if (heroSection) {
      heroSection.style.display = "none";
    }

    // Show the shopping list container
    const shoppingListContainer = document.getElementById(
      "shopping_list_container"
    );
    if (shoppingListContainer) {
      shoppingListContainer.style.display = "block";
    }

    // Populate the shopping list content
    this.renderShoppingList(shoppingListData);
  },

  // Function to hide shopping list and show recipes
  hideShoppingList: function () {
    // Show the hero section (recipes)
    const heroSection = document.querySelector(".hero");
    if (heroSection) {
      heroSection.style.display = "block";
    }

    // Hide the shopping list container
    const shoppingListContainer = document.getElementById(
      "shopping_list_container"
    );
    if (shoppingListContainer) {
      shoppingListContainer.style.display = "none";
    }
  },

  // Function to render the shopping list items
  renderShoppingList: function (shoppingListData) {
    const contentContainer = document.getElementById("shopping_list_content");
    if (!contentContainer) return;

    // Clear existing content safely
    while (contentContainer.firstChild) {
      contentContainer.removeChild(contentContainer.firstChild);
    }

    if (
      !shoppingListData ||
      !shoppingListData.items ||
      shoppingListData.items.length === 0
    ) {
      const noItemsMsg = document.createElement("p");
      noItemsMsg.textContent = "No items in shopping list.";
      contentContainer.appendChild(noItemsMsg);
      return;
    }

    // Create list container
    const listContainer = document.createElement("div");
    listContainer.className = "shopping-list-items";

    // Create header info
    const headerInfo = document.createElement("div");
    headerInfo.className = "shopping-list-info";

    const totalItemsP = document.createElement("p");
    totalItemsP.textContent = `Total items: ${shoppingListData.items.length}`;

    const createdDateP = document.createElement("p");
    createdDateP.textContent = `Created: ${new Date(
      shoppingListData.createdDate
    ).toLocaleDateString()}`;

    headerInfo.appendChild(totalItemsP);
    headerInfo.appendChild(createdDateP);
    listContainer.appendChild(headerInfo);

    // Create each shopping list item
    shoppingListData.items.forEach((item) => {
      // Validate and sanitize item data
      const validatedItem = Validator.validateShoppingListItem(item);

      // Format amount to avoid unnecessary decimals
      const formattedAmount =
        validatedItem.amount % 1 === 0
          ? validatedItem.amount.toString()
          : validatedItem.amount.toFixed(2).replace(/\.?0+$/, "");

      const itemElement = document.createElement("div");
      itemElement.className = "shopping-list-item";

      // Create label element
      const label = document.createElement("label");
      label.className = "shopping-item-label";

      // Create checkbox
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "shopping-item-checkbox";
      checkbox.dataset.itemId = validatedItem.id;
      checkbox.checked = !!validatedItem.checked;

      // Create item text span
      const itemText = document.createElement("span");
      itemText.className = `shopping-item-text ${
        validatedItem.checked ? "checked" : ""
      }`;
      itemText.dataset.itemId = validatedItem.id;
      itemText.textContent = `${formattedAmount} ${validatedItem.unit} ${validatedItem.name}`;

      // Create edit button
      const editButton = document.createElement("button");
      editButton.className = "edit-shopping-item-btn";
      editButton.dataset.itemId = validatedItem.id;
      editButton.title = "Edit item";
      editButton.textContent = "✏️";

      // Assemble label
      label.appendChild(checkbox);
      label.appendChild(itemText);
      label.appendChild(editButton);

      // Create edit form
      const editForm = document.createElement("div");
      editForm.className = "shopping-item-edit-form";
      editForm.dataset.itemId = validatedItem.id;
      editForm.style.display = "none";

      // Create edit form inputs container
      const editFormInputs = document.createElement("div");
      editFormInputs.className = "edit-form-inputs";

      // Create amount input
      const amountInput = document.createElement("input");
      amountInput.type = "number";
      amountInput.className = "edit-amount-input";
      amountInput.value = validatedItem.amount;
      amountInput.min = "0";
      amountInput.step = "0.1";
      amountInput.placeholder = "Amount";

      // Create unit select
      const unitSelect = document.createElement("select");
      unitSelect.className = "edit-unit-input";

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
      ];
      validUnits.forEach((unit) => {
        const option = document.createElement("option");
        option.value = unit;
        option.textContent = unit;
        option.selected = validatedItem.unit === unit;
        unitSelect.appendChild(option);
      });

      // Create name input
      const nameInput = document.createElement("input");
      nameInput.type = "text";
      nameInput.className = "edit-name-input";
      nameInput.value = validatedItem.name;
      nameInput.placeholder = "Item name";

      // Create form buttons
      const buttonContainer = document.createElement("div");
      buttonContainer.className = "edit-form-buttons";

      const saveButton = document.createElement("button");
      saveButton.className = "save-edit-btn";
      saveButton.textContent = "Save";

      const cancelButton = document.createElement("button");
      cancelButton.className = "cancel-edit-btn";
      cancelButton.textContent = "Cancel";

      // Assemble edit form
      editFormInputs.appendChild(amountInput);
      editFormInputs.appendChild(unitSelect);
      editFormInputs.appendChild(nameInput);
      buttonContainer.appendChild(saveButton);
      buttonContainer.appendChild(cancelButton);
      editForm.appendChild(editFormInputs);
      editForm.appendChild(buttonContainer);

      // Assemble item element
      itemElement.appendChild(label);
      itemElement.appendChild(editForm);

      listContainer.appendChild(itemElement);
    });

    contentContainer.appendChild(listContainer);

    // Add event listeners for checkboxes
    this.setupShoppingListListeners();
  },

  // Function to set up shopping list event listeners
  setupShoppingListListeners: function () {
    const checkboxes = document.querySelectorAll(".shopping-item-checkbox");
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        const itemId = parseFloat(this.dataset.itemId);
        const checked = this.checked;
        const textSpan = this.parentElement.querySelector(
          ".shopping-item-text"
        );

        // Update visual state
        if (checked) {
          textSpan.classList.add("checked");
        } else {
          textSpan.classList.remove("checked");
        }

        // Save state to localStorage
        saveShoppingListItemState(itemId, checked);
      });
    });

    // Event listeners for edit buttons
    const editButtons = document.querySelectorAll(".edit-shopping-item-btn");
    editButtons.forEach((btn) => {
      btn.addEventListener("click", this.enterEditMode.bind(this));
    });

    // Event listeners for save buttons
    const saveButtons = document.querySelectorAll(".save-edit-btn");
    saveButtons.forEach((btn) => {
      btn.addEventListener("click", this.saveShoppingListItemEdit.bind(this));
    });

    // Event listeners for cancel buttons
    const cancelButtons = document.querySelectorAll(".cancel-edit-btn");
    cancelButtons.forEach((btn) => {
      btn.addEventListener("click", this.cancelShoppingListItemEdit.bind(this));
    });
  },

  // Enter edit mode for shopping list item
  enterEditMode: function (event) {
    event.preventDefault();
    const itemId = event.target.dataset.itemId;
    const itemElement = event.target.closest(".shopping-list-item");
    const textSpan = itemElement.querySelector(".shopping-item-text");
    const editForm = itemElement.querySelector(".shopping-item-edit-form");

    // Hide text display and show edit form
    textSpan.style.display = "none";
    event.target.style.display = "none";
    editForm.style.display = "block";
  },

  // Cancel edit mode
  cancelShoppingListItemEdit: function (event) {
    event.preventDefault();
    const itemId = event.target.dataset.itemId;
    const itemElement = event.target.closest(".shopping-list-item");
    const textSpan = itemElement.querySelector(".shopping-item-text");
    const editButton = itemElement.querySelector(".edit-shopping-item-btn");
    const editForm = itemElement.querySelector(".shopping-item-edit-form");

    // Show text display and hide edit form
    textSpan.style.display = "inline";
    editButton.style.display = "inline-block";
    editForm.style.display = "none";
  },

  // Save shopping list item edit
  saveShoppingListItemEdit: function (event) {
    event.preventDefault();
    const itemId = parseFloat(event.target.dataset.itemId);
    const itemElement = event.target.closest(".shopping-list-item");
    const editForm = itemElement.querySelector(".shopping-item-edit-form");

    // Get new values from form
    const newAmount = parseFloat(
      editForm.querySelector(".edit-amount-input").value
    );
    const newUnit = editForm.querySelector(".edit-unit-input").value;
    const newName = editForm.querySelector(".edit-name-input").value.trim();

    // Validate inputs
    if (!newAmount || newAmount <= 0 || !newName) {
      alert("Please enter valid amount and item name");
      return;
    }

    // Update shopping list in storage
    const shoppingList = dataManager.getShoppingList();
    const itemIndex = shoppingList.findIndex((item) => item.id === itemId);

    if (itemIndex !== -1) {
      shoppingList[itemIndex].amount = newAmount;
      shoppingList[itemIndex].unit = newUnit;
      shoppingList[itemIndex].name = newName;

      dataManager.saveShoppingList(shoppingList);

      // Update display
      const textSpan = itemElement.querySelector(".shopping-item-text");
      const formattedAmount =
        newAmount % 1 === 0 ? Math.round(newAmount) : newAmount.toFixed(1);
      textSpan.textContent = `${formattedAmount} ${newUnit} ${newName}`;

      // Hide edit form and show text
      const editButton = itemElement.querySelector(".edit-shopping-item-btn");
      textSpan.style.display = "inline";
      editButton.style.display = "inline-block";
      editForm.style.display = "none";
    }
  },
};

const uiEventHandlers = {
  //event handler for search button:
  handleSearch: function (event) {
    event.preventDefault();
    console.log("Search Button was clicked!");

    // Get the search input value and validate
    const searchInput = document.querySelector(".search_input");
    const searchTerm = searchInput.value.trim();

    // If search field is empty, restore normal display
    if (!searchTerm) {
      // Clear the search input
      searchInput.value = "";

      // Restore normal recipe display
      uiManager.clearRecipeDisplay();

      // Use current view state instead of checking localStorage
      const data = DataManager.init();
      const currentMode = uiManager.getCurrentViewMode();

      if (currentMode === "weekly") {
        // Restore weekly recipes display
        uiManager.createRecipeCard(data.weeklyPlan.recipes, true);
        uiManager.loadTotalRecipes(data.weeklyPlan.recipes, true);
        uiManager.toggleResetButton(true);
        uiManager.toggleShoppingListButton(true);
        uiManager.setViewState("weekly"); // Ensure state is correct
      } else {
        // Restore all recipes display
        uiManager.createRecipeCard(data.recipes, false);
        uiManager.loadTotalRecipes(data.recipes, false);
        uiManager.toggleResetButton(false);
        uiManager.toggleShoppingListButton(false);
        uiManager.setViewState("all"); // Ensure state is correct
      }

      uiManager.setSearchState(false);
      console.log(`Search cleared - restored ${currentMode} recipes display`);
      return;
    }

    // Set search as active when performing search
    uiManager.setSearchState(true);
    searchItem(uiManager);
  },
  //event handler for clicking each recipe:
  handleRecipeClick: function (recipe) {
    /*  This creates a closure and gives the eventHanldler function that is being returned,
        access to the recipe object that gets passed in.*/
    return async function (event) {
      event.preventDefault();

      try {
        //Hide:
        uiHelpers.hideAllRecipes();
        //show:
        await uiHelpers.showClickedRecipe(recipe);
      } catch (error) {
        console.error("❌ Error in recipe click handler:", error);
      }
    };
  },
  //eventHandler for weeklyRecipe Button:
  handleWeeklyRecipeClick: function (e) {
    e.preventDefault();

    // Clear existing recipes first
    uiManager.clearRecipeDisplay();

    // console.log(`Get Weekly Recipe button was clicked!`);

    // Get weekly recipes
    const weeklyRecipes = selectWeeklyRecipes();

    if (weeklyRecipes && weeklyRecipes.length > 0) {
      // console.log(`Displaying ${weeklyRecipes.length} weekly recipes`);
      uiManager.createRecipeCard(weeklyRecipes, true);
      // Show the reset button now that weekly recipes are displayed
      uiManager.toggleResetButton(true);
      // Enable shopping list button now that weekly recipes are selected
      uiManager.toggleShoppingListButton(true);
      // Update total to show selected weekly recipes count
      uiManager.loadTotalRecipes(weeklyRecipes, true);
      // Set view state to weekly
      uiManager.setViewState("weekly");
    } else {
      // console.log("No weekly recipes returned");
      // Hide reset button if no weekly recipes
      uiManager.toggleResetButton(false);
      // Disable shopping list button if no weekly recipes
      uiManager.toggleShoppingListButton(false);
      // Show total recipes available
      uiManager.loadTotalRecipes();
      // Keep view state as all
      uiManager.setViewState("all");
    }
  },

  //eventHandler for reset weekly recipes button:
  handleResetWeeklyRecipeClick: function (e) {
    e.preventDefault();

    // console.log("Reset Weekly Recipes button was clicked!");

    // Clear existing recipes first
    uiManager.clearRecipeDisplay();

    // Reset the weekly plan and get all recipes
    const allRecipes = resetWeeklyPlan();

    // Display all recipes
    if (allRecipes && allRecipes.length > 0) {
      // console.log(`Displaying all ${allRecipes.length} recipes after reset`);
      uiManager.createRecipeCard(allRecipes, false);
    }

    // Hide the reset button since we're back to all recipes
    uiManager.toggleResetButton(false);

    // Disable shopping list button since no weekly recipes
    uiManager.toggleShoppingListButton(false);

    // Update the total recipes display to show all recipes
    uiManager.loadTotalRecipes();

    // Set view state to all recipes
    uiManager.setViewState("all");
  },

  //eventHandler for shopping list button:
  handleShoppingListClick: function (e) {
    e.preventDefault();

    // console.log("Shopping List button was clicked!");

    // Get the shopping list
    const shoppingListData = getShoppingList();

    if (
      shoppingListData &&
      shoppingListData.items &&
      shoppingListData.items.length > 0
    ) {
      // console.log(`Displaying shopping list with ${shoppingListData.items.length} items`);
      uiManager.showShoppingList(shoppingListData);

      //Get reference to buttons to hide:
      const resetBtn = document.getElementById("resetWeeklyRecipe");
      resetBtn.style.display = "none";
      const shoppingListBtn = document.getElementById("shoppingListBtn");
      shoppingListBtn.style.display = "none";
    } else {
      alert("No weekly recipes selected. Please select weekly recipes first.");
    }
  },

  //eventHandler for close shopping list button:
  handleCloseShoppingListClick: function (e) {
    e.preventDefault();

    // console.log("Close Shopping List button was clicked!");
    uiManager.hideShoppingList();
    //Get reference to buttons to show:
    const shoppingListBtn = document.getElementById("shoppingListBtn");
    shoppingListBtn.style.display = "block";
    const resetBtn = document.getElementById("resetWeeklyRecipe");
    resetBtn.style.display = "block";
  },

  //event handler for clicking edit ingredient button
  handleEditIngredientBtn: function (e) {
    e.preventDefault();

    console.log("Edit Ingredients button was clicked!");
    //get reference to the items that must be shown:
    const ingredientsToEdit = document.querySelector(
      ".ingredient-nutrition-section"
    );
    ingredientsToEdit.style.display = "block";

    const closeBtn = document.querySelector(".closeEditIngredientBtn");
    closeBtn.style.display = "block";
    closeBtn.addEventListener("click", uiEventHandlers.handleCloseEditBtnClick);

    const editIngredientBtn = document.querySelector(".editIngredientBtn");
    editIngredientBtn.style.display = "none";
  },
  //Event handler for closing the complete edit button:
  handleCloseEditBtnClick: function (e) {
    e.preventDefault();

    const ingredientsToEdit = document.querySelector(
      ".ingredient-nutrition-section"
    );
    ingredientsToEdit.style.display = "";

    const editIngredientBtn = document.querySelector(".editIngredientBtn");
    editIngredientBtn.style.display = "";

    const closeBtn = document.querySelector(".closeEditIngredientBtn");
    closeBtn.style.display = "";
  },
};

// Initialize event listeners when the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  const weeklyBtn = document.getElementById("getWeeklyRecipe");
  if (weeklyBtn) {
    weeklyBtn.addEventListener(
      "click",
      uiEventHandlers.handleWeeklyRecipeClick
    );
    // console.log("Weekly recipe button event listener set up");
  } else {
    console.error("Could not find getWeeklyRecipe button");
  }

  const resetBtn = document.getElementById("resetWeeklyRecipe");
  if (resetBtn) {
    resetBtn.addEventListener(
      "click",
      uiEventHandlers.handleResetWeeklyRecipeClick
    );
    // console.log("Reset weekly recipe button event listener set up");
  } else {
    console.error("Could not find resetWeeklyRecipe button");
  }

  const shoppingListBtn = document.getElementById("shoppingListBtn");
  if (shoppingListBtn) {
    shoppingListBtn.addEventListener(
      "click",
      uiEventHandlers.handleShoppingListClick
    );
    // console.log("Shopping list button event listener set up");
  } else {
    console.error("Could not find shoppingListBtn button");
  }

  const closeShoppingListBtn = document.getElementById("closeShoppingList");
  if (closeShoppingListBtn) {
    closeShoppingListBtn.addEventListener(
      "click",
      uiEventHandlers.handleCloseShoppingListClick
    );
    // console.log("Close shopping list button event listener set up");
  } else {
    console.error("Could not find closeShoppingList button");
  }

  const searchBtn = document.querySelector(".search_btn");
  if (searchBtn) {
    searchBtn.addEventListener("click", uiEventHandlers.handleSearch);
    console.log("Search button event handler set up.");
  } else {
    console.log("Could not find search button.");
  }

  const inputField = document.querySelector(".search_input");
  if (inputField) {
    // Existing keydown listener for Enter key
    inputField.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        uiEventHandlers.handleSearch(e);
      }
    });

    // New input listener to detect when field is cleared
    inputField.addEventListener("input", function (e) {
      const searchTerm = this.value.trim();

      // If field is completely empty, restore normal display
      if (!searchTerm) {
        // Clear the search input
        this.value = "";

        // Restore normal recipe display
        uiManager.clearRecipeDisplay();

        // Use current view state instead of checking localStorage
        const data = DataManager.init();
        const currentMode = uiManager.getCurrentViewMode();

        if (currentMode === "weekly") {
          // Restore weekly recipes display
          uiManager.createRecipeCard(data.weeklyPlan.recipes, true);
          uiManager.loadTotalRecipes(data.weeklyPlan.recipes, true);
          uiManager.toggleResetButton(true);
          uiManager.toggleShoppingListButton(true);
        } else {
          // Restore all recipes display
          uiManager.createRecipeCard(data.recipes, false);
          uiManager.loadTotalRecipes(data.recipes, false);
          uiManager.toggleResetButton(false);
          uiManager.toggleShoppingListButton(false);
        }

        uiManager.setSearchState(false);
        console.log(
          `Search field cleared - restored ${currentMode} recipes display`
        );
      }
    });
  } else {
    console.log("Could not find search input field.");
  }
});

const uiHelpers = {
  hideAllRecipes: function () {
    const mainRecipeContainer = document.querySelector(".hero");
    mainRecipeContainer.style.display = "none";
  },
  showClickedRecipe: async function (recipe) {
    const body = document.querySelector("body");

    try {
      const mainRecipeCard = await makeSection(recipe);

      if (mainRecipeCard) {
        body.append(mainRecipeCard);
      } else {
        console.error("❌ makeSection returned null/undefined");
      }
    } catch (error) {
      console.error("❌ Error in showClickedRecipe:", error);
    }
  },
};

//This functions populates the selected recipe card:
function makeSection(recipe) {
  try {
    // Validate recipe data first
    if (!recipe) {
      throw new Error("Recipe is null or undefined");
    }

    if (!recipe.name) {
      throw new Error("Recipe name is missing");
    }

    if (!recipe.ingredients || !Array.isArray(recipe.ingredients)) {
      console.warn(
        "⚠️ Recipe ingredients missing or invalid:",
        recipe.ingredients
      );
      recipe.ingredients = []; // Provide fallback
    }

    if (!recipe.instructions || !Array.isArray(recipe.instructions)) {
      console.warn(
        "⚠️ Recipe instructions missing or invalid:",
        recipe.instructions
      );
      recipe.instructions = ["No instructions available"]; // Provide fallback
    }

    //create the main container. This gets returned + contains all the other elements below.
    const recipeHero = createComponent("section", "recipeHero");

    // Create and append elements inside the main `recipeHero` container.
    const recipeImg = createComponent("img", "recipeMainImage"); // image:
    recipeImg.src = recipe.image || "/assets/images/placeholder.jpg"; // Fallback image
    recipeImg.onerror = function () {
      this.src =
        "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200'><rect width='100%' height='100%' fill='%23ddd'/><text x='50%' y='50%' text-anchor='middle' dy='.3em'>Image unavailable</text></svg>";
    };

    const recipeDetails = createComponent("div", "recipeMainDetails"); //container for details
    recipeHero.append(recipeImg, recipeDetails);
    //Edit ingredients' buttons container:
    const btnDiv = createComponent("div", "ingredientBtnDiv");
    const editIngredientBtn = createComponent(
      "button",
      "editIngredientBtn btn"
    );
    editIngredientBtn.textContent = "Edit Ingredients";
    editIngredientBtn.addEventListener(
      "click",
      uiEventHandlers.handleEditIngredientBtn
    );
    const closeEditIngredientBtn = createComponent(
      "button",
      "closeEditIngredientBtn btn"
    );
    closeEditIngredientBtn.textContent = "Complete Edit";
    btnDiv.append(editIngredientBtn, closeEditIngredientBtn);

    //Create elements and append inside the `recipeDetails` container:
    const highlights = createComponent("article", "recipeMainHighlights");
    const instructions = document.createElement("article");
    instructions.className = "recipeMainInstruct";
    const btnCtn = createComponent("div", "recipeBtnCtn");
    recipeDetails.append(highlights, btnDiv, instructions, btnCtn);

    //Create and append elements inside the `highlights` container:
    const recipeTitle = createComponent("h1", "recipeMainTitle");
    recipeTitle.textContent = titleCase(recipe.name);
    const ingredientList = createComponent("ul", "ingredientList");

    // Safe call to displayArrayItems with error handling
    try {
      const ingredientItems = displayArrayItems(
        recipe,
        "ingredients",
        ingredientList
      );
    } catch (error) {
      console.error("❌ Error processing ingredients:", error);
      const errorItem = createComponent("li", "ingredients-list");
      errorItem.textContent = "Error loading ingredients";
      ingredientList.append(errorItem);
    }

    const basicInfo = createComponent("article", "recipeBasicInfo");
    highlights.append(recipeTitle, basicInfo, ingredientList);

    //Create and append details to `basicInfo` container:
    const servings = createComponent("p");
    servings.textContent = `Serves: ${recipe.servings || 4}`;
    const cookTime = createComponent("p");
    cookTime.textContent = `Cooking Time: ${
      recipe.cookTime || "Unknown"
    } minutes`;
    const prepTime = createComponent("p");
    prepTime.textContent = `Prep Time: ${recipe.prepTime || "Unknown"} minutes`;
    basicInfo.append(servings, prepTime, cookTime);

    // **Nutrition data - now with better error handling**
    // Don't let nutrition loading block recipe display
    setTimeout(async () => {
      try {
        const nutritionAPI = getIngredientData();

        // Show loading message
        const nutritionLoading = createComponent("p", "nutrition-loading");
        nutritionLoading.textContent = "Loading nutrition information...";
        highlights.append(nutritionLoading);

        // Add timeout to prevent nutrition loading from blocking indefinitely
        const nutritionPromise = nutritionAPI.fetchRecipeNutrition(recipe);
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Nutrition fetch timeout")), 5000)
        );

        const nutritionData = await Promise.race([
          nutritionPromise,
          timeoutPromise,
        ]);

        // Remove loading message
        nutritionLoading.remove();

        if (nutritionData && nutritionData.totals) {
          const nutritionSection = createNutritionDisplay(nutritionData);
          highlights.append(nutritionSection);

          // Disable nutrition editing if recipe is already cooked
          const isCooked = DataManager.isRecipeCooked(recipe.id);
          if (isCooked) {
            const nutritionInputs = nutritionSection.querySelectorAll(
              'input[type="number"]'
            );
            nutritionInputs.forEach((input) => {
              input.disabled = true;
              input.classList.add("nutrition-disabled");
            });

            const addIngredientBtn = nutritionSection.querySelector(
              ".add-ingredient-btn"
            );
            if (addIngredientBtn) {
              addIngredientBtn.disabled = true;
              addIngredientBtn.classList.add("btn-disabled");
            }
          }
        } else {
          const nutritionError = createComponent("p", "nutrition-error");
          nutritionError.textContent = "Unable to load nutrition information";
          highlights.append(nutritionError);
        }
      } catch (error) {
        // Remove loading message if it exists
        const loadingMsg = highlights.querySelector(".nutrition-loading");
        if (loadingMsg) loadingMsg.remove();

        console.error("❌ Error fetching nutrition data:", error);
        const nutritionError = createComponent("p", "nutrition-error");
        nutritionError.textContent = "Error loading nutrition information";
        highlights.append(nutritionError);
      }
    }, 100); // Delay nutrition loading to ensure recipe displays first

    //Create and append details to the `instructions` container
    const instructionItems = document.createElement("ol");
    instructionItems.className = "recipeMainInstructions";
    instructions.appendChild(instructionItems);

    // Simple call to displayArrayItems for instructions
    displayArrayItems(recipe, "instructions", instructionItems);

    //Create and append buttons in the `btnCtn`
    const cookedBtn = createComponent("button", "btn");
    const isCooked = DataManager.isRecipeCooked(recipe.id);
    cookedBtn.textContent = isCooked ? "Already Cooked" : "Mark as Cooked";
    cookedBtn.id = "cookedBtn";

    // Disable button if already cooked
    if (isCooked) {
      cookedBtn.disabled = true;
      cookedBtn.classList.add("btn-disabled");
    }

    const backBtn = createComponent("button", "btn");
    backBtn.textContent = "Back to Recipes";
    btnCtn.append(cookedBtn, backBtn);

    // Add event listener for cooked button
    cookedBtn.addEventListener("click", function () {
      if (!DataManager.isRecipeCooked(recipe.id)) {
        const success = DataManager.markRecipeAsCooked(recipe.id);
        if (success) {
          // Update button appearance
          cookedBtn.textContent = "Already Cooked";
          cookedBtn.disabled = true;
          cookedBtn.classList.add("btn-disabled");

          // Show success message
          alert(`Recipe "${recipe.name}" has been marked as cooked!`);

          // Disable nutrition editing (if nutrition form exists)
          const nutritionInputs = recipeHero.querySelectorAll(
            'input[type="number"]'
          );
          nutritionInputs.forEach((input) => {
            input.disabled = true;
            input.classList.add("nutrition-disabled");
          });

          // Disable add ingredient button if it exists
          const addIngredientBtn =
            recipeHero.querySelector("#addIngredientBtn");
          if (addIngredientBtn) {
            addIngredientBtn.disabled = true;
            addIngredientBtn.classList.add("btn-disabled");
          }

          // Refresh the recipe display to move cooked recipe to bottom
          // Use current view state instead of checking localStorage
          const data = DataManager.init();
          const currentMode = uiManager.getCurrentViewMode();

          if (currentMode === "weekly") {
            // Refresh weekly recipes display
            uiManager.refreshRecipeDisplay(data.weeklyPlan.recipes, true);
            uiManager.loadTotalRecipes(data.weeklyPlan.recipes, true);
          } else {
            // Refresh all recipes display
            uiManager.refreshRecipeDisplay(data.recipes, false);
            uiManager.loadTotalRecipes(data.recipes, false);
          }
        } else {
          alert("Failed to mark recipe as cooked. Please try again.");
        }
      }
    });

    // Add event listener for back button
    backBtn.addEventListener("click", function () {
      recipeHero.remove();
      const heroSection = document.querySelector(".hero");
      if (heroSection) {
        heroSection.style.display = "block";
      }
    });

    return recipeHero;
  } catch (error) {
    console.error("❌ Error in makeSection:", error);
    // Return a simple error element so the function doesn't return null
    const errorElement = createComponent("div", "recipe-error");
    errorElement.textContent = `Error loading recipe: ${recipe.name}`;
    return errorElement;
  }
}

// Function to display ingredients/instructions:
function displayArrayItems(recipe, arrayName, parentElement) {
  const targetArr = recipe[arrayName];

  // Safety check for empty or invalid arrays
  if (!targetArr || !Array.isArray(targetArr) || targetArr.length === 0) {
    console.warn(`⚠️ No ${arrayName} found for recipe:`, recipe.name);
    const emptyItem = document.createElement("li");
    emptyItem.className = `${arrayName}-list`;
    emptyItem.textContent = `No ${arrayName} available`;
    emptyItem.style.fontStyle = "italic";
    emptyItem.style.color = "#6c757d";
    parentElement.appendChild(emptyItem);
    return;
  }

  let count = 1;

  if (typeof targetArr[0] !== "object") {
    // Process string array (instructions)
    targetArr.forEach((element) => {
      const listItem = document.createElement("li");
      listItem.className = `${arrayName}-list`;
      listItem.textContent = `${element}`;
      parentElement.appendChild(listItem);
      count++;
    });
  } else if (typeof targetArr[0] === "object") {
    // Process object array (ingredients)
    targetArr.forEach((obj) => {
      const ingredient = document.createElement("li");
      ingredient.className = `${arrayName}-list`;
      ingredient.textContent = `${obj.name || "Unknown"}, ${obj.amount || 0} ${
        obj.unit || "units"
      }`;
      parentElement.appendChild(ingredient);
      count++;
    });
  }
}

// Function to create nutrition display section
// Function to create nutrition display section
function createNutritionDisplay(nutritionData) {
  const nutritionContainer = createComponent("div", "nutrition-container");

  // 1. PER PORTION NUTRITION TOTALS (read-only, calculated from ingredients)
  const perPortionSection = createComponent("article", "nutrition-section");
  const perPortionTitle = createComponent("h3", "nutrition-title");
  perPortionTitle.innerText = `Nutrition Per Portion (1 of ${nutritionData.servings} servings)`;

  const perPortionGrid = createComponent("div", "nutrition-grid");
  const perPortion = nutritionData.perPortion;

  const perPortionFacts = [
    {
      label: "Calories",
      value: perPortion.calories?.toFixed(0) || "0",
      unit: "kcal",
    },
    {
      label: "Protein",
      value: perPortion.protein_g?.toFixed(1) || "0",
      unit: "g",
    },
    {
      label: "Total Fat",
      value: perPortion.fat_total_g?.toFixed(1) || "0",
      unit: "g",
    },
    {
      label: "Carbohydrates",
      value: perPortion.carbohydrates_total_g?.toFixed(1) || "0",
      unit: "g",
    },
    { label: "Fiber", value: perPortion.fiber_g?.toFixed(1) || "0", unit: "g" },
    { label: "Sugar", value: perPortion.sugar_g?.toFixed(1) || "0", unit: "g" },
    {
      label: "Sodium",
      value: perPortion.sodium_mg?.toFixed(0) || "0",
      unit: "mg",
    },
  ];

  perPortionFacts.forEach((fact) => {
    const factItem = createComponent("div", "nutrition-fact");
    const idName = fact.label.toLowerCase().replace(/\s+/g, "-"); // Replace all spaces with hyphens

    // Create elements safely to prevent XSS
    const labelSpan = createComponent("span", "nutrition-label");
    const valueSpan = createComponent("span", "nutrition-value");

    labelSpan.textContent = `${Validator.sanitizeHTML(fact.label)}:`;
    valueSpan.textContent = `${Validator.validateNumber(
      fact.value
    )} ${Validator.sanitizeHTML(fact.unit)}`;
    valueSpan.id = `total-${idName}`;

    factItem.appendChild(labelSpan);
    factItem.appendChild(valueSpan);
    perPortionGrid.append(factItem);
  });

  perPortionSection.append(perPortionTitle, perPortionGrid);

  // 2. EDITABLE INDIVIDUAL INGREDIENT NUTRITION
  const ingredientsSection = createComponent(
    "article",
    "ingredient-nutrition-section"
  );
  const ingredientsSectionHeader = createComponent("div", "ingredients-header");

  const ingredientsTitle = createComponent("h3", "nutrition-title");
  ingredientsTitle.innerText = "Individual Ingredient Nutrition (editable)";

  // Add new ingredient button
  const addIngredientBtn = createComponent("button", "add-ingredient-btn");
  addIngredientBtn.id = "addIngredientBtn";
  addIngredientBtn.innerText = "Add New Ingredient";
  addIngredientBtn.style.cssText =
    "background: #28a745; color: white; padding: 8px 16px; border: none; border-radius: 4px; margin-left: 20px; cursor: pointer;";

  ingredientsSectionHeader.append(ingredientsTitle, addIngredientBtn);

  const ingredientsList = createComponent("div", "ingredient-nutrition-list");

  nutritionData.ingredients.forEach((ingredient, index) => {
    const ingredientItem = createIngredientNutritionItem(
      ingredient,
      index,
      ingredientsList,
      nutritionData
    );
    ingredientsList.append(ingredientItem);
  });

  ingredientsSection.append(ingredientsSectionHeader, ingredientsList);

  // Combine both sections first
  nutritionContainer.append(perPortionSection, ingredientsSection);

  // Add event listeners for input changes and add/remove functionality AFTER DOM is built
  setupNutritionInputListeners(nutritionContainer, nutritionData);
  setupAddRemoveIngredientListeners(nutritionContainer, nutritionData);

  return nutritionContainer;
}

// Helper function to create individual ingredient nutrition item
function createIngredientNutritionItem(
  ingredient,
  index,
  ingredientsList,
  nutritionData
) {
  const ingredientItem = createComponent("div", "ingredient-nutrition-item");
  ingredientItem.dataset.ingredientIndex = index;

  // Ingredient header with editable name, amount, and unit
  const ingredientHeader = createComponent("div", "ingredient-header");
  ingredientHeader.style.cssText =
    "display: flex; align-items: center; gap: 10px; margin-bottom: 10px;";

  const nameInput = createComponent("input", "ingredient-name-input");
  nameInput.type = "text";
  nameInput.value = Validator.validateIngredientName(
    ingredient.ingredient || ""
  );
  nameInput.placeholder = "Ingredient name";
  nameInput.style.cssText =
    "flex: 2; padding: 4px 8px; border: 1px solid #ddd; border-radius: 4px;";
  nameInput.dataset.ingredientIndex = index;
  nameInput.maxLength = "100";

  const amountInput = createComponent("input", "ingredient-amount-input");
  amountInput.type = "number";
  amountInput.value = Validator.validateNumber(ingredient.amount, 0.01, 10000);
  amountInput.placeholder = "Amount";
  amountInput.step = "0.1";
  amountInput.min = "0.01";
  amountInput.max = "10000";
  amountInput.style.cssText =
    "flex: 1; padding: 4px 8px; border: 1px solid #ddd; border-radius: 4px;";
  amountInput.dataset.ingredientIndex = index;

  const unitInput = createComponent("input", "ingredient-unit-input");
  unitInput.type = "text";
  unitInput.value = Validator.validateUnit(ingredient.unit || "");
  unitInput.placeholder = "Unit";
  unitInput.style.cssText =
    "flex: 1; padding: 4px 8px; border: 1px solid #ddd; border-radius: 4px;";
  unitInput.dataset.ingredientIndex = index;
  unitInput.maxLength = "20";

  // Remove button
  const removeButton = createComponent("button", "remove-ingredient-btn");
  removeButton.innerText = "×";
  removeButton.title = "Remove ingredient";
  removeButton.dataset.ingredientIndex = index;
  removeButton.style.cssText =
    "background: #dc3545; color: white; border: none; border-radius: 50%; width: 24px; height: 24px; cursor: pointer; font-size: 14px; line-height: 1;";

  ingredientHeader.append(nameInput, amountInput, unitInput, removeButton);

  const ingredientNutrition = createComponent(
    "div",
    "ingredient-nutrition-grid"
  );

  const nutritionFields = [
    { field: "calories", label: "Cal", unit: "kcal", decimals: 0 },
    { field: "protein_g", label: "Protein", unit: "g", decimals: 1 },
    { field: "fat_total_g", label: "Fat", unit: "g", decimals: 1 },
    {
      field: "carbohydrates_total_g",
      label: "Carbs",
      unit: "g",
      decimals: 1,
    },
    { field: "fiber_g", label: "Fiber", unit: "g", decimals: 1 },
    { field: "sodium_mg", label: "Sodium", unit: "mg", decimals: 0 },
  ];

  nutritionFields.forEach((field) => {
    const fieldContainer = createComponent("span", "ingredient-nutrition-fact");
    const value = ingredient[field.field]?.toFixed(field.decimals) || "0";

    // Create elements safely to prevent XSS
    const label = document.createTextNode(`${field.label}: `);
    const input = createComponent("input", "nutrition-input");
    const unit = document.createTextNode(` ${field.unit}`);

    input.type = "number";
    input.value = Validator.validateNumber(value);
    input.step = field.decimals === 0 ? "1" : "0.1";
    input.dataset.field = field.field;
    input.dataset.ingredientIndex = index;
    input.min = "0";
    input.max = field.field === "sodium_mg" ? "99999" : "9999";

    fieldContainer.appendChild(label);
    fieldContainer.appendChild(input);
    fieldContainer.appendChild(unit);

    ingredientNutrition.append(fieldContainer);
  });

  // Button container
  const buttonContainer = createComponent("div", "ingredient-buttons");
  buttonContainer.style.cssText = "margin-top: 10px; display: flex; gap: 10px;";

  // Save button for this ingredient
  const saveButton = createComponent("button", "save-ingredient-btn");
  saveButton.innerText = "Save Changes";
  saveButton.dataset.ingredientIndex = index;
  saveButton.style.cssText =
    "background: #28a745; color: white; padding: 6px 12px; border: none; border-radius: 4px; cursor: pointer; display: none;";

  // Fetch nutrition button
  const fetchButton = createComponent("button", "fetch-nutrition-btn");
  fetchButton.innerText = "Fetch Nutrition Data";
  fetchButton.dataset.ingredientIndex = index;
  fetchButton.style.cssText =
    "background: #007bff; color: white; padding: 6px 12px; border: none; border-radius: 4px; cursor: pointer;";

  buttonContainer.append(saveButton, fetchButton);

  ingredientItem.append(ingredientHeader, ingredientNutrition, buttonContainer);
  return ingredientItem;
}

// Function to set up event listeners for adding and removing ingredients
function setupAddRemoveIngredientListeners(container, nutritionData) {
  console.log("🔧 setupAddRemoveIngredientListeners called");

  // Add ingredient button listener
  const addIngredientBtn = container.querySelector(".add-ingredient-btn");
  console.log("Button found:", !!addIngredientBtn);

  if (addIngredientBtn) {
    console.log("Adding click listener to button");
    addIngredientBtn.addEventListener("click", function () {
      console.log("🎯 Button clicked!");

      const ingredientsList = container.querySelector(
        ".ingredient-nutrition-list"
      );

      // Create new ingredient object
      const newIngredient = {
        ingredient: "New Ingredient",
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

      // Add to nutrition data
      nutritionData.ingredients.push(newIngredient);
      const newIndex = nutritionData.ingredients.length - 1;

      // Create and append new ingredient item
      const newIngredientItem = createIngredientNutritionItem(
        newIngredient,
        newIndex,
        ingredientsList,
        nutritionData
      );
      ingredientsList.append(newIngredientItem);

      // Set up listeners for the new item
      setupIngredientItemListeners(newIngredientItem, container, nutritionData);

      // Focus on the name input
      const nameInput = newIngredientItem.querySelector(
        ".ingredient-name-input"
      );
      if (nameInput) {
        nameInput.focus();
      }

      // Update totals
      updateNutritionTotals(container, nutritionData);

      console.log("✅ New ingredient added successfully!");
    });
    console.log("✅ Click listener added");
  } else {
    console.error("❌ Add ingredient button not found");
  }

  // Set up listeners for existing ingredient items
  const ingredientItems = container.querySelectorAll(
    ".ingredient-nutrition-item"
  );
  ingredientItems.forEach((item) => {
    setupIngredientItemListeners(item, container, nutritionData);
  });
}

// Function to set up listeners for a single ingredient item
function setupIngredientItemListeners(
  ingredientItem,
  container,
  nutritionData
) {
  const index = parseInt(ingredientItem.dataset.ingredientIndex);

  // Set up nutrition input listeners for this item
  setupNutritionInputsForItem(ingredientItem, container, nutritionData);

  // Remove button listener
  const removeBtn = ingredientItem.querySelector(".remove-ingredient-btn");
  if (removeBtn) {
    removeBtn.addEventListener("click", function () {
      const ingredientIndex = parseInt(this.dataset.ingredientIndex);

      // Remove from nutrition data
      nutritionData.ingredients.splice(ingredientIndex, 1);

      // Remove from DOM
      ingredientItem.remove();

      // Update indices for remaining items
      updateIngredientIndices(container, nutritionData);

      // Update totals
      updateNutritionTotals(container, nutritionData);
    });
  }

  // Fetch nutrition button listener
  const fetchBtn = ingredientItem.querySelector(".fetch-nutrition-btn");
  if (fetchBtn) {
    fetchBtn.addEventListener("click", async function () {
      const ingredientIndex = parseInt(this.dataset.ingredientIndex);
      const ingredient = nutritionData.ingredients[ingredientIndex];

      // Get current values from inputs
      const nameInput = ingredientItem.querySelector(".ingredient-name-input");
      const amountInput = ingredientItem.querySelector(
        ".ingredient-amount-input"
      );
      const unitInput = ingredientItem.querySelector(".ingredient-unit-input");

      if (!nameInput.value.trim()) {
        alert("Please enter an ingredient name first");
        nameInput.focus();
        return;
      }

      // Update ingredient data
      ingredient.ingredient = nameInput.value.trim();
      ingredient.amount = parseFloat(amountInput.value) || 1;
      ingredient.unit = unitInput.value.trim() || "whole";

      try {
        this.innerText = "Fetching...";
        this.disabled = true;

        // Fetch nutrition data
        const nutritionAPI = getIngredientData();
        const ingredientForAPI = {
          name: ingredient.ingredient,
          amount: ingredient.amount,
          unit: ingredient.unit,
        };

        const nutritionResponse = await nutritionAPI.fetchIngredientData(
          ingredientForAPI
        );

        if (
          nutritionResponse &&
          nutritionResponse.items &&
          nutritionResponse.items.length > 0
        ) {
          const nutritionValues = nutritionResponse.items[0];

          // Save the fetched nutrition data for persistence
          const nutritionDataToSave = {
            calories: nutritionValues.calories || 0,
            protein_g: nutritionValues.protein_g || 0,
            fat_total_g: nutritionValues.fat_total_g || 0,
            carbohydrates_total_g: nutritionValues.carbohydrates_total_g || 0,
            fiber_g: nutritionValues.fiber_g || 0,
            sugar_g: nutritionValues.sugar_g || 0,
            sodium_mg: nutritionValues.sodium_mg || 0,
          };

          // Save to cache for persistence (same as manual edits)
          await nutritionAPI.saveUserEdit(
            ingredientForAPI,
            nutritionDataToSave
          );

          // Update ingredient data
          Object.assign(ingredient, nutritionDataToSave);

          // Update input values in the UI
          const nutritionInputs =
            ingredientItem.querySelectorAll(".nutrition-input");
          nutritionInputs.forEach((input) => {
            const field = input.dataset.field;
            const fieldData = [
              { field: "calories", decimals: 0 },
              { field: "protein_g", decimals: 1 },
              { field: "fat_total_g", decimals: 1 },
              { field: "carbohydrates_total_g", decimals: 1 },
              { field: "fiber_g", decimals: 1 },
              { field: "sodium_mg", decimals: 0 },
            ].find((f) => f.field === field);

            if (fieldData) {
              input.value = ingredient[field].toFixed(fieldData.decimals);
            }
          });

          // Update totals
          updateNutritionTotals(container, nutritionData);

          this.innerText = "Fetched!";
          this.style.backgroundColor = "#28a745";
          setTimeout(() => {
            this.innerText = "Fetch Nutrition Data";
            this.style.backgroundColor = "#007bff";
          }, 2000);
        } else {
          throw new Error("No nutrition data found");
        }
      } catch (error) {
        console.error("Error fetching nutrition data:", error);
        this.innerText = "Error!";
        this.style.backgroundColor = "#dc3545";
        setTimeout(() => {
          this.innerText = "Fetch Nutrition Data";
          this.style.backgroundColor = "#007bff";
        }, 2000);
      } finally {
        this.disabled = false;
      }
    });
  }

  // Name, amount, unit input change listeners
  const nameInput = ingredientItem.querySelector(".ingredient-name-input");
  const amountInput = ingredientItem.querySelector(".ingredient-amount-input");
  const unitInput = ingredientItem.querySelector(".ingredient-unit-input");

  [nameInput, amountInput, unitInput].forEach((input) => {
    if (input) {
      input.addEventListener("input", function () {
        const ingredientIndex = parseInt(this.dataset.ingredientIndex);
        const ingredient = nutritionData.ingredients[ingredientIndex];

        // Validate and sanitize input based on type
        let sanitizedValue;

        if (this.classList.contains("ingredient-name-input")) {
          // Validate and sanitize ingredient name
          sanitizedValue = Validator.validateIngredientName(this.value);
          ingredient.ingredient = sanitizedValue;

          // Update the input with sanitized value if different
          if (this.value !== sanitizedValue) {
            this.value = sanitizedValue;
          }
        } else if (this.classList.contains("ingredient-amount-input")) {
          // Validate amount (positive number, reasonable range)
          const numericValue = Validator.validateNumber(
            this.value,
            0.01,
            10000
          );
          const oldAmount = ingredient.amount;
          ingredient.amount = numericValue;

          // Update input if validation changed the value
          if (parseFloat(this.value) !== numericValue) {
            this.value = numericValue;
          }

          // If amount changed significantly, mark for nutrition re-fetch
          if (Math.abs(oldAmount - numericValue) > 0.1) {
            this.dataset.needsNutritionUpdate = "true";
          }
        } else if (this.classList.contains("ingredient-unit-input")) {
          // Validate unit against allowed units
          sanitizedValue = Validator.validateUnit(this.value);
          const oldUnit = ingredient.unit;
          ingredient.unit = sanitizedValue;

          // Update the input with sanitized value if different
          if (this.value !== sanitizedValue) {
            this.value = sanitizedValue;
          }

          // If unit changed, mark for nutrition re-fetch
          if (oldUnit !== sanitizedValue) {
            this.dataset.needsNutritionUpdate = "true";
          }
        }

        // Show visual feedback for valid input
        this.style.backgroundColor = "#fffacd";
        this.style.borderColor = "#ffa500";

        // Show save button
        const saveBtn = ingredientItem.querySelector(".save-ingredient-btn");
        if (saveBtn) {
          saveBtn.style.display = "inline-block";
        }
      });
    }
  });
}

// Function to update ingredient indices after removal
function updateIngredientIndices(container, nutritionData) {
  const ingredientItems = container.querySelectorAll(
    ".ingredient-nutrition-item"
  );
  ingredientItems.forEach((item, newIndex) => {
    // Update data attribute
    item.dataset.ingredientIndex = newIndex;

    // Update all elements with ingredient index data attributes
    const elementsWithIndex = item.querySelectorAll("[data-ingredient-index]");
    elementsWithIndex.forEach((element) => {
      element.dataset.ingredientIndex = newIndex;
    });
  });
}

// Function to set up event listeners for nutrition inputs
function setupNutritionInputListeners(container, nutritionData) {
  // Set up listeners for existing items
  const ingredientItems = container.querySelectorAll(
    ".ingredient-nutrition-item"
  );
  ingredientItems.forEach((item) => {
    setupNutritionInputsForItem(item, container, nutritionData);
  });
}

// Function to set up nutrition input listeners for a specific ingredient item
function setupNutritionInputsForItem(ingredientItem, container, nutritionData) {
  const inputs = ingredientItem.querySelectorAll(".nutrition-input");

  inputs.forEach((input) => {
    // Show save button when input changes
    input.addEventListener("input", function () {
      const ingredientIndex = this.dataset.ingredientIndex;
      const field = this.dataset.field;

      // Validate nutrition values (must be non-negative numbers within reasonable ranges)
      let validatedValue;
      if (field === "calories") {
        validatedValue = Validator.validateNumber(this.value, 0, 9999);
      } else if (field.includes("_g")) {
        // Macronutrients in grams
        validatedValue = Validator.validateNumber(this.value, 0, 999);
      } else if (field.includes("_mg")) {
        // Micronutrients in milligrams
        validatedValue = Validator.validateNumber(this.value, 0, 99999);
      } else {
        // Default validation for other fields
        validatedValue = Validator.validateNumber(this.value, 0, 9999);
      }

      // Update input if validation changed the value
      if (
        parseFloat(this.value) !== validatedValue ||
        isNaN(parseFloat(this.value))
      ) {
        this.value = validatedValue;
      }

      const saveBtn = ingredientItem.querySelector(".save-ingredient-btn");
      if (saveBtn) {
        saveBtn.style.display = "inline-block";
      }
      // Visual feedback that input has changed
      this.style.backgroundColor = "#fffacd"; // Light yellow background
      this.style.borderColor = "#ffa500"; // Orange border
    });

    // Add Enter key support
    input.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        const saveBtn = ingredientItem.querySelector(".save-ingredient-btn");
        if (saveBtn && saveBtn.style.display !== "none") {
          saveBtn.click();
        }
      }
    });

    // Reset styling when input loses focus without saving
    input.addEventListener("blur", function () {
      const saveBtn = ingredientItem.querySelector(".save-ingredient-btn");
      if (saveBtn && saveBtn.style.display === "none") {
        this.style.backgroundColor = "";
        this.style.borderColor = "";
      }
    });
  });

  // Handle save button clicks
  const saveButton = ingredientItem.querySelector(".save-ingredient-btn");
  if (saveButton) {
    // Remove existing listeners to avoid duplicates
    const newSaveButton = saveButton.cloneNode(true);
    saveButton.parentNode.replaceChild(newSaveButton, saveButton);

    newSaveButton.addEventListener("click", async function () {
      try {
        const ingredientIndex = parseInt(this.dataset.ingredientIndex);
        const ingredient = nutritionData.ingredients[ingredientIndex];

        // Check if we need to refetch nutrition data due to amount/unit changes
        const nameInput = ingredientItem.querySelector(
          ".ingredient-name-input"
        );
        const amountInput = ingredientItem.querySelector(
          ".ingredient-amount-input"
        );
        const unitInput = ingredientItem.querySelector(
          ".ingredient-unit-input"
        );

        const needsNutritionUpdate =
          amountInput?.dataset.needsNutritionUpdate === "true" ||
          unitInput?.dataset.needsNutritionUpdate === "true";

        if (needsNutritionUpdate) {
          // Show loading state
          this.innerText = "Updating nutrition...";
          this.style.backgroundColor = "#ffc107";
          this.disabled = true;

          try {
            // Create ingredient object for API call
            const ingredientForAPI = {
              name: ingredient.ingredient,
              amount: ingredient.amount,
              unit: ingredient.unit,
            };

            // Fetch fresh nutrition data with new amount/unit
            const nutritionAPI = getIngredientData();
            const freshNutritionData = await nutritionAPI.fetchIngredientData(
              ingredientForAPI
            );

            if (
              freshNutritionData &&
              freshNutritionData.items &&
              freshNutritionData.items.length > 0
            ) {
              const nutritionValues = freshNutritionData.items[0];

              // Update ingredient with fresh nutrition data
              const updatedNutrition = {
                calories: nutritionValues.calories || 0,
                protein_g: nutritionValues.protein_g || 0,
                fat_total_g: nutritionValues.fat_total_g || 0,
                carbohydrates_total_g:
                  nutritionValues.carbohydrates_total_g || 0,
                fiber_g: nutritionValues.fiber_g || 0,
                sugar_g: nutritionValues.sugar_g || 0,
                sodium_mg: nutritionValues.sodium_mg || 0,
              };

              // Update ingredient data in memory
              Object.assign(ingredient, updatedNutrition);

              // Update nutrition input values in the UI
              const nutritionInputs =
                ingredientItem.querySelectorAll(".nutrition-input");
              nutritionInputs.forEach((input) => {
                const field = input.dataset.field;
                if (updatedNutrition.hasOwnProperty(field)) {
                  const fieldData = [
                    { field: "calories", decimals: 0 },
                    { field: "protein_g", decimals: 1 },
                    { field: "fat_total_g", decimals: 1 },
                    { field: "carbohydrates_total_g", decimals: 1 },
                    { field: "fiber_g", decimals: 1 },
                    { field: "sugar_g", decimals: 1 },
                    { field: "sodium_mg", decimals: 0 },
                  ].find((f) => f.field === field);

                  if (fieldData) {
                    input.value = updatedNutrition[field].toFixed(
                      fieldData.decimals
                    );
                  }
                }
              });

              // Clear the update flags
              if (amountInput)
                amountInput.dataset.needsNutritionUpdate = "false";
              if (unitInput) unitInput.dataset.needsNutritionUpdate = "false";
            } else {
              console.warn(
                "Could not fetch fresh nutrition data, using existing values"
              );
            }
          } catch (error) {
            console.error("Error fetching fresh nutrition data:", error);
            // Continue with manual save if auto-fetch fails
          }

          this.disabled = false;
        }

        // Collect current values from nutrition inputs (either fresh or manually edited)
        const nutritionInputs =
          ingredientItem.querySelectorAll(".nutrition-input");
        const newValues = {};

        nutritionInputs.forEach((input) => {
          const field = input.dataset.field;
          const value = parseFloat(input.value) || 0;
          newValues[field] = value;
        });

        // Save user edit - create proper ingredient object for cache key
        const nutritionAPI = getIngredientData();
        const ingredientForCache = {
          name: ingredient.ingredient,
          amount: ingredient.amount,
          unit: ingredient.unit,
        };

        await nutritionAPI.saveUserEdit(ingredientForCache, newValues);

        // Update the ingredient data in memory
        Object.assign(ingredient, newValues);

        // Recalculate and update totals
        updateNutritionTotals(container, nutritionData);

        // Reset input styling to show they're saved
        nutritionInputs.forEach((input) => {
          input.style.backgroundColor = "#d4edda"; // Light green
          input.style.borderColor = "#28a745"; // Green border
        });

        // Hide save button
        this.style.display = "none";

        // Show success feedback
        this.innerText = "Saved!";
        this.style.backgroundColor = "#28a745";
        setTimeout(() => {
          this.innerText = "Save Changes";
          this.style.backgroundColor = "#28a745";
          // Reset input styling back to normal
          nutritionInputs.forEach((input) => {
            input.style.backgroundColor = "";
            input.style.borderColor = "";
          });
        }, 2000);
      } catch (error) {
        console.error("Error saving nutrition edit:", error);
        this.innerText = "Error!";
        this.style.backgroundColor = "#dc3545";
        setTimeout(() => {
          this.innerText = "Save Changes";
          this.style.backgroundColor = "#28a745";
        }, 2000);
      }
    });
  }
}

// Function to recalculate and update nutrition totals
function updateNutritionTotals(container, nutritionData) {
  // console.log("=== STARTING UPDATE NUTRITION TOTALS ===");
  // console.log("Container:", container);
  // console.log("Container ID:", container.id);
  // console.log("Container class:", container.className);
  // console.log("Updating nutrition totals...");
  // console.log("Current ingredients data:", nutritionData.ingredients);

  // Test if container is the right one
  const testElement = container.querySelector("#total-calories");
  // console.log(
  //   "Can find total-calories in container?",
  //   testElement ? "YES" : "NO"
  // );
  if (testElement) {
    // console.log("total-calories current content:", testElement.textContent);
  }

  // Recalculate totals from current ingredient data
  const newTotals = {
    calories: 0,
    protein_g: 0,
    fat_total_g: 0,
    carbohydrates_total_g: 0,
    fiber_g: 0,
    sugar_g: 0,
    sodium_mg: 0,
  };

  nutritionData.ingredients.forEach((ingredient, index) => {
    // console.log(
    //   `\n--- Processing ingredient ${index}: ${ingredient.ingredient} ---`
    // );
    // console.log("Full ingredient object:", ingredient);

    const nutritionToAdd = {
      calories: ingredient.calories || 0,
      protein_g: ingredient.protein_g || 0,
      fat_total_g: ingredient.fat_total_g || 0,
      carbohydrates_total_g: ingredient.carbohydrates_total_g || 0,
      fiber_g: ingredient.fiber_g || 0,
      sugar_g: ingredient.sugar_g || 0,
      sodium_mg: ingredient.sodium_mg || 0,
    };

    // console.log("Nutrition values to add:", nutritionToAdd);
    // console.log("Running totals before adding:");
    // console.log("  Calories:", newTotals.calories);
    // console.log("  Protein:", newTotals.protein_g);
    // console.log("  Fat:", newTotals.fat_total_g);

    newTotals.calories += nutritionToAdd.calories;
    newTotals.protein_g += nutritionToAdd.protein_g;
    newTotals.fat_total_g += nutritionToAdd.fat_total_g;
    newTotals.carbohydrates_total_g += nutritionToAdd.carbohydrates_total_g;
    newTotals.fiber_g += nutritionToAdd.fiber_g;
    newTotals.sugar_g += nutritionToAdd.sugar_g;
    newTotals.sodium_mg += nutritionToAdd.sodium_mg;

    // console.log("Running totals after adding:");
    // console.log("  Calories:", newTotals.calories);
    // console.log("  Protein:", newTotals.protein_g);
    // console.log("  Fat:", newTotals.fat_total_g);
  });

  // console.log("New totals calculated:", newTotals);

  // Calculate per portion
  const servings = nutritionData.servings || 4;
  const perPortion = {
    calories: newTotals.calories / servings,
    protein_g: newTotals.protein_g / servings,
    fat_total_g: newTotals.fat_total_g / servings,
    carbohydrates_total_g: newTotals.carbohydrates_total_g / servings,
    fiber_g: newTotals.fiber_g / servings,
    sugar_g: newTotals.sugar_g / servings,
    sodium_mg: newTotals.sodium_mg / servings,
  };

  // Update the display
  const updates = [
    {
      id: "total-calories",
      value: perPortion.calories.toFixed(0),
      unit: "kcal",
    },
    { id: "total-protein", value: perPortion.protein_g.toFixed(1), unit: "g" },
    {
      id: "total-total-fat",
      value: perPortion.fat_total_g.toFixed(1),
      unit: "g",
    },
    {
      id: "total-carbohydrates",
      value: perPortion.carbohydrates_total_g.toFixed(1),
      unit: "g",
    },
    { id: "total-fiber", value: perPortion.fiber_g.toFixed(1), unit: "g" },
    { id: "total-sugar", value: perPortion.sugar_g.toFixed(1), unit: "g" },
    { id: "total-sodium", value: perPortion.sodium_mg.toFixed(0), unit: "mg" },
  ];

  updates.forEach((update) => {
    const element = container.querySelector(`#${update.id}`);
    // console.log(`\n--- Processing update for ${update.id} ---`);
    // console.log(`New calculated value: ${update.value} ${update.unit}`);

    if (element) {
      const currentContent = element.textContent;
      const newContent = `${update.value} ${update.unit}`;

      // console.log(`Current content: "${currentContent}"`);
      // console.log(`New content: "${newContent}"`);
      // console.log(`Values are different: ${currentContent !== newContent}`);

      if (currentContent === newContent) {
        // console.log("⚠️  Values are identical - no visual change expected");
      } else {
        // console.log("✅ Values are different - should see visual change");
      }

      // Force a visual update with a temporary style change
      element.style.backgroundColor = "yellow";
      element.textContent = newContent;
      // console.log(`Updated content: "${element.textContent}"`);

      // Reset style after a short delay to show the update happened
      setTimeout(() => {
        element.style.backgroundColor = "";
      }, 1000);

      // Double-check that the update actually took effect
      setTimeout(() => {
        // console.log(`Final content after timeout: "${element.textContent}"`);
      }, 100);
    } else {
      console.error(`❌ Element with ID ${update.id} not found`);
      // Let's try to find all elements with IDs starting with "total-"
      const allTotalElements = container.querySelectorAll('[id^="total-"]');
      // console.log("Available total elements:");
      allTotalElements.forEach((el) => {
        // console.log(`  - ID: ${el.id}, Content: ${el.textContent}`);
      });
    }
  });

  // Update the nutritionData object
  nutritionData.totals = newTotals;
  nutritionData.perPortion = perPortion;

  // console.log("Final per-portion nutrition:", perPortion);
}
