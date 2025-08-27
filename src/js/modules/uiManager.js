import { DataManager } from "./dataManager.js";
import { titleCase } from "../utilities/helperFunctions.js";

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
    const recipeHero = document.createElement("section");
    recipeHero.className = "recipeHero";
    body.append(recipeHero); //append the main card to the main html body.

    // Create and append elements inside the main `recipeHero` container.
    // image:
    const recipeImg = document.createElement("img");
    recipeImg.src = recipe.image;
    recipeImg.className = "recipeMainImage";
    //container for details:
    const recipeDetails = document.createElement("div");
    recipeDetails.className = "recipeMainDetails";
    recipeHero.append(recipeImg, recipeDetails);

    //Create elements and append inside the `recipeDetails` container:
    const highlights = document.createElement("article");
    highlights.className = "recipeMainHighlights";
    const instructions = document.createElement("article");
    instructions.className = "recipeMainInstruct";
    const btnCtn = document.createElement("div");
    btnCtn.className = "recipeBtnCtn";
    recipeDetails.append(highlights, instructions);

    //Create and append elements inside the `highlights` container:
    const recipeTitle = document.createElement("h1");
    recipeTitle.className = "recipeMainTitle";
    recipeTitle.innerText = titleCase(recipe.name);

    const nutritionInfo = document.createElement("ul");
    nutritionInfo.className = "recipeNutritionalInfo";

    const basicInfo = document.createElement("article");
    basicInfo.className = "recipeBasicInfo";
    highlights.append(recipeTitle, nutritionInfo, basicInfo);

    //Create and append details to `basicInfo` container:
    const servings = document.createElement('p')
    servings.innerText = `Serves: ${recipe.servings}`
    const cookTime = document.createElement('p')
    cookTime.innerText = `Cooking Time: ${recipe.cookTime} minutes`
    basicInfo.append(servings, cookTime)

    //Create and append details to the `instructions` container
    const instructionItems = document.createElement("ol");
    instructionItems.className = "recipeMainInstructions";
    instructions.append(instructionItems);

    //Create and append buttons in the `btnCtn`
    const cookedBtn = document.createElement("button");
    cookedBtn.className = "btn";
    cookedBtn.innerText = "Mark as Cooked";
    const nextBtn = document.createElement("button");
    nextBtn.className = "btn";
    nextBtn.innerText = "Next Recipe";
    btnCtn.append(cookedBtn, nextBtn);
  },
};

export { uiManager };
