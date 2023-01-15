import { updateFavBtnContent } from '../btnComponent/updateBtnContent';
import { constants } from '../constantsStorage/constants';

export function createIngredientCardMarkup(ingredient) {
  return `<li class="favorite__item" data-id="${ingredient.idIngredient}">
        <div class="ingredient-card">
          <h2 class="ingredient-card__title">${ingredient.strIngredient}</h2>
          <p class="ingredient-card__text">${ingredient.strType || '***'}</p>
          <div class="buttons-wrap">
            <button class="button cocktail-card__btn cocktail-card__btn--accent js-btn-more" type="button">
              Learn more
            </button>
            <button class="button cocktail-card__btn cocktail-card__btn--transp cocktail-card__btn--centered js-btn-fav" type="button">
              ${updateFavBtnContent(
                ingredient.idIngredient,
                constants.favIngredientStorageKey
              )}
            </button>
          </div>
        </div>
      </li>`;
}
