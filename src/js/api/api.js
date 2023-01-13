// const apiURL = 'https://thecocktaildb.com/api/json/v1/1';

// Get random cocktails from server
export async function getRandomCocktails() {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v2/9973533/randomselection.php`
  );
  const randomCocktails = await response.json();
  return randomCocktails;
}

// Get cocktail by specific letter
export async function getCocktailsByLetter(letter) {
  const response = await fetch(
    `https://thecocktaildb.com/api/json/v2/9973533/search.php?f=${letter}`
  );
  const cocktails = await response.json();
  return cocktails.drinks;
}

// Get cocktail by name
export async function getCocktailByName(cocktailName) {
  const response = await fetch(
    `https://thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`
  );
  const cocktail = await response.json();
  return cocktail.drinks;
}

// Get cocktails by id
export async function getCocktailsById(cocktailId) {
  const response = await fetch(
    `https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`
  );
  const cocktails = await response.json();
  return cocktails.drinks;
}
