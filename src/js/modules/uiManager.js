import { DataManager } from "./dataManager.js";
import { titleCase } from "../utilities/helperFunctions.js";
import { createComponent } from "../utilities/helperFunctions.js";

export const uiManager = {
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

    const mainRecipeCard = makeSection(recipe);
    body.append(mainRecipeCard);
  },
};

//This functions populates the selected recipe card:
function makeSection(recipe) {
  //create the main container. This gets returned + contains all the other elements below.
  const recipeHero = createComponent("section", "recipeHero");

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
  const ingredientItems = displayArrayItems(
    recipe,
    "ingredients",
    ingredientList
  );
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
  const instructItems = displayArrayItems(
    recipe,
    "instructions",
    instructionItems
  );

  //Create and append buttons in the `btnCtn`
  const cookedBtn = createComponent("button", "btn");
  cookedBtn.innerText = "Mark as Cooked";
  const nextBtn = createComponent("button", "btn");
  nextBtn.innerText = "Next Recipe";
  btnCtn.append(cookedBtn, nextBtn);

  return recipeHero;
}

// Function to display ingredients/instructions:
function displayArrayItems(recipe, arrayName, parentElement) {
  const targetArr = recipe[arrayName];
  let count = 1;

  if (typeof targetArr[0] !== "object") {
    // console.log("I am an array", targetArr);

    targetArr.forEach((element) => {
      const listItem = createComponent("li", `${arrayName}-list`);
      listItem.innerText = `${count}. ${element}`;
      parentElement.append(listItem);

      count++;
      return listItem;
    });
  } else if (typeof targetArr[0] === "object") {
    // console.log("I am the array containing and object", targetArr);

    targetArr.forEach((obj) => {
      const ingredient = createComponent("li", `${arrayName}-list`);
      ingredient.innerText = `${obj.name}, ${obj.amount} ${obj.unit}`;
      parentElement.append(ingredient);

      console.log(ingredient);

      count++;
      return ingredient;
    });
  }
}

/** 28/08/2025
 Next:
 1. From the origialRecipe array, create groupings of the recipes
    -- use the file at home for this
    -- groupings must contain 8 recipes.
 2. Add logic to loops through the groupings. It must remembers the order for each week.
 3. Style the card to display the recipe nicely.
 
 */
