//helper function: Makes each word in a string upperCase, except words in the exception list.
export function titleCase(recipeName) {
  // Define words to leave lowercase (except at beginning of title)
  const exceptions = ["and", "of", "the", "in", "with"];

  // Split the recipe name into words
  const words = recipeName.toLowerCase().split(" ");

  // Process each word
  const processedWords = words.map((word, index) => {
    // Always capitalize the first word OR words not in the exception list
    if (index === 0 || !exceptions.includes(word)) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    // Keep exception words lowercase
    return word;
  });

  // Join the words back together
  return processedWords.join(" ");
}
