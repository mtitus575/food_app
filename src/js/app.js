// ## MAIN CONTROLLER: ##

//Import modules here:
import { DataManager } from "./modules/dataManager.js";
import { titleCase } from "./utilities/helperFunctions.js";

function startApp() {
  // Initialize the data manager
  DataManager.init();

  //Get total saved recipes and display to DOM:
  const recipeSavedTotal = DataManager.getInitialRecipes().length;
  const recipeTotal = document.getElementById("recipe_total");
  recipeTotal.innerText = recipeSavedTotal;

  //test accessing each property on the array of objects:
  function createRecipeCard() {
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
      recipeContainer.appendChild(recipeCard);
      recipeCard.appendChild(recipeImg);
      recipeCard.appendChild(recipeName);
      recipeCard.appendChild(recipeCalories);

      //building out the recipeCard:
      recipeImg.src = recipe.image;
      recipeName.innerText = titleCase(recipe.name);
      recipeCalories.innerText = `Calories: ${0}`;

      //   console.log("Tester:", recipe);
    }
  }
  createRecipeCard();
}
startApp();
