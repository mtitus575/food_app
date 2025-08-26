// ## MAIN CONTROLLER: ##

//Import modules here:
import { DataManager } from "./modules/dataManager.js";
import { titleCase } from "./utilities/helperFunctions.js";
import { uiManager } from "./modules/uiManager.js";

function startApp() {
  // Initialize the data manager
  DataManager.init();

  // const body = document.querySelector("body");

  //Get total saved recipes and display to DOM:
  const displayTotalRecipes = uiManager.loadTotalRecipes();

  //create recipeCard:
  const homeScreenRecipes = uiManager.createRecipeCard()
}
startApp();
