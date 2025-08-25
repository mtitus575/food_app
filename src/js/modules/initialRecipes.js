//This holds a set of initial recipes:

const initialRecipes = [
  {
    id: 1,
    name: "Yellow Thai Inspired Smoked Tofu Curry",
    ingredients: {
      ingredient: {
        name: "onion",
        amount: 2,
        unit: "pieces",
        category: "vegetables",
      },
      ingredient: {
        name: "pak choi",
        amount: 2,
        unit: "pieces",
        category: "vegetables",
      },
      ingredient: {
        name: "smoked tofu",
        amount: 450,
        unit: "g",
        category: "protein",
      },
    },
  },
];

const VALID_UNITS = {
  volume: ["cups", "tbsp", "tsp", "ml", "l"],
  weight: ["g", "kg", "oz", "lbs"],
  count: ["pieces", "whole", "cloves", "slices"],
};

console.log(Object.keys(initialRecipes[0].ingredients));
