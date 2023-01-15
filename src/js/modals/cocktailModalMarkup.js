export function createCocktailModalMarkup(cocktail, ingredients) {
  return ` <p class="cocktail__title js-cocktail-title">${cocktail.strDrink}</p>
    <div class="cocktail__main-content">
      <div class="cocktail__desc-wrapper">
        <p class="cocktail__instruction">Instructions:</p>
        <p class="cocktail__desc js-cocktail-desk">${
          cocktail.strInstructions
        }</p>
      </div>
      <div class="cocktail__img-wrapper">
        <img
          class="cocktail__img js-cocktail-img"
          src="${cocktail.strDrinkThumb}"
          alt="cocktail"
        />
      </div>
      <div class="cocktail__info-block">
        <p class="cocktail__info-text">INGREDIENTS</p>
        <p class="cocktail__info-amount">Per cocktail</p>
        <ul class="cocktail__ingredients js-cocktail-ingredients">
        ${createIngredientsListMarkup(cocktail)}
        </ul>
      </div>
    </div>`;
}

export function createIngredientsListMarkup(cocktail) {
  let markup = '';
  let ingredient;
  let measure;

  for (let i = 1; i <= 15; i += 1) {
    ingredient = 'strIngredient' + i;
    measure = 'strMeasure' + i;

    if (cocktail[measure] && cocktail[ingredient]) {
      markup += `<li cocktail[]><a data-name="${cocktail[ingredient]}">${cocktail[measure]} ${cocktail[ingredient]}</a></li>`;
    }
  }
  return markup;
}
