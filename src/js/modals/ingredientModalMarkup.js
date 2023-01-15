export function createIngredientModalMarkup(ingredient) {
  return `<div class="ingredient__main-content">
            <p class="ingredient__title js-ingredient-title">${
              ingredient[0].strIngredient
            }</p>
            <p class="ingredient__type js-ingredient-type">${
              ingredient[0].strType || '***'
            }</p>
         </div>
         <p class="ingredient__desc js-ingredient-desk">
                <span class="ingredient__desc-accent">${
                  ingredient[0].strDescription ||
                  "Sorry, we didn't find any info about this ingredient"
                }</span>
         </p>
         <ul class="ingredient__info js-ingredient-info">
         ${createIngredientsMarkup(ingredient)}
         </ul>`;
}

function createIngredientsMarkup(ingredients = []) {
  return `<li>Type: ${ingredients[0].strType || 'no information'} </li>`;
}
