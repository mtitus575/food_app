// ## MAIN CONTROLLER: ##

//Import modules here:
import { DataManager } from "./modules/dataManager.js";
import { titleCase } from "./utilities/helperFunctions.js";

function startApp() {
  // Initialize the data manager
  DataManager.init();

  const body = document.querySelector("body");

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
      recipeContainer.append(recipeCard);
      recipeCard.append(recipeImg, recipeName, recipeCalories);

      //building out the recipeCard:
      recipeImg.src = recipe.image;
      recipeName.innerText = titleCase(recipe.name);
      recipeCalories.innerText = `Calories: ${0}`; //The zero here is a placeholder. Actual calories/per portion needed here.

      //   console.log("Tester:", recipe);

      recipeCard.addEventListener("click", function displayRecipe() {
        //create and add a card to the page:
        const recipeHero = document.createElement("section");
        recipeHero.className = "recipeHero";
        body.append(recipeHero); //append the main card to the main html body.

        //display contents for that recipe in that card:
        recipeHero.innerText = recipe.image;
      });
    }
  }
  createRecipeCard();
}
startApp();
