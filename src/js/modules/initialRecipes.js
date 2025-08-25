//This holds a set of initial recipes:

const initialRecipes = [
  {
    id: 1,
    name: "Yellow Thai Inspired Smoked Tofu Curry",
    ingredients: {
      onion: {
        quantity: 2,
        weight: null,
      },
      "pak choi": {
        quantity: 2,
        weight: null,
      },
      "smoked tofu": {
        quantity: null,
        weight: 450,
      },
    },
  },
];

console.log(Object.keys(initialRecipes[0].ingredients));
