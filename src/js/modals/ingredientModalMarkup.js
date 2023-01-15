import sprite from '../../images/svg/icons-sprite.svg';

export function createIngredientModalMarkup(ingredient) {
  return `
  <div class="modal cocktail js-cocktail-modal">
      <button class="button close-btn js-ing-modal-close-btn" type="button">
        <svg width="32" height="32">
          <use href="${sprite}#close"></use>
        </svg>
      </button>
       <div class="ingredient__main-content">
            <p class="ingredient__title js-ingredient-title">${
              ingredient[0].strIngredient
            }</p>
            <p class="ingredient__type js-ingredient-type">${
              ingredient[0].strType || '***'
            }</p>
         </div>
         <p class="ingredient__desc js-ingredient-desk">
              <span class="ingredient__desc-accent">${
                selectIngredientName(ingredient[0].strDescription) ||
                "Sorry, we didn't find any info about this ingredient"
              }</span>
         </p>
         <ul class="ingredient__info js-ingredient-info">
         ${createIngredientsMarkup(ingredient)}
         </ul>
      <button class="button cocktail__button js-cocktail-add-btn">
        Add to favorite
      </button>
    </div>
  `;
}

function createIngredientsMarkup(ingredients = []) {
  return `<li>Type: ${ingredients[0].strType || 'no information'} </li>`;
}

function selectIngredientName(ingredient) {
  if (ingredient) {
    const words = ingredient.split(' ');
    return (
      `<span class="ingredient__name-accent">${words.splice(0, 1)}</span>` +
      ' ' +
      words.join(' ')
    );
  }
  return false;
}
