import { DataManager } from "./dataManager.js";
import { titleCase } from "../utilities/helperFunctions.js";

const uiManager = {
  createDOMElement: function (elementType) {
    return document.createElement(elementType);
  },

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
      recipeCard.addEventListener('click', this.handleRecipeClick)
    }
  },
  handleRecipeClick: function (event){
    event.preventDefault()

    console.log(`The ${event.target.className} was clicked!`)// remove, testing only

    //create and add a card to the page:
        const recipeHero = document.createElement("section");
        recipeHero.className = "recipeHero";
        const body = document.querySelector("body");
        body.append(recipeHero); //append the main card to the main html body.

        //display contents for that recipe in that card:
        // recipeHero.innerText = recipe.image;

  }
};

export { uiManager };

/*
//supposed to make each recipe appear as a whole page.
recipeCard.addEventListener("click", function displayRecipe() {
        //create and add a card to the page:
        const recipeHero = document.createElement("section");
        recipeHero.className = "recipeHero";
        body.append(recipeHero); //append the main card to the main html body.

        //display contents for that recipe in that card:
        recipeHero.innerText = recipe.image;
      });
*/
