//This holds a set of initial recipes:

export const RECIPE_BANK = [
  {
    //first recipe:
    id: 1,
    week: 2,
    name: "yellow thai inspired smoked tofu curry",
    image:
      "https://media.greenchef.com/w_750,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/681ca4a4818d9f25cca8428e/step-ebeca150.jpg",
    ingredients: [
      {
        name: "onion",
        amount: 2,
        unit: "whole",
        image: "imgOfItem",
      },
      {
        name: "pak choi",
        amount: 2,
        unit: "whole",
        image: "imgOfItem",
      },
      {
        name: "smoked tofu",
        amount: 450,
        unit: "grams",
        image: "imgOfItem",
      },
      {
        name: "lime",
        amount: 2,
        unit: "whole",
        image: "imgOfItem",
      },
      {
        name: "yellow thai style paste",
        amount: 90,
        unit: "grams",
        image: "imgOfItem",
      },
      {
        name: "coconut milk",
        amount: 400,
        unit: "ml",
        image: "imgOfItem",
      },
      {
        name: "brown basmati rice (pouches)",
        amount: 2,
        unit: "whole",
        image: "imgOfItem",
      },
      {
        name: "baby spinach",
        amount: 80,
        unit: "grams",
        image: "imgOfItem",
      },
      {
        name: "chilli flakes",
        amount: 5,
        unit: "grams",
        image: "imgOfItem",
      },
    ],
    addedIngredients: [
      /*Objects added by user, stored in localStorage */
    ],
    instructions: [
      "Prep the Veg - Halve, peel and thinly slice the onion. Trim the pak choi, then thinly slice widthways. Juice half the lime and cut the other half into wedges.",
      "Fry the Tofu - Drain the smoked tofu and chop into 2cm cubes. Pat dry with kitchen paper. Heat a large non-stick frying pan on high heat with a drizzle of oil. Once hot, add the tofu to the frying pan. Fry until slightly crispy, 8-10 mins. Turn frequently to ensure it doesn't burn. Season with salt and pepper.",
      "Start the Curry - Whilst the tofu cooks, heat a drizzle of oil in another large frying pan on medium-high heat. When hot, add the onion to the pan and stir-fry until softened, 3-4 mins.",
      "Start the Sauce - Add the yellow Thai style paste to the onion and fry until fragrant, 1 min. Add coconut milk and pak choi. Stir to combine and simmer, 5-6 mins. Meanwhile, cook the rice according to pack instructions.",
      "Finish the Sauce - Add the spinach to the pan a handful at a time until wilted and piping hot, 1-2 mins. Stir the fried tofu and lime juice into the curry. Season with salt and pepper.",
      "Serve - Serve the rice to one side of your bowls. Season with salt and pepper. Add the yellow Thai inspired smoked Tofoo curry alongside the rice. Garnish with the chilli flakes and lime wedge.",
    ],
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    nutritionalInfo: [
      /*Fetch this per ingredient */
    ],
  },
  {
    //second recipe:
    id: 2,
    week: 1,
    name: "lentil and basa dal",
    image:
      "https://media.greenchef.com/w_750,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/681ca4b235963fcd98f3f117/step-28adb850.jpg",
    ingredients: [
      {
        name: "lentils",
        amount: 2,
        unit: "cans",
        image: "imgOfItem",
      },
      {
        name: "curry powder mix",
        amount: 2,
        unit: "sachets",
        image: "imgOfItem",
      },
      {
        name: "tomato puree",
        amount: 60,
        unit: "grams",
        image: "imgOfItem",
      },
      {
        name: "coconut milk",
        amount: 400,
        unit: "ml",
        image: "imgOfItem",
      },
      {
        name: "vegetable stock paste",
        amount: 20,
        unit: "grams",
        image: "imgOfItem",
      },
      {
        name: "basa fillets",
        amount: 8,
        unit: "whole",
        image: "imgOfItem",
      },
      {
        name: "baby spinach",
        amount: 200,
        unit: "grams",
        image: "imgOfItem",
      },
      {
        name: "water",
        amount: 400,
        unit: "ml",
        image: "imgOfItem",
      },
    ],
    addedIngredients: [
      /*Objects added by user, stored in localStorage */
    ],
    instructions: [
      "Start the Dal - Drain and rinse the lentils in a sieve. Heat a drizzle of oil in a large saucepan on medium heat. Once hot, add the curry powder and tomato puree. Stir together and cook for 1 min.",
      "Start the Dal - Pour in the water (see pantry), coconut milk and vegetable stock paste. Mix well and bring to the boil.",
      "Simmer the Dal - Stir through the salt (see pantry) and a good grind of pepper, then bring to a simmer and stir through the lentils. Place a lid on the lentil pan and simmer for 15-20 mins.",
      "Cook the Basa - Cut the basa into 4cm pieces. When the lentil dal has 5-8 mins remaining, add the basa pieces and stir to coat. Season with salt and pepper. Simmer gently until the fish is cooked, 5-8 mins.",
      "Add the Spinach - When the fish is cooked, stir the spinach through the dal a handful at a time until wilted and piping hot, 1-2 mins. Add a splash of water if it looks dry & serve.",
    ],
    prepTime: 10,
    cookTime: 25,
    servings: 4,
    nutritionalInfo: [
      /*Fetch this per ingredient */
    ],
  },
  {
    //third recipe:
    id: 3,
    week: 1,
    name: "coconut, chilli and herb crusted basa",
    image:
      "https://media.greenchef.com/w_750,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/681ca4aa35963fcd98f3f103/step-5302ff50.jpg",
    ingredients: [
      { name: "lemon", amount: 2, unit: "whole", image: "imgOfItem" },
      { name: "garlic clove", amount: 6, unit: "whole", image: "imgOfItem" },
      { name: "coriander", amount: 2, unit: "bunches", image: "imgOfItem" },
      {
        name: "desiccated coconut",
        amount: 30,
        unit: "grams",
        image: "imgOfItem",
      },
      { name: "basa fillets", amount: 8, unit: "whole", image: "imgOfItem" },
      {
        name: "vegetable stock paste",
        amount: 20,
        unit: "grams",
        image: "imgOfItem",
      },
      { name: "bulgur wheat", amount: 240, unit: "grams", image: "imgOfItem" },
      {
        name: "young pea pods",
        amount: 320,
        unit: "grams",
        image: "imgOfItem",
      },
      {
        name: "low fat natural yoghurt",
        amount: 150,
        unit: "grams",
        image: "imgOfItem",
      },
      { name: "sugar", amount: 2, unit: "tsp", image: "imgOfItem" },
      { name: "salt", amount: 0.25, unit: "tsp", image: "imgOfItem" },
      { name: "olive oil", amount: 2, unit: "tbsp", image: "imgOfItem" },
      {
        name: "boiled water for the bulgur",
        amount: 440,
        unit: "ml",
        image: "imgOfItem",
      },
    ],
    addedIngredients: [
      /*Objects added by user, stored in localStorage */
    ],
    instructions: [
      "Prep the Paste - Preheat the oven to 220°C/200°C fan/gas mark 7. Roughly chop the parsley (stalks and all). Halve the red chilli lengthways and deseed. Zest the lemon, then juice one half and cut the other half into wedges. Peel the garlic cloves.",
      "Make the Paste - If you don't have a food processor, finely chop the coriander (stalks and all) and red chilli. Grate the garlic (or use a garlic press). In a medium bowl, add the coriander, half the parsley, the garlic, lemon juice, red chilli and desiccated coconut. Mix well with the sugar, salt and olive oil to form a paste. Season with pepper. If you have a food processor, whizz together the same ingredients to form a paste.",
      "Bake the fish - Boil a half-full kettle. Pat the sea bream dry with kitchen paper. Place the fish fillets, skin side down, onto a lined baking tray. Season with salt and pepper. Spoon the herby coconut paste onto each fillet, spreading to cover the top and gently pressing down to secure the crumb. Bake on the middle shelf until cooked through, 12-16 mins.",
      "Cook the Bulgur Wheat - Meanwhile, pour the boiled water into a medium saucepan on high heat, then stir in the veg stock paste and bulgur wheat. Bring back to the boil and simmer for 1 min. Put a lid on the pan and remove from the heat. Leave to the side for 12-15 mins or until ready to serve.",
      "Serve - When cooked, stir the lemon zest through the bulgur wheat and share between your bowls. Serve the young pea pods alongside. Top with a coconut, chilli and herb crusted sea bream fillet. Drizzle over the parsley yoghurt and serve with a lemon wedge.",
    ],
    prepTime: 20,
    cookTime: 16,
    servings: 4,
    nutritionalInfo: [
      /*Fetch this per ingredient */
    ],
  },
  {
    //fourth recipe:
    id: 4,
    name: "sweet miso aubergine in a sambal mayo drizzle",
    image:
      "https://media.greenchef.com/w_750,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/6811efb55917498f8bf2e652/step-7e017d50.jpg",
    ingredients: [
      { name: "sushi rice", amount: 300, unit: "grams", image: "imgOfItem" },
      { name: "ginger puree", amount: 30, unit: "grams", image: "imgOfItem" },
      { name: "aubergine", amount: 4, unit: "whole", image: "imgOfItem" },
      { name: "miso paste", amount: 44, unit: "grams", image: "imgOfItem" },
      { name: "ketjap manis", amount: 100, unit: "grams", image: "imgOfItem" },
      { name: "rice vinegar", amount: 60, unit: "ml", image: "imgOfItem" },
      { name: "sambal paste", amount: 30, unit: "grams", image: "imgOfItem" },
      {
        name: "vegan mayonnaise",
        amount: 64,
        unit: "grams",
        image: "imgOfItem",
      },
      { name: "radishes", amount: 200, unit: "grams", image: "imgOfItem" },
      { name: "coriander", amount: 1, unit: "bunches", image: "imgOfItem" },
      {
        name: "boiled water for the rice",
        amount: 600,
        unit: "ml",
        image: "imgOfItem",
      },
      { name: "sugar", amount: 0.5, unit: "tsp", image: "imgOfItem" },
    ],
    addedIngredients: [
      /*Objects added by user, stored in localStorage */
    ],
    instructions: [
      "Cook the Rice - Preheat your oven to 220°C/200°C fan/gas mark 7. Boil a half-full kettle. Thoroughly rinse the sushi rice under cold water in a sieve until it runs clear. Pour the boiled water into a medium saucepan, bring back to the boil on high heat. Stir in the sushi rice and ginger puree. Turn the heat down to low. Cover with a tight-fitting lid and cook for 15 mins. Remove from the heat (still covered) and leave to the side until ready to serve (the rice will continue to cook in its own steam).",
      "Cook the Aubergine - Meanwhile, trim the aubergines, then halve lengthways. Cut each half into four long strips, then cut widthways into 2cm wedges. In a small bowl, mix together the miso paste, ketjap manis and half the rice vinegar. Put the aubergine onto a large lined baking tray. Drizzle with oil, season with salt and pepper and spread out in a single layer.",
      "Roast the Aubergine - When the oven is hot, roast the aubergine on the top shelf until soft and golden, 25-30 mins. Halfway through cooking, drizzle over half the sweet miso sauce, then toss to coat. Return to the oven for the remaining time.",
      "Make the Sambal Mayo - While the aubergine cooks, in a small bowl, mix together the sambal, vegan mayonnaise and 2 tbs water. Pickle the Radish - Trim and thinly slice the radishes. Add the radish to another small bowl along with the sugar, a pinch of salt and the remaining rice vinegar. Mix together and set aside to pickle.",
      "Prep - Roughly chop the coriander (stalks and all). Crush the cashew nuts in the unopened sachet using a rolling pin. Stir the pickling juices from the radish through the rice and season with salt.",
      "Serve - Once the aubergine has cooked, add it to the bowl of remaining miso sauce and toss to coat. Stir half the coriander through the sushi rice and share between your bowls. Top with the sweet miso aubergine and pickled radish. Pour over any remaining sauce. Drizzle over the sambal mayo.",
    ],
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    nutritionalInfo: [
      /*Fetch this per ingredient */
    ],
  },
  {
    //fifth recipe:
    id: 5,
    name: "northern thai inspired vegetable noodle soup",
    image:
      "https://media.greenchef.com/w_750,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/6811efaf05fc1830ec44fd62/step-21dbca50.jpg",
    ingredients: [
      { name: "bell peppers", amount: 2, unit: "whole", image: "imgOfItem" },
      { name: "limes", amount: 2, unit: "whole", image: "imgOfItem" },
      {
        name: "red thai style paste",
        amount: 100,
        unit: "grams",
        image: "imgOfItem",
      },
      {
        name: "thai style spice blend",
        amount: 2,
        unit: "tbsp",
        image: "imgOfItem",
      },
      { name: "ground turmeric", amount: 2, unit: "tbsp", image: "imgOfItem" },
      { name: "coconut milk", amount: 400, unit: "ml", image: "imgOfItem" },
      {
        name: "young pea pods/sugar snaps",
        amount: 160,
        unit: "grams",
        image: "imgOfItem",
      },
      { name: "egg noodles", amount: 250, unit: "grams", image: "imgOfItem" },
      {
        name: "shiitake mushrooms",
        amount: 200,
        unit: "grams",
        image: "imgOfItem",
      },
      { name: "soy sauce", amount: 20, unit: "ml", image: "imgOfItem" },
      { name: "water for the sauce", amount: 1, unit: "l", image: "imgOfItem" },
    ],
    addedIngredients: [
      /*Objects added by user, stored in localStorage */
    ],
    instructions: [
      "Prep the Veg - Halve the bell pepper and discard the core and seeds. Slice into thin strips. Crush the peanuts in the unopened bag using a rolling pin. Juice half the lime and cut the other half into wedges.",
      "Start the Sauce - Heat a large saucepan on medium heat with a drizzle of oil. Once hot, add the red Thai style paste, Thai style spice blend and turmeric. Fry until fragrant, stirring occasionally, 2 mins.",
      "Simmer the Sauce - Next, add the coconut milk and the water. Bring to the boil, then add the pepper strips and young pea pods. Simmer for 1-2 mins.",
      "Add the Noodles - Add the noodles and cook until tender, 4 mins. Season with salt and pepper.",
      "Fry the Mushrooms - Meanwhile, heat a drizzle of oil in a large frying pan on high heat. When hot, add the shiitake mushrooms and season with salt and pepper. Cook, stirring frequently, until starting to brown, 4-5 mins. Reduce the heat, add half the soy sauce and fry for 1 min. Stir the lime juice and remaining soy sauce through the noodles.",
      "Serve - Share the Northern Thai style noodle soup between your bowls and top with the soy shiitake mushrooms.",
    ],
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    nutritionalInfo: [
      /*Fetch this per ingredient */
    ],
  },
  {
    //sixth recipe:
    id: 6,
    week: 2,
    name: "vietnamese inspired basa & creamy conjac noodles",
    image:
      "https://media.greenchef.com/w_750,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/6809118b3a1db6f3d2ac5a19/step-06a22a50.jpeg",
    ingredients: [
      { name: "udon noodles", amount: 400, unit: "grams", image: "imgOfItem" },
      { name: "pak choi", amount: 2, unit: "whole", image: "imgOfItem" },
      { name: "basa fillets", amount: 8, unit: "whole", image: "imgOfItem" },
      { name: "coconut milk", amount: 400, unit: "ml", image: "imgOfItem" },
      { name: "peanut butter", amount: 60, unit: "grams", image: "imgOfItem" },
      {
        name: "vegetable stock paste",
        amount: 30,
        unit: "grams",
        image: "imgOfItem",
      },
      {
        name: "ginger, garlic & lemongrass puree",
        amount: 30,
        unit: "grams",
        image: "imgOfItem",
      },
      { name: "chilli flakes", amount: 2, unit: "pinches", image: "imgOfItem" },
      { name: "water", amount: 150, unit: "ml", image: "imgOfItem" },
    ],
    addedIngredients: [
      /*Objects added by user, stored in localStorage */
    ],
    instructions: [
      "Prep - Thinly slice the pak choi.",
      "Fry the Basa - Heat a medium frying pan on medium-high heat with a drizzle of oil. Pat the basa dry with kitchen paper, then season with salt and pepper. Once hot, lay the fillets in the pan and cook for 4-5 mins. Turn over and cook on the other side for a further 4-5 mins.",
      "Start the Sauce - Meanwhile, heat a large frying pan on medium-high heat. Once hot, add the coconut milk, peanut butter, water and vegetable stock paste to the veg. Stir to dissolve the peanut butter and stock paste, then bring to a simmer.",
      "Add the Veg - Once combined, add the pak choi to the sauce and cook until softened, 2-3 mins. Add the noodles and simmer for another 1-2 mins. Add a splash of water if it looks dry.",
      "Add the Flavour - In the last 2 mins of basa cook time, add the ginger, garlic & lemongrass puree and another drizzle of oil, then turn to coat.",
      "Serve - Divide the noodles between your bowls. Top with the Vietnamese inspired basa. Sprinkle over the chilli flakes.",
    ],
    prepTime: 5,
    cookTime: 15,
    servings: 4,
    nutritionalInfo: [
      /*Fetch this per ingredient */
    ],
  },
  {
    //seventh recipe:
    id: 7,
    name: "mexican inspired tomato black beans",
    image:
      "https://media.greenchef.com/w_750,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/6809119bde3861faddf5a2c1/step-37948d50.jpg",
    ingredients: [
      { name: "bell peppers", amount: 2, unit: "whole", image: "imgOfItem" },
      { name: "black beans", amount: 2, unit: "cans", image: "imgOfItem" },
      {
        name: "mexican style spice mix",
        amount: 1,
        unit: "sachets",
        image: "imgOfItem",
      },
      { name: "ground cumin", amount: 2, unit: "tbsp", image: "imgOfItem" },
      { name: "crushed tomatoes", amount: 2, unit: "cans", image: "imgOfItem" },
      { name: "avocado", amount: 2, unit: "whole", image: "imgOfItem" },
      {
        name: "mature cheddar cheese",
        amount: 80,
        unit: "grams",
        image: "imgOfItem",
      },
      {
        name: "steamed brown basmati rice",
        amount: 2,
        unit: "pouches",
        image: "imgOfItem",
      },
      { name: "sugar", amount: 0.5, unit: "tsp", image: "imgOfItem" },
      {
        name: "water for the sauce",
        amount: 100,
        unit: "ml",
        image: "imgOfItem",
      },
    ],
    addedIngredients: [
      /*Objects added by user, stored in localStorage */
    ],
    instructions: [
      "Prep the Veg - Halve the bell pepper and discard the core and seeds. Cut into 1cm chunks.",
      "Start the Sauce - Heat a large saucepan on medium-high heat with a drizzle of oil. Once hot, add the pepper chunks and fry until softened, 1-2 mins. Meanwhile, drain and rinse the black beans in a sieve. Put a third of the beans into a bowl and roughly mash with a fork. Stir the mashed and whole black beans into the pan, along with the Mexican style spice mix and cumin. Fry for 1 min more.",
      "Add the Tomato Sauce - Next, stir in the canned tomatoes, sugar and water. Season with salt and pepper. Simmer until thickened, stirring occasionally, 4-6 mins.",
      "Prep the Avocado - Meanwhile, halve the avocado and remove the stone. Use a tablespoon to scoop out the flesh in one piece, then thinly slice. Season with salt and pepper. Grate the Cheddar cheese.",
      "Cook the Rice - Cook the rice according to pack instructions.",
      "Serve - Share the basmati rice between your plates. Top with the Mexican inspired black beans and sliced avocado. Scatter over the grated Cheddar cheese to finish.",
    ],
    prepTime: 10,
    cookTime: 10,
    servings: 4,
    nutritionalInfo: [
      /*Fetch this per ingredient */
    ],
  },
  {
    //eighth recipe:
    id: 8,
    week: 1,
    name: "yellow thai inspired cod curry",
    image:
      "https://media.greenchef.com/w_750,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/67f7c615853dfb1d75b49003/step-68a99d50.jpg",
    ingredients: [
      { name: "basmati rice", amount: 2, unit: "packs", image: "imgOfItem" },
      { name: "shallots", amount: 2, unit: "whole", image: "imgOfItem" },
      { name: "green peppers", amount: 2, unit: "whole", image: "imgOfItem" },
      { name: "garlic cloves", amount: 2, unit: "whole", image: "imgOfItem" },
      { name: "red chillies", amount: 2, unit: "whole", image: "imgOfItem" },
      { name: "coriander", amount: 1, unit: "bunches", image: "imgOfItem" },
      { name: "basa fillets", amount: 8, unit: "whole", image: "imgOfItem" },
      {
        name: "yellow thai style paste",
        amount: 90,
        unit: "grams",
        image: "imgOfItem",
      },
      { name: "coconut milk", amount: 400, unit: "ml", image: "imgOfItem" },
      {
        name: "boiled water for the rice",
        amount: 1.6,
        unit: "l",
        image: "imgOfItem",
      },
      {
        name: "water for the sauce",
        amount: 100,
        unit: "ml",
        image: "imgOfItem",
      },
    ],
    addedIngredients: [
      /*Objects added by user, stored in localStorage */
    ],
    instructions: [
      "Prep the Veg - Meanwhile, halve, peel and dice the shallot. Halve the green pepper and discard the core and seeds. Slice into thin strips. Peel and grate the garlic (or use a garlic press). Halve the red chilli lengthways, deseed, then finely chop. Roughly chop the coriander (stalks and all).",
      "Prep the Fish - Cut the fish into 4cm pieces. Cook the rice.",
      "Start the Sauce - Heat a large frying pan on medium-high heat with a drizzle of oil. When hot, add the shallot and cook until softened, 1-2 mins. Add the pepper slices, garlic and half the red chilli. Cook, stirring frequently, until softened, 3-4 mins. Add the yellow Thai style paste and cook until fragrant, 1 min.",
      "Finish the Sauce - Add the coconut milk and water, then stir to combine. Add the cod chunks, then stir to coat. Season with salt and pepper. Lower the heat and simmer gently until the fish is cooked, 5-8 mins.",
      "Serve - Divide the black rice between your bowls. Spoon the yellow Thai inspired cod curry alongside the rice. Top with the coriander and remaining red chilli.",
    ],
    prepTime: 15,
    cookTime: 15,
    servings: 4,
    nutritionalInfo: [
      /*Fetch this per ingredient */
    ],
  },
  {
    //ninth recipe:
    id: 9,
    name: "confit garlic, lemon and rosemary basa",
    image:
      "https://media.greenchef.com/w_750,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/67f7c60f0ed0c93fe95a3d68/step-c7991650.jpg",
    ingredients: [
      {
        name: "salad potatoes",
        amount: 700,
        unit: "grams",
        image: "imgOfItem",
      },
      { name: "mixed herbs", amount: 2, unit: "tbsp", image: "imgOfItem" },
      { name: "garlic cloves", amount: 6, unit: "whole", image: "imgOfItem" },
      { name: "rosemary", amount: 2, unit: "bunches", image: "imgOfItem" },
      { name: "lemons", amount: 2, unit: "whole", image: "imgOfItem" },
      { name: "basa fillets", amount: 8, unit: "whole", image: "imgOfItem" },
      {
        name: "tenderstem broccoli",
        amount: 300,
        unit: "grams",
        image: "imgOfItem",
      },
      { name: "peas", amount: 240, unit: "grams", image: "imgOfItem" },
    ],
    addedIngredients: [
      /*Objects added by user, stored in localStorage */
    ],
    instructions: [
      "Roast the Potatoes - Preheat your oven to 220°C/200°C fan/gas mark 7. Chop the potatoes into 2cm chunks (no need to peel). Place the potato chunks onto a large baking tray. Drizzle with oil, sprinkle over the mixed herbs, then season with salt and pepper. Toss to coat. Spread out in a single layer. When the oven is hot, roast on the top shelf until golden, 25-35 mins. Turn halfway through.",
      "Prep the Veg - Peel the garlic cloves. Slice as thinly thinly as you can widthways. Save one whole sprig of rosemary per person, then pick the remaining rosemary leaves from their stalks and roughly chop (discard the stalks). Zest and cut the lemon into wedges.",
      "Prep the Fish - Lay each bream fillet into a piece of foil. Drizzle with oil, then sprinkle over the chopped rosemary and lemon zest. Top with the garlic slices and the whole sprigs of rosemary. Fold the foil, sealing on all sides to create a parcel.",
      "Bake the Fish - When the potatoes have 14-16 mins remaining, place the bream parcels onto a large baking tray. Bake on the middle shelf of your oven until cooked through, 8-10 mins.",
      "Cook the Veg - Boil a half-full kettle. When the fish and potatoes have 5 mins remaining, pour the boiled water into a medium saucepan with 1/4 tsp salt and bring back to the boil. Cut the Tenderstem broccoli into thirds. When the water is boiling, add the broccoli and cook for 1-2 mins. Add the peas and cook until the broccoli is just tender, 2-3 mins. Once cooked, drain in a sieve and return to the pan. Drizzle with a little oil and a squeeze of lemon to taste. Season with salt and pepper.",
      "Serve - Share the potatoes and green veg between your plates. Serve the confit garlic fish alongside, spooning over any remaining juices from the parcels (discard the whole rosemary sprigs). Squeeze a lemon wedge over the fish to taste.",
    ],
    prepTime: 15,
    cookTime: 35,
    servings: 4,
    nutritionalInfo: [
      /*Fetch this per ingredient */
    ],
  },
  {
    //tenth recipe:
    id: 10,
    week: 2,
    name: "peanut and lime noodles",
    image:
      "https://media.greenchef.com/w_750,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/67ed5f6bd1bc9d2bb2b9c383/step-d2223a50.jpg",
    ingredients: [
      { name: "bell peppers", amount: 2, unit: "whole", image: "imgOfItem" },
      {
        name: "speciality mushroom mix",
        amount: 500,
        unit: "grams",
        image: "imgOfItem",
      },
      { name: "red chillies", amount: 2, unit: "whole", image: "imgOfItem" },
      { name: "pak choi", amount: 4, unit: "whole", image: "imgOfItem" },
      { name: "limes", amount: 2, unit: "whole", image: "imgOfItem" },
      { name: "soy sauce", amount: 40, unit: "ml", image: "imgOfItem" },
      { name: "peanut butter", amount: 60, unit: "grams", image: "imgOfItem" },
      { name: "ginger puree", amount: 30, unit: "grams", image: "imgOfItem" },
      { name: "ketjap manis", amount: 100, unit: "grams", image: "imgOfItem" },
      { name: "udon noodles", amount: 400, unit: "grams", image: "imgOfItem" },
      {
        name: "water for the sauce",
        amount: 4,
        unit: "tbsp",
        image: "imgOfItem",
      },
    ],
    addedIngredients: [
      /*Objects added by user, stored in localStorage */
    ],
    instructions: [
      "Prep the Veg - Halve the bell pepper and discard the core and seeds. Tear the yellow and grey oyster mushrooms from the speciality mushroom mix into smaller pieces. Cut the shiitake and chestnut mushrooms into quarters. Halve the red chilli lengthways, deseed, then finely chop. Trim the pak choi, half lengthways, then thinly slice widthways.",
      "Make the sauce - Zest the whole lime, then juice one half and cut the other half into wedges. In a small bowl, whisk together the soy sauce, peanut butter, ginger puree, lime zest, half the chilli and the ketjap manis. Gradually whisk in the water for the sauce and lime juice until smooth. Set aside your peanut sauce.",
      "Cook the veg - Heat a large frying pan on high heat with a drizzle of oil. Once hot, fry the pepper strips until softened, 2-3 mins. Meanwhile, crush the peanuts in the unopened sachet using a rolling pin.",
      "Next, add the pak choi and mushrooms to the frying pan. Fry until softened, 3-4 mins. Season with pepper.",
      "Add the Sauce - Add the udon noodles and peanut sauce to the frying pan. Toss to coat everything in the sauce, using a fork to gently separate the noodles. Stir-fry for 2-3 mins. Add a splash of water if it looks dry.",
      "Serve - Share the peanut and lime noodles between your bowls. Top with the remaining red chilli and a lime wedge.",
    ],
    prepTime: 15,
    cookTime: 10,
    servings: 4,
    nutritionalInfo: [
      /*Fetch this per ingredient */
    ],
  },
  {
    //eleventh recipe:
    id: 11,
    name: "miso glazed aubergine",
    image:
      "https://media.greenchef.com/w_750,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/67e53642f59be9ad8dcc7609/step-537a3750.jpg",
    ingredients: [
      { name: "aubergines", amount: 2, unit: "whole", image: "imgOfItem" },
      { name: "miso paste", amount: 60, unit: "grams", image: "imgOfItem" },
      { name: "honey", amount: 60, unit: "grams", image: "imgOfItem" },
      { name: "chilli flakes", amount: 2, unit: "pinches", image: "imgOfItem" },
      { name: "ketjap manis", amount: 100, unit: "grams", image: "imgOfItem" },
      { name: "bell peppers", amount: 4, unit: "whole", image: "imgOfItem" },
      { name: "limes", amount: 2, unit: "whole", image: "imgOfItem" },
      { name: "sesame oil", amount: 20, unit: "ml", image: "imgOfItem" },
      {
        name: "shredded savoy cabbage",
        amount: 300,
        unit: "grams",
        image: "imgOfItem",
      },
      { name: "udon noodles", amount: 400, unit: "grams", image: "imgOfItem" },
    ],
    addedIngredients: [
      /*Objects added by user, stored in localStorage */
    ],
    instructions: [
      "Bake the Aubergine - Preheat your oven to 220°C/200°C fan/gas mark 7. Halve the aubergine lengthways, keeping the stem attached. Score the flesh deeply in a criss-cross pattern, taking care not to cut through the skin. Put the aubergine halves, skin-side down, onto a large, lined baking tray. Drizzle with oil and season with salt and pepper. Once the oven is hot, roast the aubergine on the top shelf until golden brown and soft, 25-28 mins.",
      "Make the Miso Sauce - Meanwhile, in a small bowl, combine the miso paste, honey, chilli flakes and half the ketjap manis. Set aside your miso sauce. Halve the bell peppers and discard the core and seeds. Slice into thin strips.",
      "Glaze the Aubergine - When the aubergine has 12-14 mins remaining, remove from the oven and spread 1 tbsp of the miso sauce over each aubergine half. Set aside the remaining sauce for later. Return to the oven for the remaining time, 12-14 mins.",
      "Finish the Sauce - Meanwhile, juice half the lime and cut the other half into wedges. Add the lime juice, sesame oil and remaining ketjap manis to the miso sauce. Place a large frying pan on medium-high heat with a drizzle of oil. Once hot, fry the pepper slices and savoy cabbage until softened, 4-5 mins.",
      "Cook the Noodles - Next, add the remaining miso sauce and udon noodles to the pan. Toss to coat the noodles in the sauce, using a fork to gently separate them, 3-4 mins.",
      "Serve - Share the udon noodles between your bowls and top with the miso glazed aubergine.",
    ],
    prepTime: 10,
    cookTime: 30,
    servings: 4,
    nutritionalInfo: [
      /*Fetch this per ingredient */
    ],
  },
  {
    //twelfth recipe:
    id: 12,
    name: "basa bouillabaisse",
    image:
      "https://media.greenchef.com/w_750,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/67e5363d0d3e977968bd966d/step-8499ca50.jpg",
    ingredients: [
      { name: "shallots", amount: 4, unit: "whole", image: "imgOfItem" },
      { name: "large tomatoes", amount: 6, unit: "whole", image: "imgOfItem" },
      { name: "garlic clove", amount: 2, unit: "whole", image: "imgOfItem" },
      { name: "basa fillets", amount: 8, unit: "whole", image: "imgOfItem" },
      { name: "creme fraiche", amount: 300, unit: "grams", image: "imgOfItem" },
      {
        name: "grated hard italian style cheese",
        amount: 40,
        unit: "grams",
        image: "imgOfItem",
      },
      {
        name: "sun-dried tomato paste",
        amount: 50,
        unit: "grams",
        image: "imgOfItem",
      },
      { name: "dried thyme", amount: 2, unit: "tbsp", image: "imgOfItem" },
      {
        name: "vegetable stock paste",
        amount: 20,
        unit: "grams",
        image: "imgOfItem",
      },
      {
        name: "flat leaf parsley",
        amount: 1,
        unit: "whole",
        image: "imgOfItem",
      },
      { name: "red chillies", amount: 2, unit: "whole", image: "imgOfItem" },
      {
        name: "water for the sauce",
        amount: 300,
        unit: "ml",
        image: "imgOfItem",
      },
    ],
    addedIngredients: [
      /*Objects added by user, stored in localStorage */
    ],
    instructions: [
      "Prep the Veg - Trim and discard the root and the dark green leafy part from the leek. Halve lengthways, then thinly slice. Cut the tomatoes into 1cm chunks. Peel and grate the garlic",
      "Prep the Fish - Slice the basa into 4cm pieces.",
      "Start the Sauce - Heat a large frying pan on medium-high heat with a drizzle of oil. Once hot, add the shallots and tomatoes. Cook, stirring regularly, 3-4 mins, then add the garlic and cook for 1 min more. Season with salt and pepper. Stir in the creme fraiche, grated hard Italian style cheese, sun-dried tomato paste and dried thyme.",
      "Poach the Basa - Next, add the veg stock paste and water (see pantry) to the sauce, stir to combine. Add the basa chunks and season with salt and pepper. Lower the heat and simmer gently until the fish is cooked 5-8 mins",
      "Prep the Garnish - Meanwhile, roughly chop the parsley (stalks and all). Halve the red chilli lengthways, deseed, then thinly slice.",
      "Serve - Ladle the creamy basa, tomato and leek bouillabaisse into your bowls. Sprinkle over the red chilli and parsley to finish.",
    ],
    prepTime: 10,
    cookTime: 13,
    servings: 4,
    nutritionalInfo: [
      /*Fetch this per ingredient */
    ],
  },
  {
    //thirteenth recipe:
    id: 13,
    week: 1,
    name: "honey teriyaki glazed aubergine tacos",
    image:
      "https://media.greenchef.com/w_750,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/67daf73e40b689c290457332/step-8f701850.jpg",
    ingredients: [
      { name: "limes", amount: 2, unit: "whole", image: "imgOfItem" },
      {
        name: "carrots (shredded)",
        amount: 120,
        unit: "grams",
        image: "imgOfItem",
      },
      {
        name: "red cabbage (shredded)",
        amount: 120,
        unit: "grams",
        image: "imgOfItem",
      },
      { name: "aubergines", amount: 4, unit: "whole", image: "imgOfItem" },
      { name: "spring onions", amount: 2, unit: "whole", image: "imgOfItem" },
      { name: "avocados", amount: 2, unit: "whole", image: "imgOfItem" },
      {
        name: "teriyaki sauce",
        amount: 120,
        unit: "grams",
        image: "imgOfItem",
      },
      { name: "honey", amount: 30, unit: "grams", image: "imgOfItem" },
      {
        name: "plain taco tortillas",
        amount: 12,
        unit: "whole",
        image: "imgOfItem",
      },
      { name: "chilli flakes", amount: 2, unit: "pinches", image: "imgOfItem" },
    ],
    addedIngredients: [
      /*Objects added by user, stored in localStorage */
    ],
    instructions: [
      "Prep the Veg - If you don't have a microwave, heat your oven to 220°C/200°C fan/gas mark 7 for the tortillas. Juice the lime into a medium bowl. Add the shredded carrot and cabbage, then season with salt and pepper. Stir and set aside to pickle. Trim the aubergines, then cut into roughly 2cm pieces.",
      "Fry the Aubergine - Heat a large frying pan on high heat with enough oil to coat the base of the pan. When hot, add the aubergine, season with salt and pepper, then cook until charred, 12-14 mins. Use two frying pans if needed. Turn only every couple of mins - this will result in the aubergine picking up some colour.",
      "Prep - Meanwhile, thinly slice the spring onion on an angle. Halve the avocado and remove the stone. Use a tablespoon to scoop the flesh out onto a board, face-down. Slice into 1cm thick slices. Season with salt and pepper.",
      "Add the Teriyaki - Once the aubergine is cooked, lower the heat and add the teriyaki and honey. Stir to combine the glaze and warm through. Pile the tortillas onto a plate. Heat them through in the microwave, 850W: 50 secs / 750W: 1 min, until warm and soft. If you're using the oven, put them into the oven to warm through, 1-2 mins. If your honey has hardened, put the sachet in a bowl of hot water for 1 min to loosen.",
      "Serve - Divide the tortillas between your plates. Top with the pickled slaw, avocado and honey teriyaki glazed aubergine. Sprinkle over the chilli flakes. Serve with the baby leaf salad alongside, drizzle with olive oil and the remaining pickling juices and season with salt and pepper.",
    ],
    prepTime: 8,
    cookTime: 14,
    servings: 4,
    nutritionalInfo: [
      /*Fetch this per ingredient */
    ],
  },
  {
    //fourteenth recipe:
    id: 14,
    name: "honey-harissa glazed cod",
    image:
      "https://media.greenchef.com/w_750,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/67daf73b7aed69c9540c8fc2/step-aa8cfc50.jpg",
    ingredients: [
      {
        name: "salad potatoes",
        amount: 700,
        unit: "grams",
        image: "imgOfItem",
      },
      { name: "red onion", amount: 1, unit: "whole", image: "imgOfItem" },
      { name: "bell pepper", amount: 4, unit: "whole", image: "imgOfItem" },
      {
        name: "baby plum tomatoes",
        amount: 300,
        unit: "grams",
        image: "imgOfItem",
      },
      { name: "mixed herbs", amount: 2, unit: "tbsp", image: "imgOfItem" },
      { name: "honey", amount: 30, unit: "grams", image: "imgOfItem" },
      { name: "harissa paste", amount: 100, unit: "grams", image: "imgOfItem" },
      { name: "basa fillets", amount: 8, unit: "whole", image: "imgOfItem" },
    ],
    addedIngredients: [
      /*Objects added by user, stored in localStorage */
    ],
    instructions: [
      "Prep the Potatoes - Preheat your oven to 220°C/200°C fan/gas mark 7. Chop the salad potatoes into 4cm chunks (no need to peel). Halve and peel the red onion, then cut each half into 3 wedges. Halve the bell pepper and discard the core and seeds. Chop into 3cm chunks.",
      "Prep the Veg - Place the baby plum tomatoes, potato chunks, red onion and pepper chunks onto a large baking tray. Drizzle with oil, sprinkle over the mixed herbs, season with salt and pepper, then toss to coat. Spread out in a single layer. Use 2 trays if necessary. When the oven is hot, roast on the top shelf until golden, 25-30 mins. Turn halfway through.",
      "Make the Glaze - In a small bowl, combine the honey and harissa.",
      "Prep the fish - Place the fish onto a lined baking tray. Pour the honey harissa mix over the fish and season with salt and pepper. Bake on the middle shelf for 12-14 mins until the fish is cooked.",
      "Serve",
    ],
    prepTime: 7,
    cookTime: 30,
    servings: 4,
    nutritionalInfo: [
      /*Fetch this per ingredient */
    ],
  },
  {
    //fifteenth recipe:
    id: 15,
    week: 2,
    name: "pesto crusted cod",
    image:
      "https://media.greenchef.com/w_750,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/67c8863f8f112f54d1d768e4/step-91839050.jpg",
    ingredients: [
      {
        name: "salad potatoes",
        amount: 700,
        unit: "grams",
        image: "imgOfItem",
      },
      { name: "mixed herbs", amount: 2, unit: "tbsp", image: "imgOfItem" },
      { name: "aubergines", amount: 2, unit: "whole", image: "imgOfItem" },
      { name: "basa fillets", amount: 8, unit: "whole", image: "imgOfItem" },
      { name: "pesto", amount: 64, unit: "grams", image: "imgOfItem" },
      { name: "lentils", amount: 2, unit: "cans", image: "imgOfItem" },
      {
        name: "flat leaf parsley",
        amount: 1,
        unit: "whole",
        image: "imgOfItem",
      },
      {
        name: "passata di pomodoro",
        amount: 2,
        unit: "whole",
        image: "imgOfItem",
      },
      {
        name: "vegetable stock paste",
        amount: 20,
        unit: "grams",
        image: "imgOfItem",
      },
      { name: "honey", amount: 2, unit: "tsp", image: "imgOfItem" },
      {
        name: "water for the lentils",
        amount: 100,
        unit: "ml",
        image: "imgOfItem",
      },
    ],
    addedIngredients: [
      /*Objects added by user, stored in localStorage */
    ],
    instructions: [
      "Roast the Potatoes - Preheat your oven to 220°C/200°C fan/gas mark 7. Chop the salad potatoes into 2cm chunks (no need to peel). Put the chunks onto one side of a large baking tray. Drizzle with oil, add the mixed herbs, season with salt and pepper, then toss to coat. Trim the aubergine, then cut into roughly 2cm pieces.",
      "Put the aubergine onto the other side of the baking tray. Drizzle with oil, season with salt and pepper, then toss to coat. Spread out in a single layer. When the oven is hot, roast the potatoes and aubergine on the top shelf until soft and golden, 25-30 mins. Turn halfway through cooking.",
      "Prep & bake the fish - Pat the fish dry with kitchen paper. Lay the fish on a lined baking tray. Season with salt and pepper. Spread the pesto on the fish.",
      "When the veg has 15 mins remaining, bake the fish on the middle shelf until cooked, 15-18 mins.",
      "Simmer the Lentils - Drain and rinse the lentils in a sieve. Roughly chop the parsley (stalks and all). Heat a medium saucepan on medium-high heat with a drizzle of oil. Once hot, add the passata, vegetable stock paste, lentils, honey and water (see pantry for both). Stir to combine and simmer for 10-12 mins. Add a splash of water if it looks dry. Once the aubergine is cooked, stir it through the lentils along with half the parsley.",
      "Serve - Once everything's cooked, share the tomato and aubergine lentils between your bowls. Serve the potatoes alongside and top with the pesto-crusted fish. Garnish with the remaining parsley.",
    ],
    prepTime: 10,
    cookTime: 30,
    servings: 4,
    nutritionalInfo: [
      /*Fetch this per ingredient */
    ],
  },
  {
    //sixteenth recipe:
    id: 16,
    week: 1,
    name: "tomato and lentil vegetable soup",
    image:
      "https://media.greenchef.com/w_750,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/67a35f5ef5f1773a0107c7b2/step-34d6ff50.jpg",
    ingredients: [
      { name: "smoked tofu", amount: 450, unit: "grams", image: "imgOfItem" },
      { name: "onions", amount: 2, unit: "whole", image: "imgOfItem" },
      {
        name: "cavolo nero/kale",
        amount: 200,
        unit: "grams",
        image: "imgOfItem",
      },
      { name: "chives", amount: 2, unit: "whole", image: "imgOfItem" },
      {
        name: "sliced mushrooms",
        amount: 80,
        unit: "grams",
        image: "imgOfItem",
      },
      { name: "lentils", amount: 2, unit: "cans", image: "imgOfItem" },
      { name: "chopped tomatoes", amount: 2, unit: "cans", image: "imgOfItem" },
      { name: "mixed herbs", amount: 2, unit: "tbsp", image: "imgOfItem" },
      { name: "basil", amount: 1, unit: "tbsp", image: "imgOfItem" },
      {
        name: "vegetable stock paste",
        amount: 20,
        unit: "grams",
        image: "imgOfItem",
      },
      {
        name: "water for the sauce",
        amount: 600,
        unit: "ml",
        image: "imgOfItem",
      },
    ],
    addedIngredients: [
      /*Objects added by user, stored in localStorage */
    ],
    instructions: [
      "Prepare - Drain the smoked Tofoo and chop into 1cm cubes to resemble croutons. Pat dry with kitchen paper. Halve, peel and thinly slice the onion. Destalk the cavolo nero and discard the stems. Thinly slice the leaves widthways. Finely chop the chives",
      "Fry the Tofu - Heat a medium non-stick frying pan on high heat with a drizzle of oil. Once hot, add the tofu to the frying pan, season with salt and pepper. Fry until slightly crispy, 8-10 mins. Turn frequently to ensure it doesn't burn.",
      "Fry the Veg - While the tofu fries, heat a large saucepan on medium-high heat with a drizzle of oil. When hot, add the onion and sliced mushrooms, then fry to soften, stirring regularly, 4-5 mins. Season with salt and pepper.",
      "Make the Soup - Meanwhile, drain and rinse the lentils in a sieve. Add the chopped tomatoes, lentils, mixed herbs, veg stock paste and water (see pantry) to the pan. Stir to combine, then increase the heat and bring to the boil.",
      "Add the Cavolo Nero - Stir the cavolo nero into the lentil soup. Reduce the heat to medium and simmer to wilt the cavolo, 3-4 mins. Season to taste. Add a splash of water if it's too thick.",
      "Serve - Serve the tomato and lentil vegetable soup in deep bowls and top with the smoked Tofoo croutons. Sprinkle over the chives to finish.",
    ],
    prepTime: 9,
    cookTime: 17,
    servings: 4,
    nutritionalInfo: [
      /*Fetch this per ingredient */
    ],
  },
  {
    //seventeenth recipe:
    id: 17,
    week: 2,
    name: "creamy coconut gochujang lentils",
    image:
      "https://media.greenchef.com/w_750,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/6790ebb2777cba1605cb223d/step-56f25650.jpg",
    ingredients: [
      { name: "sushi rice", amount: 300, unit: "grams", image: "imgOfItem" },
      { name: "onions", amount: 2, unit: "whole", image: "imgOfItem" },
      { name: "garlic cloves", amount: 4, unit: "whole", image: "imgOfItem" },
      { name: "spring onions", amount: 2, unit: "whole", image: "imgOfItem" },
      { name: "lentils", amount: 2, unit: "cans", image: "imgOfItem" },
      {
        name: "desiccated coconut",
        amount: 30,
        unit: "grams",
        image: "imgOfItem",
      },
      {
        name: "gochujang paste",
        amount: 100,
        unit: "grams",
        image: "imgOfItem",
      },
      { name: "ginger puree", amount: 30, unit: "grams", image: "imgOfItem" },
      { name: "coconut milk", amount: 400, unit: "ml", image: "imgOfItem" },
      {
        name: "carrots (shredded)",
        amount: 120,
        unit: "grams",
        image: "imgOfItem",
      },
      {
        name: "red cabbage (shredded)",
        amount: 120,
        unit: "grams",
        image: "imgOfItem",
      },
      {
        name: "boiled water for the rice",
        amount: 600,
        unit: "ml",
        image: "imgOfItem",
      },
      {
        name: "water for the lentils",
        amount: 100,
        unit: "ml",
        image: "imgOfItem",
      },
      { name: "salt", amount: 0.5, unit: "tsp", image: "imgOfItem" },
    ],
    addedIngredients: [
      /*Objects added by user, stored in localStorage */
    ],
    instructions: [
      "Cook the Rice - Boil a half-full kettle. Thoroughly rinse the sushi rice under cold water in a sieve until it runs clear. Pour the boiled water (see pantry) into a medium saucepan, bring back to the boil on high heat. Stir in the sushi rice and turn the heat down to low. Cover with a tight-fitting lid and cook for 15 mins. Remove from the heat (still covered) and leave to the side for 5 mins or until ready to serve (the rice will continue to cook in its own steam).",
      "Prep the Veg - Meanwhile, halve, peel and thinly slice the onion. Peel and grate the garlic (or use a garlic press). Trim and thinly slice the spring onion. Drain and rinse the lentils in a sieve.",
      "Toast the Coconut - Next, heat a large frying pan on medium-high heat (no oil). Once hot, add the desiccated coconut and cook, stirring regularly, until lightly toasted, 2-3 mins. Watch it closely as it can burn easily. Set the toasted coconut aside for later.",
      "Fry the Onion - Reheat a drizzle of oil in the now empty pan on medium-high heat (no need to clean). When hot, add the onion to the pan and stir-fry until softened, 4-5 mins.",
      "Add the Lentils - Next, add the garlic, gochujang, ginger puree, coconut milk and water (see pantry). Stir through the salt (see pantry) and a generous grind of pepper. Mix well and bring to the boil. Turn down the heat to medium and stir through the lentils. Simmer for 3-4 mins. Whilst the lentils simmer, in a small bowl, combine the coleslaw mix with a drizzle of olive oil. Season with salt and pepper and stir to coat. Once the rice is cooked, stir the toasted coconut through the sticky rice.",
      "Serve - Share the sticky coconut rice between your bowls. Divide the creamy gochujang lentils alongside. Serve with the coleslaw & top with spring onions.",
    ],
    prepTime: 8,
    cookTime: 25,
    servings: 4,
    nutritionalInfo: [
      /*Fetch this per ingredient */
    ],
  },
  {
    //eighteenth recipe:
    id: 18,
    name: "sweet and spicy plant-based mince noodles",
    image:
      "https://media.greenchef.com/w_750,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/6790ebacf191f0a81ae72dac/step-0ae23650.jpg",
    ingredients: [
      {
        name: "tenderstem broccoli",
        amount: 160,
        unit: "grams",
        image: "imgOfItem",
      },
      { name: "pak choi", amount: 4, unit: "whole", image: "imgOfItem" },
      { name: "baby corn", amount: 120, unit: "grams", image: "imgOfItem" },
      { name: "limes", amount: 2, unit: "whole", image: "imgOfItem" },
      { name: "quorn mince", amount: 300, unit: "grams", image: "imgOfItem" },
      { name: "ketjap manis", amount: 50, unit: "grams", image: "imgOfItem" },
      {
        name: "gochujang paste",
        amount: 100,
        unit: "grams",
        image: "imgOfItem",
      },
      { name: "rice noodles", amount: 240, unit: "grams", image: "imgOfItem" },
      { name: "water", amount: 150, unit: "ml", image: "imgOfItem" },
      { name: "tomato puree", amount: 2, unit: "tbsp", image: "imgOfItem" },
      { name: "sugar", amount: 1, unit: "tsp", image: "imgOfItem" },
    ],
    addedIngredients: [
      /*Objects added by user, stored in localStorage */
    ],
    instructions: [
      "Prep the Veg - Cut the Tenderstem® broccoli into thirds. Trim the pak choi, then thinly slice widthways. Cut the baby corn into 1cm thick rounds. Juice half the lime and cut the other half into wedges.",
      "Cook the Mince - Heat a large frying pan on medium-high heat with a drizzle of oil. Once hot, add the plant-based mince to the pan and cook.",
      "Add the Veg - Next, add the broccoli to the pan. Cook until the plant-based mince has browned and broccoli starts to soften, 5-6 mins. Season with salt and pepper.",
      "Add the Sauce - Add the ketjap manis, gochujang paste, lime juice, baby corn, pak choi, the water, tomato ketchup and sugar (see pantry for all three). Stir to combine and cook until the sauce has reduced slightly, 2-3 mins.",
      "Add the Noodles - Add the rice noodles to the pan and toss to coat in the sauce. Cook until piping hot, 1-2 mins.",
      "Serve",
    ],
    prepTime: 6,
    cookTime: 15,
    servings: 4,
    nutritionalInfo: [
      /*Fetch this per ingredient */
    ],
  },
  {
    //nineteenth recipe:
    id: 19,
    name: "creamy lemon and asparagus gnocchi",
    image:
      "https://media.greenchef.com/w_750,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/677e86639bad0bb45fbd638e/step-8c5dba50.jpg",
    ingredients: [
      { name: "ciabatta rolls", amount: 2, unit: "whole", image: "imgOfItem" },
      { name: "garlic cloves", amount: 4, unit: "whole", image: "imgOfItem" },
      { name: "asparagus", amount: 300, unit: "grams", image: "imgOfItem" },
      { name: "lemons", amount: 2, unit: "whole", image: "imgOfItem" },
      { name: "gnocchi", amount: 600, unit: "grams", image: "imgOfItem" },
      { name: "mixed herbs", amount: 2, unit: "tbsp", image: "imgOfItem" },
      { name: "single soya", amount: 2, unit: "whole", image: "imgOfItem" },
      {
        name: "vegetable stock paste",
        amount: 30,
        unit: "grams",
        image: "imgOfItem",
      },
      { name: "baby spinach", amount: 200, unit: "grams", image: "imgOfItem" },
    ],
    addedIngredients: [
      /*Objects added by user, stored in localStorage */
    ],
    instructions: [
      "Prep the Veg - If you don't have a toaster, preheat your grill to high. Halve the ciabatta. Peel and grate half the garlic (or use a garlic press). Peel and halve the remaining garlic. Trim the bottom 2cm from the asparagus and discard. Cut the asparagus into thirds. Cut the lemon into wedges.",
      "Fry the Gnocchi - Heat a drizzle of oil in a medium frying pan on medium-high heat. Once hot, add the gnocchi and cook, turning regularly, for 5 mins. Add the asparagus and cook until the gnocchi is lightly golden and crispy, 5-6 mins. Set the gnocchi and asparagus aside, covered to keep warm.",
      "Add the Sauce - Let the pan cool slightly, then return to a medium heat with a drizzle of oil (no need to clean). Once hot, add the mixed herbs and the grated garlic, fry until fragrant, 30 secs. Add the single soya, vegetable stock paste and a squeeze of lemon juice to taste. Season with salt and pepper and stir to combine. Simmer for 3-4 mins.",
      "Add the Spinach - When there is 1-2 mins left, add the spinach to the pan a handful at a time until wilted and piping hot, 1-2 mins. Next, add the gnocchi and asparagus to the sauce, stir to coat and warm through.",
      "Make the Garlic Bread - Whilst the sauce simmers, toast the ciabatta halves in your toaster until golden. Rub the cut sides of the garlic over the ciabatta and drizzle with olive oil. Discard the remaining garlic. Cut the garlic bread diagonally into triangles.",
      "Serve",
    ],
    prepTime: 6,
    cookTime: 15,
    servings: 4,
    nutritionalInfo: [
      /*Fetch this per ingredient */
    ],
  },
  {
    //twentieth recipe:
    id: 20,
    name: "this isn't chicken fricassee inspired soup",
    image:
      "https://media.greenchef.com/w_750,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/676047d9f511d87afd23f730/step-12d1da50.jpg",
    ingredients: [
      { name: "onions", amount: 2, unit: "whole", image: "imgOfItem" },
      { name: "ciabatta rolls", amount: 4, unit: "whole", image: "imgOfItem" },
      { name: "garlic cloves", amount: 2, unit: "whole", image: "imgOfItem" },
      { name: "cider vinegar", amount: 30, unit: "ml", image: "imgOfItem" },
      {
        name: "plant based 'chicken' pieces",
        amount: 400,
        unit: "grams",
        image: "imgOfItem",
      },
      {
        name: "single soya plant-based alternative",
        amount: 2,
        unit: "whole",
        image: "imgOfItem",
      },
      {
        name: "wild mushroom paste",
        amount: 30,
        unit: "grams",
        image: "imgOfItem",
      },
      { name: "mixed herbs", amount: 2, unit: "tbsp", image: "imgOfItem" },
      { name: "peas", amount: 240, unit: "grams", image: "imgOfItem" },
      { name: "baby spinach", amount: 80, unit: "grams", image: "imgOfItem" },
      { name: "water", amount: 500, unit: "ml", image: "imgOfItem" },
    ],
    addedIngredients: [
      /*Objects added by user, stored in localStorage */
    ],
    instructions: [
      "Prep - If you don't have a toaster, preheat your grill to high. Slice the onions. Halve the ciabatta. Peel and halve the garlic.",
      "Heat a drizzle of oil in a large saucepan on medium-high heat. Once hot, add the onion and cider vinegar, season with salt and pepper. Cook the onion until softened.",
      "Fry the 'Chicken' - Meanwhile, heat a separate medium frying pan on medium heat with a drizzle of oil. When hot, add the 'Chicken' and pan-fry until golden brown, 4-6 mins. Season with salt and pepper. Once cooked, remove from the heat and cover to keep warm.",
      "Make the Sauce - Once the onion is cooked, add the single soya, wild mushroom paste, mixed herbs and water (see pantry). Season with salt and a generous grind of pepper. Simmer for 2-3 mins.",
      "Whilst the soup simmers, toast the ciabatta in your toaster until golden. If you don't have a toaster, grill until golden, 2-3 mins. Rub the cut sides of the garlic over the ciabatta and drizzle with olive oil. Discard the remaining garlic. Cut the garlic bread diagonally into triangles.",
      "Add the Veg - Add the peas and the 'Chicken' to the soup, stir to warm through and combine, 1 min.",
      "Add the Spinach - Add the spinach to the soup pan a handful at a time until wilted and piping hot, 1-2 mins. Season with salt and pepper and stir to combine.",
      "Serve",
    ],
    prepTime: 4,
    cookTime: 15,
    servings: 4,
    nutritionalInfo: [
      /*Fetch this per ingredient */
    ],
  },
  {
    //twenty-first recipe:
    id: 21,
    name: "spicy vegetable gyoza ramen",
    image:
      "https://media.greenchef.com/w_750,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/676047d0afc243b64a9f7ed8/step-2a301350.jpg",
    ingredients: [
      { name: "spring onions", amount: 4, unit: "whole", image: "imgOfItem" },
      { name: "radishes", amount: 200, unit: "grams", image: "imgOfItem" },
      { name: "asparagus", amount: 300, unit: "grams", image: "imgOfItem" },
      {
        name: "tenderstem broccoli",
        amount: 160,
        unit: "grams",
        image: "imgOfItem",
      },
      { name: "chilli flakes", amount: 2, unit: "pinches", image: "imgOfItem" },
      {
        name: "vegetable gyozas",
        amount: 20,
        unit: "whole",
        image: "imgOfItem",
      },
      {
        name: "asian broth paste",
        amount: 50,
        unit: "grams",
        image: "imgOfItem",
      },
      { name: "rice noodles", amount: 440, unit: "grams", image: "imgOfItem" },
      { name: "sambal paste", amount: 30, unit: "grams", image: "imgOfItem" },
      {
        name: "water for the broth",
        amount: 800,
        unit: "ml",
        image: "imgOfItem",
      },
    ],
    addedIngredients: [
      /*Objects added by user, stored in localStorage */
    ],
    instructions: [
      "Prep the Veg - Boil a full kettle. Thinly slice the spring onions. Trim and quarter the radishes.",
      "Fry the Veg - Heat a drizzle of oil in a large saucepan on high heat. When hot, add the asparagus, broccoli and radishes to the pan. Season with salt and pepper and fry, stirring occasionally, until browned, 5-6 mins.",
      "Add the chilli flakes, stir to coat the vegetables, 30 secs. Remove the pan from the heat and set aside to keep warm.",
      "Cook the Gyozas- Heat a drizzle of oil in a large frying pan on medium-high heat. When hot, add the gyozas and fry until golden on the bottom, 2-3 mins. Don't move the gyoza around whilst frying to avoid tearing. Once golden, remove from the heat, then add 1 tbsp water to the pan. Return to medium-low heat and immediately cover with a lid or some foil. Cook until the gyozas are piping hot, 3-4 mins. Remove from the heat.",
      "Make the Broth - Whilst the gyozas cook, add the boiled water for the broth (see pantry) to the veg saucepan along with the Asian broth paste. Bring to a boil on medium-high heat, stirring regularly, then reduce the heat to a simmer.",
      "Add the Noodles - Add the rice noodles to the broth and simmer for 1-2 mins, until the noodles have warmed through.",
      "Serve",
    ],
    prepTime: 3,
    cookTime: 16,
    servings: 4,
    nutritionalInfo: [
      /*Fetch this per ingredient */
    ],
  },
  {
    //twenty-second recipe:
    id: 22,
    name: "sticky teriyaki fried tofu on kimchi fried rice",
    image:
      "https://media.greenchef.com/w_750,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/6759b7a14f0b0d39dcbec79e/step-96b7f250.jpg",
    ingredients: [
      {
        name: "brown basmati rice",
        amount: 250,
        unit: "grams",
        image: "imgOfItem",
      },
      { name: "bell peppers", amount: 2, unit: "whole", image: "imgOfItem" },
      { name: "broccolies", amount: 2, unit: "whole", image: "imgOfItem" },
      { name: "garlic cloves", amount: 4, unit: "whole", image: "imgOfItem" },
      { name: "firm tofu", amount: 560, unit: "grams", image: "imgOfItem" },
      {
        name: "teriyaki sauce",
        amount: 120,
        unit: "grams",
        image: "imgOfItem",
      },
      { name: "soy sauce", amount: 30, unit: "ml", image: "imgOfItem" },
      { name: "vegan kimchi", amount: 2, unit: "sachets", image: "imgOfItem" },
      {
        name: "boiled water for the rice",
        amount: 750,
        unit: "ml",
        image: "imgOfItem",
      },
    ],
    addedIngredients: [
      /*Objects added by user, stored in localStorage */
    ],
    instructions: [
      "Cook the Rice - Boil a full kettle. Rinse the brown rice in a sieve. Pour the boiled water into a medium saucepan with 1/4 tsp salt and bring back to the boil on high heat. Add the brown rice, then reduce the heat to low. Cover with a tight-fitting lid and cook for 20-25 mins.",
      "Prep the Veg - Meanwhile, halve the bell pepper and discard the core and seeds. Chop into 2cm chunks. Trim the broccoli stem, then cut into florets, halving any larger ones. Halve the stem lengthways, then slice widthways. Peel and grate the garlic (or use a garlic press).",
      "Cook the Tofu - Drain the tofu and chop into 2cm cubes. Pat dry with kitchen paper. When the rice has 10-15 mins remaining, heat a large non-stick frying pan on high heat with a drizzle of oil. Once hot, add the tofu to the frying pan. Fry until slightly crispy, 8-10 mins. Turn frequently to ensure it doesn't burn. Season with salt and pepper. Remove from the heat, add the teriyaki and turn to coat. Transfer to a medium bowl set aside, covered to keep warm.",
      "Cook the Broccoli - When the rice has 5 mins remaining, turn the heat up to high, add the broccoli and cook until just tender, 3-5 mins. Top up the water if needed.",
      "Fry the Rice - Place the frying pan used for the tofu back on high heat with a drizzle of oil (no need to clean). Once hot, add the pepper chunks and fry for 2-3 mins. Add the garlic and fry until fragrant, 30 secs. When the broccoli and rice have finished cooking, drain in a sieve, let steam for 2 mins, then add to the pepper pan. Stir through the soy sauce, 1 min. Season with pepper. Remove from the heat and stir through half the kimchi.",
      "Serve - Share the kimchi fried rice between your bowls. Top with sticky teriyaki tofu and the remaining kimchi.",
    ],
    prepTime: 8,
    cookTime: 25,
    servings: 4,
    nutritionalInfo: [
      /*Fetch this per ingredient */
    ],
  },
  {
    //twenty-third recipe:
    id: 23,
    week: 1,
    name: "spiced tofu sambal laksa",
    image:
      "https://media.greenchef.com/w_750,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/674747ad989edba91be32335/step-84286b50.jpg",
    ingredients: [
      { name: "pak choi", amount: 4, unit: "whole", image: "imgOfItem" },
      { name: "limes", amount: 2, unit: "whole", image: "imgOfItem" },
      { name: "firm tofu", amount: 560, unit: "grams", image: "imgOfItem" },
      {
        name: "thai style spice blend",
        amount: 2,
        unit: "tbsp",
        image: "imgOfItem",
      },
      {
        name: "red thai style paste",
        amount: 100,
        unit: "grams",
        image: "imgOfItem",
      },
      { name: "ginger puree", amount: 30, unit: "grams", image: "imgOfItem" },
      { name: "coconut milk", amount: 400, unit: "ml", image: "imgOfItem" },
      {
        name: "vegetable stock paste",
        amount: 20,
        unit: "grams",
        image: "imgOfItem",
      },
      {
        name: "young pea pods/sugar snaps",
        amount: 160,
        unit: "grams",
        image: "imgOfItem",
      },
      { name: "udon noodles", amount: 400, unit: "grams", image: "imgOfItem" },
      { name: "sambal paste", amount: 30, unit: "grams", image: "imgOfItem" },
      { name: "water", amount: 500, unit: "ml", image: "imgOfItem" },
    ],
    addedIngredients: [
      /*Objects added by user, stored in localStorage */
    ],
    instructions: [
      "Prepare - Trim the pak choi, then thinly slice widthways.",
      "Cook the Tofu - Drain the Tofoo and cut into 2cm cubes. Pat dry with kitchen paper. Heat a large non-stick frying pan on high heat with a drizzle of oil. Once hot, add the tofu to the frying pan. Fry until slightly crispy, 8-10 mins. In the last min, add the Thai style spice blend. Turn frequently to ensure it doesn't burn. Season with salt and pepper. Set aside in a medium bowl, covered to keep warm.",
      "Start the Curry - Heat the pan used to cook the tofu on medium-high heat with a drizzle of oil (no need to clean). Add the red Thai style paste and ginger puree. Stir and cook until fragrant, 30 secs. Pour the coconut milk, vegetable stock paste and the water (see pantry) into the pan. Bring to the boil, stirring, then reduce the heat to medium, add the young pea pods and simmer until thickened, 3-4 mins.",
      "Meanwhile, boil a full kettle. Pour the boiled water into a large saucepan on medium-high and cook the udon noodles until warmed through, 1-2 mins.",
      "Cook the Pak Choi - Add the pak choi to the laksa pan, then simmer, stirring occasionally, until cooked, 1-2 mins.",
      "Add Flavour - Once cooked, drain the noodles in a sieve. Remove your laksa from the heat and add the udon noodles. Add a splash of water if it looks dry. Squeeze in a wedge of lime juice and season with salt and pepper.",
      "Serve - Ladle the laksa into deep bowls and drizzle over the sambal paste. Top with the spiced Tofoo slices and garnish with a lime wedge.",
    ],
    prepTime: 5,
    cookTime: 16,
    servings: 4,
    nutritionalInfo: [
      /*Fetch this per ingredient */
    ],
  },
  {
    //twenty-fourth recipe:
    id: 24,
    name: "tofu tikka tacos",
    image:
      "https://media.greenchef.com/w_750,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/6750302bd4acb9b7600a9972/step-1b08b150.jpg",
    ingredients: [
      { name: "firm tofu", amount: 280, unit: "grams", image: "imgOfItem" },
      { name: "natural yogurt", amount: 150, unit: "ml", image: "imgOfItem" },
      { name: "garlic granules", amount: 1, unit: "tsp", image: "imgOfItem" },
      { name: "ground cumin", amount: 2, unit: "tsp", image: "imgOfItem" },
      { name: "ground coriander", amount: 2, unit: "tsp", image: "imgOfItem" },
      { name: "smoked paprika", amount: 2, unit: "tsp", image: "imgOfItem" },
      { name: "garam masala", amount: 2, unit: "tsp", image: "imgOfItem" },
      { name: "ground turmeric", amount: 1, unit: "tsp", image: "imgOfItem" },
      { name: "chili powder", amount: 1, unit: "tsp", image: "imgOfItem" },
      { name: "lime", amount: 1, unit: "whole", image: "imgOfItem" },
      { name: "corn tortillas", amount: 8, unit: "whole", image: "imgOfItem" },
      { name: "iceberg lettuce", amount: 1, unit: "whole", image: "imgOfItem" },
      {
        name: "cherry tomatoes",
        amount: 150,
        unit: "grams",
        image: "imgOfItem",
      },
      { name: "cucumber", amount: 1, unit: "whole", image: "imgOfItem" },
      {
        name: "fresh coriander",
        amount: 20,
        unit: "grams",
        image: "imgOfItem",
      },
      { name: "lemon", amount: 1, unit: "whole", image: "imgOfItem" },
    ],
    addedIngredients: [
      /*Objects added by user, stored in localStorage */
    ],
    instructions: [
      "Drain tofu, place in a bowl with spices & yogurt, marinate for minimum 15 minutes",
      "Heat pan with oil, cook marinated tofu on medium heat for 15 minutes, stirring occasionally",
      "Warm tortillas in microwave for 20 seconds or in pan for 20 seconds per side",
      "Spread lime yogurt on tortilla, top with lettuce, tomatoes, cucumber, tofu tikka, garnish with coriander & lemon wedge",
    ],
    prepTime: 20,
    cookTime: 16,
    servings: 4,
    nutritionalInfo: [
      /*Fetch this per ingredient */
    ],
  },
  {
    //twenty-fifth recipe:
    id: 25,
    week: 1,
    name: "curried purple carrot dal",
    image:
      "https://media.greenchef.com/w_750,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/673480e4df7bce3ee2c2907b/step-c587aa50.jpg",
    ingredients: [
      { name: "carrots", amount: 2, unit: "whole", image: "imgOfItem" },
      {
        name: "North Indian style spice mix",
        amount: 2,
        unit: "tbsp",
        image: "imgOfItem",
      },
      { name: "lentils", amount: 2, unit: "cans", image: "imgOfItem" },
      { name: "tomato puree", amount: 60, unit: "g", image: "imgOfItem" },
      { name: "coconut milk", amount: 400, unit: "ml", image: "imgOfItem" },
      {
        name: "vegetable stock paste",
        amount: 20,
        unit: "g",
        image: "imgOfItem",
      },
      { name: "coriander", amount: 1, unit: "whole", image: "imgOfItem" },
      {
        name: "natural coconut milk yoghurt alternative",
        amount: 160,
        unit: "g",
        image: "imgOfItem",
      },
      {
        name: "steamed brown basmati rice",
        amount: 2,
        unit: "whole",
        image: "imgOfItem",
      },
      { name: "water", amount: 300, unit: "ml", image: "imgOfItem" },
      { name: "salt", amount: 0.25, unit: "tsp", image: "imgOfItem" },
      {
        name: "water for the yoghurt",
        amount: 1,
        unit: "tbsp",
        image: "imgOfItem",
      },
    ],
    addedIngredients: [
      /*Objects added by user, stored in localStorage */
    ],
    instructions: [
      "Prep the Carrots - Preheat your oven to 220°C/200°C fan/gas mark 7. Trim the purple carrots, then halve lengthways (no need to peel). Chop into roughly 1cm wide, 5cm long batons.",
      "Roast the Carrots - Put the carrots onto a large baking tray. Drizzle with oil, season with salt and pepper, sprinkle over half the North Indian style spice mix, then toss to coat. Spread out in a single layer. When the oven is hot, roast on the top shelf until tender, 20-25 mins. Turn halfway through cooking. Drain and rinse the lentils in a sieve.",
      "Start the Dal - Meanwhile, heat a drizzle of oil in a large saucepan on medium heat. Once hot, add the remaining North Indian style spice mix and the tomato puree. Stir together and cook for 1 min.",
      "Add the coconut milk, vegetable stock paste and the water (see pantry). Stir through the salt (see pantry) and a generous grind of pepper. Mix well and bring to the boil. Turn down the heat to medium and stir through the lentils. Place a lid on the pan and simmer for 15-20 mins.",
      "Prep the Coriander - Roughly chop the coriander (stalks and all). In a small bowl, mix half the coriander through the coconut milk yoghurt and water for the yoghurt (see pantry) until combined. Set aside.",
      "Cook the Rice - When the carrots have 2-3 mins remaining, cook the rice according to pack instructions.",
      "Serve - Share the brown basmati rice between your bowls and stir through the remaining coriander. Serve the dal alongside the rice and swirl through the coriander yoghurt. Top with the spiced purple carrots.",
    ],
    prepTime: 10,
    cookTime: 45,
    servings: 4,
    nutritionalInfo: [
      /*Fetch this per ingredient */
    ],
  },
  {
    //twenty-sixth recipe:
    id: 26,
    name: "peri peri spiced tofu",
    image:
      "https://media.greenchef.com/w_750,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/6718d0e5d68888376c8d1e8a/step-51eb5350.jpg",
    ingredients: [
      { name: "smoked tofu", amount: 360, unit: "g", image: "imgOfItem" },
      { name: "cornflour", amount: 20, unit: "g", image: "imgOfItem" },
      {
        name: "peri peri seasoning",
        amount: 2,
        unit: "tbsp",
        image: "imgOfItem",
      },
      { name: "bell peppers", amount: 2, unit: "whole", image: "imgOfItem" },
      {
        name: "steamed brown basmati rice",
        amount: 2,
        unit: "whole",
        image: "imgOfItem",
      },
      { name: "peas", amount: 240, unit: "g", image: "imgOfItem" },
      {
        name: "sun-dried tomato paste",
        amount: 50,
        unit: "g",
        image: "imgOfItem",
      },
      { name: "smoked paprika", amount: 2, unit: "tbsp", image: "imgOfItem" },
      { name: "hot sauce", amount: 100, unit: "g", image: "imgOfItem" },
    ],
    addedIngredients: [
      /*Objects added by user, stored in localStorage */
    ],
    instructions: [
      "Prep the Tofu - Drain the tofu and chop into 2cm cubes. Thoroughly pat dry with kitchen paper. Add the tofu to a medium bowl with the cornflour. Season with salt and pepper, then toss to coat. Heat a drizzle of oil in a large frying pan on high heat. Once hot, fry the tofu until slightly crispy, 8-10 mins. Turn frequently to ensure it doesn't burn. In the last 2 mins, add the peri peri seasoning to the pan, toss to coat and disperse the flavour.",
      "Prep the Veg - Meanwhile, halve the bell pepper and discard the core and seeds. Chop into 2cm chunks.",
      "Fry the Veg - Heat a large frying pan on high heat with a drizzle of oil. Once hot, add the pepper chunks and sliced mushrooms, fry until just soft, 5-6 mins. Continue to stir while they cook. Season with salt and pepper.",
      "Add the Rice - When the veg has 3 mins remaining, turn the heat down to medium-high, then add the rice, peas, sun-dried tomato paste and paprika. Stir to combine and warm through.",
      "Serve - Top the paprika spiced rice with the peri peri tofu. Drizzle over the hot sauce.",
    ],
    prepTime: 6,
    cookTime: 13,
    servings: 4,
    nutritionalInfo: [
      /*Fetch this per ingredient */
    ],
  },
  {
    //twenty-seventh recipe:
    id: 27,
    name: "basa on a bed of creamy pesto lentils",
    image: "",
    ingredients: [
      { name: "broccoli", amount: 2, unit: "whole", image: "imgOfItem" },
      { name: "garlic cloves", amount: 2, unit: "cloves", image: "imgOfItem" },
      { name: "lentils", amount: 2, unit: "cans", image: "imgOfItem" },
      { name: "basa fillets", amount: 8, unit: "pieces", image: "imgOfItem" },
      { name: "pesto", amount: 64, unit: "g", image: "imgOfItem" },
      { name: "creme fraiche", amount: 300, unit: "g", image: "imgOfItem" },
      { name: "mixed herbs", amount: 2, unit: "tbsp", image: "imgOfItem" },
      { name: "water", amount: 50, unit: "ml", image: "imgOfItem" },
    ],
    addedIngredients: [
      /*Objects added by user, stored in localStorage */
    ],
    instructions: [
      "Prep the Veg - Preheat your oven to 220°C/200°C fan/gas mark 7. Cut the broccoli into florets, halving any large ones. Peel and grate the garlic (or use a garlic press). Drain and rinse the lentils in a sieve. Place the broccoli onto one side of a large, lined, baking tray. Drizzle with oil, season with salt and pepper, then toss to coat. Spread out in a single layer. Bake on the middle shelf for 2-3 mins.",
      "Prep the Fish - After 2-3 mins, remove the broccoli from the oven and lay the fish on the other side of the lined baking tray. Season with salt and pepper.",
      "Bake the Fish - Bake on the middle shelf for 10-12 mins until the broccoli is tender and crispy and the fish is cooked.",
      "Start the Lentils - Meanwhile, heat a medium saucepan on medium heat with a drizzle of oil. Once hot, add the lentils, pesto, creme fraiche, garlic, mixed herbs and water (see pantry).",
      "Simmer the Lentils - Stir to combine and warm through, 3-4 mins. Season with salt and pepper.",
      "Serve - Divide the creamy pesto lentils between your plates, then top with a sea bream fillet. Serve the roasted broccoli alongside.",
    ],
    prepTime: 4,
    cookTime: 15,
    servings: 4,
    nutritionalInfo: [
      /*Fetch this per ingredient */
    ],
  },
  {
    //twenty-eighth recipe:
    id: 28,
    name: "black bean chilli",
    image: "",
    ingredients: [
      { name: "red onions", amount: 2, unit: "whole", image: "imgOfItem" },
      { name: "bell peppers", amount: 2, unit: "whole", image: "imgOfItem" },
      { name: "oranges", amount: 2, unit: "whole", image: "imgOfItem" },
      { name: "garlic cloves", amount: 4, unit: "cloves", image: "imgOfItem" },
      { name: "black beans", amount: 2, unit: "cans", image: "imgOfItem" },
      {
        name: "smoky base paste",
        amount: 2,
        unit: "sachets",
        image: "imgOfItem",
      },
      {
        name: "passata di pomodoro",
        amount: 2,
        unit: "whole",
        image: "imgOfItem",
      },
      {
        name: "central american style spice mix",
        amount: 2,
        unit: "sachets",
        image: "imgOfItem",
      },
      { name: "medium tomatoes", amount: 2, unit: "whole", image: "imgOfItem" },
      { name: "coriander", amount: 1, unit: "whole", image: "imgOfItem" },
      {
        name: "steamed brown basmati rice",
        amount: 2,
        unit: "whole",
        image: "imgOfItem",
      },
      {
        name: "greek style salad cheese",
        amount: 100,
        unit: "g",
        image: "imgOfItem",
      },
    ],
    addedIngredients: [
      /*Objects added by user, stored in localStorage */
    ],
    instructions: [
      "Prep the veg - Halve, peel and dice the red onion. Place a large saucepan on medium-high heat with a drizzle of oil. When hot, add the onion and fry until softened, 5-6 mins.",
      "Meanwhile, halve the bell pepper and discard the core and seeds. Chop into 2cm chunks. Juice half the orange. Peel and cut the other half into 1cm chunks. Peel and grate the garlic (or use a garlic press). Drain and rinse the black beans in a sieve.",
      "Make the Sauce - Add the black beans to the onion and roughly mash half of them using a potato masher or the back of a fork. Reduce the heat to medium. Add the pepper chunks, orange juice, smoky base paste, garlic, passata, Central American style spice mix and water (see pantry). Stir to combine and simmer until thickened, 4-5 mins.",
      "Prep the Salsa - Meanwhile, cut the tomato into 1cm chunks. Roughly chop the coriander (stalks and all).",
      "Make the Salsa - Combine the tomato, orange chunks and half the coriander in a small bowl. Add the olive oil for the salsa (see pantry) and stir to coat. Season with salt and pepper.",
      "Cook the Rice - Cook the rice according to pack instructions. Season the black beans with salt and pepper to taste.",
      "Serve - Share the rice between your bowls. Serve the Brazilian style beans alongside. Sprinkle on the remaining coriander and crumble over the Greek style salad cheese. Top the beans with the orange and tomato salsa.",
    ],
    prepTime: 8,
    cookTime: 11,
    servings: 4,
    nutritionalInfo: [
      /*Fetch this per ingredient */
    ],
  },
  {
    //twenty-ninth recipe:
    id: 29,
    name: "coconut red lentil dal",
    image: "",
    ingredients: [
      { name: "green peppers", amount: 2, unit: "whole", image: "imgOfItem" },
      { name: "red chillies", amount: 2, unit: "whole", image: "imgOfItem" },
      { name: "onions", amount: 2, unit: "whole", image: "imgOfItem" },
      { name: "garlic cloves", amount: 2, unit: "cloves", image: "imgOfItem" },
      { name: "ginger puree", amount: 30, unit: "g", image: "imgOfItem" },
      { name: "korma curry paste", amount: 100, unit: "g", image: "imgOfItem" },
      { name: "coconut milk", amount: 400, unit: "ml", image: "imgOfItem" },
      { name: "mango chutney", amount: 80, unit: "g", image: "imgOfItem" },
      { name: "red split lentils", amount: 200, unit: "g", image: "imgOfItem" },
      { name: "peas", amount: 240, unit: "g", image: "imgOfItem" },
      {
        name: "steamed brown basmati rice",
        amount: 2,
        unit: "whole",
        image: "imgOfItem",
      },
      { name: "water", amount: 500, unit: "ml", image: "imgOfItem" },
      { name: "salt", amount: 0.5, unit: "tsp", image: "imgOfItem" },
    ],
    addedIngredients: [
      /*Objects added by user, stored in localStorage */
    ],
    instructions: [
      "Prep the Veg - Halve the bell pepper and discard the core and seeds. Slice into thin strips. Halve the green chilli lengthways, deseed, then thinly slice. Halve, peel and dice the onion. Peel and grate the garlic (or use a garlic press).",
      "Cook the Veg - Heat a drizzle of oil in a deep saucepan on medium-high heat. Once, add the onion and pepper strips to the pan and stir-fry until softened, 4-5 mins. Season with salt and pepper.",
      "Add the Flavour - When the onion has 1 min remaining, add the garlic, ginger puree, korma curry paste and half the chilli to the saucepan (add less if you'd prefer it milder). Stir-fry until fragrant, 1 min.",
      "Add the Sauce - Next, add the coconut milk, mango chutney and water (see pantry), stir to combine. Add the red lentils to your saucepan and season with salt (see pantry) and pepper. Bring to a simmer, cover with a lid and cook until the lentils are soft, 20-25 mins. Stir occasionally to make sure they aren't sticking to the bottom of the pan and add a splash of water if it gets too dry.",
      "Cook the Rice - When the dal has 4 mins remaining, cook the rice according to pack instructions. In the last minute, stir the peas through the dal to warm through.",
      "Serve - Divide the coconut red lentil dal between your bowls. Serve the basmati rice alongside.",
    ],
    prepTime: 6,
    cookTime: 31,
    servings: 4,
    nutritionalInfo: [
      /*Fetch this per ingredient */
    ],
  },
  {
    //thirtieth recipe:
    id: 30,
    name: "spicy zhoug sea bream",
    image: "",
    ingredients: [
      { name: "coriander", amount: 2, unit: "whole", image: "imgOfItem" },
      { name: "aubergines", amount: 2, unit: "whole", image: "imgOfItem" },
      {
        name: "chermoula spice mix",
        amount: 2,
        unit: "sachets",
        image: "imgOfItem",
      },
      { name: "basmati rice", amount: 200, unit: "g", image: "imgOfItem" },
      { name: "lemons", amount: 2, unit: "whole", image: "imgOfItem" },
      { name: "fish fillets", amount: 8, unit: "pieces", image: "imgOfItem" },
      {
        name: "tenderstem broccoli",
        amount: 160,
        unit: "g",
        image: "imgOfItem",
      },
      { name: "zhoug style paste", amount: 90, unit: "g", image: "imgOfItem" },
      {
        name: "water for the rice",
        amount: 400,
        unit: "ml",
        image: "imgOfItem",
      },
      { name: "honey", amount: 2, unit: "tsp", image: "imgOfItem" },
      { name: "water", amount: 2, unit: "tsp", image: "imgOfItem" },
    ],
    addedIngredients: [
      /*Objects added by user, stored in localStorage */
    ],
    instructions: [
      "Prep the Veg - Preheat your oven to 220°C/200°C fan/gas mark 7. Boil a half-full kettle. Roughly chop the coriander (stalks and all). Trim the aubergine, then cut into roughly 2cm pieces.",
      "Roast the Aubergine - Place the aubergine onto a baking tray. Drizzle with oil and sprinkle over the chermoula spice mix. Season with salt and pepper, then toss to coat. Spread out in a single layer. When the oven is hot, roast the aubergine on the top shelf until soft and golden, 25-30 mins. Turn halfway through.",
      "Cook the Rice - Pour the boiled water for the rice (see pantry) into a medium saucepan with 1/4 tsp salt and bring back to the boil on high heat. Add the rice, then reduce the heat to low. Cover with a tight-fitting lid and cook for 10 mins, then remove from the heat, still covered, and leave to the side to steam until ready to serve.",
      "Zest and juice half the lemon. Cut the other half into wedges.",
      "Cook the fish and Tenderstem® - Lay the Tenderstem® and fish on a lined baking tray, skin-side up. Drizzle with oil and season with salt and pepper. Sprinkle the lemon zest over the fish. Bake on the middle shelf for 10-12 mins, until the fish is cooked and broccoli is tender.",
      "Flavour the Rice - Once cooked, stir the lemon juice, half the coriander and half the zhoug through the rice. Season with salt and pepper. In a small bowl, combine the remaining zhoug with the honey and water (see pantry for both).",
      "Serve - Divide the rice and spiced aubergine between your bowls. Serve the sea bream and Tenderstem® on top of the rice. Drizzle the remaining zhoug over the fish. Finish with the remaining coriander and a lemon wedge.",
    ],
    prepTime: 5,
    cookTime: 30,
    servings: 4,
    nutritionalInfo: [
      /*Fetch this per ingredient */
    ],
  },
  {
    //thirty-first recipe:
    id: 31,
    week: 1,
    name: "sesame coated tofu",
    image:
      "https://media.greenchef.com/w_750,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/67c886378f112f54d1d768cf/step-2635e250.jpg",
    ingredients: [
      { name: "bell peppers", amount: 2, unit: "whole", image: "imgOfItem" },
      {
        name: "tenderstem broccoli",
        amount: 160,
        unit: "g",
        image: "imgOfItem",
      },
      { name: "garlic cloves", amount: 4, unit: "cloves", image: "imgOfItem" },
      { name: "limes", amount: 2, unit: "whole", image: "imgOfItem" },
      { name: "firm tofu", amount: 560, unit: "g", image: "imgOfItem" },
      { name: "cornflour", amount: 20, unit: "g", image: "imgOfItem" },
      { name: "ketjap manis", amount: 100, unit: "g", image: "imgOfItem" },
      {
        name: "roasted white sesame seeds",
        amount: 20,
        unit: "g",
        image: "imgOfItem",
      },
      { name: "rice noodles", amount: 440, unit: "g", image: "imgOfItem" },
      { name: "soy sauce", amount: 50, unit: "ml", image: "imgOfItem" },
      { name: "sambal paste", amount: 30, unit: "g", image: "imgOfItem" },
      { name: "sesame oil", amount: 20, unit: "ml", image: "imgOfItem" },
    ],
    addedIngredients: [
      /*Objects added by user, stored in localStorage */
    ],
    instructions: [
      "Prepare - Halve the bell pepper and discard the core and seeds. Slice into thin strips. Cut the Tenderstem® broccoli into thirds. Peel and grate the garlic (or use a garlic press). Juice half the lime, then cut the reamining half into wedges.",
      "Cook the Tofu - Drain the tofu and cut into 2cm cubes. Pat dry with kitchen paper. In a large bowl, coat the tofu with the cornflour. Heat a large non-stick frying pan on high heat with a drizzle of oil. Once hot, fry the tofu until crispy, 8-10 mins. Turn frequently to ensure it doesn't burn.",
      "Add the Sesame - For the last min, pour half the ketjap manis over the tofu and toss to coat. Season with salt and pepper, then sprinkle over the sesame seeds to create a crust. Remove from the pan and cover to keep warm.",
      "Cook the Veg - Put the pan used for the tofu back on medium-high heat with a drizzle of oil. Once hot, add the pepper and broccoli. Season with salt and pepper. Fry, stirring occasionally, 3-4 mins.",
      "Add the Noodles - Next, add the garlic to the pan and fry for 1 min. Add the rice noodles to the pan. Pour over the soy sauce, sambal, lime juice, sesame oil and remaining ketjap manis. Gently toss to coat the noodles and veg. Simmer until piping hot, 1-2 mins.",
      "Serve - Share the spicy sambal noodles and veg between your bowls. Top with the sesame-coated tofu. Garnish with a lime wedge.",
    ],
    prepTime: 6,
    cookTime: 18,
    servings: 4,
    nutritionalInfo: [
      /*Fetch this per ingredient */
    ],
  },
  {
    //thirty-second recipe:
    id: 32,
    name: "shredded hoison smoked tofu bao buns",
    image:
      "https://media.greenchef.com/w_750,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/66c5fa2d148d730f514f80fa/step-78101850.jpg",
    ingredients: [
      { name: "potatoes", amount: 900, unit: "g", image: "imgOfItem" },
      { name: "smoked tofu", amount: 360, unit: "g", image: "imgOfItem" },
      { name: "hoisin sauce", amount: 128, unit: "g", image: "imgOfItem" },
      { name: "ginger puree", amount: 30, unit: "g", image: "imgOfItem" },
      { name: "ketjap manis", amount: 50, unit: "g", image: "imgOfItem" },
      { name: "spring onions", amount: 2, unit: "whole", image: "imgOfItem" },
      { name: "shredded carrot", amount: 120, unit: "g", image: "imgOfItem" },
      {
        name: "shredded red cabbage",
        amount: 120,
        unit: "g",
        image: "imgOfItem",
      },
      {
        name: "bao buns or small wraps",
        amount: 4,
        unit: "whole",
        image: "imgOfItem",
      },
    ],
    addedIngredients: [
      /*Objects added by user, stored in localStorage */
    ],
    instructions: [
      "Make the Wedges - Preheat your oven to 220°C/200°C fan/gas mark 7.",
      "Cut the potatoes into 2cm wide wedges (no need to peel). Spread out onto a large baking tray and drizzle in oil. Use two trays if necessary. Season with salt and pepper and toss to coat. When the oven is hot, roast on the top shelf until golden, 25-30 mins. Turning halfway through cooking.",
      "Prep the Tofu - Drain the smoked tofu and pat dry with kitchen paper. Coarsely grate the tofu. In a medium bowl, combine the grated tofu, half the hoisin sauce, the ginger puree and ketjap manis. Toss to coat and set aside to marinate.",
      "Prepare - Meanwhile, trim the spring onions and thinly slice on an angle. In another medium bowl, shred and combine the carrot and cabbage. Season with salt and pepper and mix to coat.",
      "Cook the Tofu - Add the shredded tofu to a lined baking tray. Drizzle with oil, season with salt and pepper and toss to coat. When the wedges have 16-18 mins remaining, bake the tofu on the middle shelf until golden, 16-18 mins. Toss halfway through cooking.",
      "Warm the Bao Buns - When the tofu has 3-4 mins remaining, place the bao buns on a plate, sprinkle with a little water and microwave, 800W: 1 min 10 secs / 900W: 50 secs / 1000W: 40 secs. Once cooked, spread the remaining hoisin sauce on the base of the bao buns.",
      "Serve - Share the bao buns between your plates and fill with the shredded hoisin smoked tofu and spring onions. Serve the wedges and sesame slaw alongside.",
    ],
    prepTime: 9,
    cookTime: 30,
    servings: 4,
    nutritionalInfo: [
      /*Fetch this per ingredient */
    ],
  },
  {
    //thirty-third recipe:
    id: 33,
    name: "baja inspired crispy basa tacos",
    image: "",
    ingredients: [
      { name: "basa fillets", amount: 4, unit: "whole", image: "imgOfItem" },
      { name: "green peppers", amount: 2, unit: "whole", image: "imgOfItem" },
      {
        name: "mexican style spice mix",
        amount: 2,
        unit: "sachets",
        image: "imgOfItem",
      },
      { name: "breadcrumbs", amount: 50, unit: "g", image: "imgOfItem" },
      { name: "medium tomatoes", amount: 4, unit: "whole", image: "imgOfItem" },
      { name: "spring onions", amount: 2, unit: "whole", image: "imgOfItem" },
      { name: "coriander", amount: 2, unit: "whole", image: "imgOfItem" },
      { name: "soured cream", amount: 150, unit: "g", image: "imgOfItem" },
      { name: "chipotle paste", amount: 40, unit: "g", image: "imgOfItem" },
      {
        name: "plain taco tortillas",
        amount: 12,
        unit: "whole",
        image: "imgOfItem",
      },
      { name: "egg", amount: 1, unit: "whole", image: "imgOfItem" },
    ],
    addedIngredients: [
      /*Objects added by user, stored in localStorage */
    ],
    instructions: [
      "Prep the Basa - Preheat your oven to 220°C/200°C fan/gas mark 7. Pat the basa with kitchen paper to remove any excess moisture. Slice each basa fillet lengthways into 2cm wide strips. Halve the green pepper and discard the core and seeds. Slice into thin strips.",
      "Crumb the Basa - In a small bowl, combine the Mexican style spice mix, breadcrumbs and a drizzle of oil. Season with salt and pepper, then mix well.Add the basa and the egg to a medium bowl and turn the fish to coat well in the egg. Add the spicy breadcrumbs to the bowl of basa strips and gently mix to evenly coat in the breadcrumbs.",
      "Bake the Basa and Pepper - Add the crumbed basa to one end of a large, lined baking tray. Add the pepper slices to the other end. Drizzle everything with oil and season with salt and pepper. Bake on the middle shelf until the fish is cooked and the pepper softened and slightly charred, 15-18 mins.",
      "Prep the Salsa - Meanwhile, cut the tomatoes into 1cm chunks. Trim the spring onion and thinly slice on an angle. Roughly chop the coriander (stalks and all). Clean the two bowls used earlier for the fish. Add the tomato, spring onion and half the coriander to the medium bowl with the olive oil for the salsa (see pantry). Mix well and season with salt and pepper to create the salsa. In the small bowl, mix together the soured cream with the chipotle paste. Season with salt and pepper.",
      "Warm the Tortillas - When the crumbed fish and pepper have 2 mins remaining, pile the tortillas onto a microwaveable plate. Heat them through in the microwave, 850W: 50 secs / 750W: 1 min, until warm and soft. If you're using the oven, lay the tortillas onto a baking tray and place on the bottom shelf to warm through, 1-2 mins.",
      "Serve - To make your tacos, spread the chipotle soured cream over each tortilla. Top with the tomato salsa, roasted pepper and crispy basa strips. Sprinkle over the remaining coriander to finish.",
    ],
    prepTime: 14,
    cookTime: 18,
    servings: 4,
    nutritionalInfo: [
      /*Fetch this per ingredient */
    ],
  },
  {
    //thirty-fourth recipe:
    id: 34,
    name: "gujarati inspired dal soup",
    image: "",
    ingredients: [
      { name: "garlic clove", amount: 4, unit: "cloves", image: "imgOfItem" },
      { name: "red chilli", amount: 2, unit: "whole", image: "imgOfItem" },
      { name: "coriander", amount: 2, unit: "whole", image: "imgOfItem" },
      { name: "korma curry paste", amount: 100, unit: "g", image: "imgOfItem" },
      {
        name: "ground cinnamon",
        amount: 2,
        unit: "sachets",
        image: "imgOfItem",
      },
      { name: "ginger puree", amount: 30, unit: "g", image: "imgOfItem" },
      { name: "red split lentils", amount: 200, unit: "g", image: "imgOfItem" },
      {
        name: "finely chopped tomatoes with onion and garlic",
        amount: 2,
        unit: "whole",
        image: "imgOfItem",
      },
      { name: "mango chutney", amount: 80, unit: "g", image: "imgOfItem" },
      {
        name: "tenderstem broccoli",
        amount: 320,
        unit: "g",
        image: "imgOfItem",
      },
      {
        name: "steamed brown basmati rice",
        amount: 2,
        unit: "whole",
        image: "imgOfItem",
      },
      { name: "water", amount: 800, unit: "ml", image: "imgOfItem" },
    ],
    addedIngredients: [
      /*Objects added by user, stored in localStorage */
    ],
    instructions: [
      "Prep - Peel and grate the garlic (or use a garlic press). Thinly slice the red chilli. Roughly chop the coriander (stalks and all).",
      "Prep the Lentils - Heat a drizzle of oil in a large saucepan on medium heat. Once hot, add the korma curry paste, cinnamon, ginger puree, garlic and half the chilli, 1 min. Stir in the red lentils. Cook for 1 min, then stir in water (see pantry). Bring to a boil, then lower the heat and cover with a lid. Simmer until the lentils are soft, 20 mins. Stir occasionally to make sure they aren't sticking to the bottom of the pan and add a splash of water if it gets too dry.",
      "Mash the Lentils - Once the lentils have softened, mash with a potato masher or use a blender to blend until smooth.",
      "Add the Flavour - Once the lentils are smooth, add the chopped tomatoes and simmer for a further 6-7 mins. Stir through half the coriander and the mango chutney.",
      "Cook the Rice - Meanwhile, bring a large saucepan of water with 1/2 tsp salt to the boil for the broccoli. When the water is boiling, add the broccoli and cook until just tender, 3-4 mins. Once cooked, drain in a colander, then return to the pan. Drizzle with a little oil and season with salt and pepper. Cook the rice according to pack instructions.",
      "Serve - Divide the rice between your bowls. Serve the dal soup and broccoli alongside.",
    ],
    prepTime: 3,
    cookTime: 31,
    servings: 4,
    nutritionalInfo: [
      /*Fetch this per ingredient */
    ],
  },
  {
    //thirty-fifth recipe:
    id: 35,
    week: 2,
    name: "jerk spiced tofu rice bowl",
    image: "",
    ingredients: [
      { name: "basmati rice", amount: 200, unit: "g", image: "imgOfItem" },
      { name: "bell pepper", amount: 4, unit: "whole", image: "imgOfItem" },
      { name: "firm tofu", amount: 560, unit: "g", image: "imgOfItem" },
      { name: "jerk paste", amount: 100, unit: "g", image: "imgOfItem" },
      { name: "mango", amount: 2, unit: "whole", image: "imgOfItem" },
      { name: "kiwi", amount: 2, unit: "whole", image: "imgOfItem" },
      { name: "pineapple chutney", amount: 80, unit: "g", image: "imgOfItem" },
      { name: "sriracha sauce", amount: 32, unit: "ml", image: "imgOfItem" },
      { name: "water", amount: 600, unit: "ml", image: "imgOfItem" },
      { name: "maple syrup", amount: 1, unit: "tbsp", image: "imgOfItem" },
    ],
    addedIngredients: [
      /*Objects added by user, stored in localStorage */
    ],
    instructions: [
      "Start the Rice - Preheat your oven to 220°C/200°C fan/gas mark 7. Boil a half-full kettle. Pour the boiled water for the rice (see pantry) into a medium saucepan with 1/4 tsp salt and bring back to the boil on high heat. Add the rice, then reduce the heat to low. Cover with a tight-fitting lid and cook for 10 mins, then remove from the heat, still covered, and leave to the side to steam until ready to serve.",
      "Prep - Halve the bell pepper and discard the core and seeds. Cut lengthways into quarters. Drain the tofu and chop into 2cm cubes. Pat dry with kitchen paper. In a small bowl, combine the jerk paste and maple syrup (see pantry).",
      "Cook the Veg - Put the pepper onto a baking tray and drizzle with oil. Season with salt and pepper. When the oven is hot, bake on the top shelf until soft and slightly charred, 20-22 mins.",
      "Cook the Tofu - When the pepper has 15-18 mins left, place the tofu on the other side of the baking tray. Drizzle with oil and season with salt and pepper. Bake until the tofu is golden. Turn halfway through cooking. When the tofu has 5 mins remaining, drizzle over the maple jerk sauce over the tofu, then bake for the remaining time.",
      "Prep the Fruit - Meanwhile, peel the mango. Slice down either side of the stone to make 2 'cheeks'. Cut any remaining flesh from the stone, then cut the mango into 1cm pieces (discard the stone). Peel the kiwi, then cut into 1cm chunks. Place the fruit in a bowl with the pineapple chutney, season with salt and pepper, then toss to coat.",
      "Serve - Divide the Jerk tofu between your bowls. Serve the charred peppers, kiwi mango salsa and rice alongside. Drizzle the sriracha over the rice to finish.",
    ],
    prepTime: 9,
    cookTime: 22,
    servings: 4,
    nutritionalInfo: [
      /*Fetch this per ingredient */
    ],
  },
];

export const VALID_UNITS = {
  volume: ["cups", "tbsp", "tsp", "ml", "l"],
  weight: ["g", "kg", "oz", "lbs"],
  count: ["pieces", "whole", "cloves", "slices", "cans", "sachets"],
};
