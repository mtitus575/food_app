import { DataManager } from "./dataManager.js";
import { titleCase } from "../utilities/helperFunctions.js";
import { createComponent } from "../utilities/helperFunctions.js";

const uiManager = {
  loadTotalRecipes: function () {
    const recipeSavedTotal = DataManager.getInitialRecipes().length;
    const recipeTotal = document.getElementById("recipe_total");
    recipeTotal.innerText = recipeSavedTotal;

    return recipeTotal.innerText;
  },

  createRecipeCard: function () {
    const recipeArray = DataManager.getInitialRecipes(); //saved array from my dataset.
    const recipeContainer = document.getElementById("recipe_wrapper"); //Parent element for recipies.

    for (let recipe of recipeArray) {
      //for each recipe, create a card components:
      const recipeCard = document.createElement("div");
      const recipeImg = document.createElement("img");
      const recipeName = document.createElement("h3");
      const recipeCalories = document.createElement("p");

      //create classNames for each element:
      recipeCard.className = "recipe_item";
      recipeImg.className = "recipeImg";
      recipeName.className = "recipeName";
      recipeCalories.className = "recipeCalories";

      //Append the card to the parent container and it's child elements:
      recipeContainer.append(recipeCard);
      recipeCard.append(recipeImg, recipeName, recipeCalories);

      //building out the recipeCard:
      recipeImg.src = recipe.image;
      recipeName.innerText = titleCase(recipe.name);
      recipeCalories.innerText = `Calories: ${0}`; //The zero here is a placeholder. Actual calories/per portion needed here.

      //add an event listener to each card:
      recipeCard.addEventListener(
        "click",
        uiEventHandlers.handleRecipeClick(recipe)
      );
    }
  },
};

const uiEventHandlers = {
  //event handler for clicking each recipe:
  handleRecipeClick: function (recipe) {
    /*  This creates a closure and gives the eventHanldler function that is being returned,
        access to the recipe object that gets passed in.*/
    return function (event) {
      event.preventDefault();

      console.log(`The ${recipe.name} was clicked!`); //Remove: testing only.

      //Hide:
      uiHelpers.hideAllRecipes();
      //show:
      uiHelpers.showClickedRecipe(recipe);
    };
  },
};

const uiHelpers = {
  hideAllRecipes: function () {
    const mainRecipeContainer = document.querySelector(".hero");
    mainRecipeContainer.style.display = "none";
  },
  showClickedRecipe: function (recipe) {
    const body = document.querySelector("body");

    //create and add a card to the page:
    const recipeHero = createComponent("section", "recipeHero");
    body.append(recipeHero); //append the main card to the main html body.

    // Create and append elements inside the main `recipeHero` container.
    const recipeImg = createComponent("img", "recipeMainImage"); // image:
    recipeImg.src = recipe.image;
    const recipeDetails = createComponent("div", "recipeMainDetails"); //container for details
    recipeHero.append(recipeImg, recipeDetails);

    //Create elements and append inside the `recipeDetails` container:
    const highlights = createComponent("article", "recipeMainHighlights");
    const instructions = createComponent("article", "recipeMainInstruct");
    const btnCtn = createComponent("div", "recipeBtnCtn");
    recipeDetails.append(highlights, instructions, btnCtn);

    //Create and append elements inside the `highlights` container:
    const recipeTitle = createComponent("h1", "recipeMainTitle");
    recipeTitle.innerText = titleCase(recipe.name);
    const ingredientList = createComponent("ul", "ingredientList");
    const basicInfo = createComponent("article", "recipeBasicInfo");
    highlights.append(recipeTitle, ingredientList, basicInfo);

    //Create and append details to `basicInfo` container:
    const servings = createComponent("p");
    servings.innerText = `Serves: ${recipe.servings}`;
    const cookTime = createComponent("p");
    cookTime.innerText = `Cooking Time: ${recipe.cookTime} minutes`;
    basicInfo.append(servings, cookTime);

    //Create and append details to the `instructions` container
    const instructionItems = createComponent("ol", "recipeMainInstructions");
    instructions.append(instructionItems);

    //Create and append buttons in the `btnCtn`
    const cookedBtn = createComponent("button", "btn");
    cookedBtn.innerText = "Mark as Cooked";
    const nextBtn = createComponent("button", "btn");
    nextBtn.innerText = "Next Recipe";
    btnCtn.append(cookedBtn, nextBtn);
  },
};

export { uiManager };

/**
 Next:
 1. populate recipe card with recipe details that are present.
 2. Style the card to display the recipe nicely.
 */
