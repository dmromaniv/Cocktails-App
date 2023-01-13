import sprite from '../../images/svg/icons-sprite.svg';
import { updateFavBtnContent } from '../btnComponent/updateBtnContent';
import { constants } from '../constantsStorage/constants';

export function createCocktailCardMarkup(cocktail) {
  return `<li class="cocktails__list-item">
    <div class="cocktail-card" data-id="${cocktail.idDrink}">
        <div class="cocktail-card__img-wrapper">
            <img class="cocktail-card__img" src="${
              cocktail.strDrinkThumb
            }" alt="cocktail" class="cocktails__img" />
        </div>
        <p class="cocktail-card__name">${cocktail.strDrink}</p>
        <div class="cocktail-card__btns-block">
            <button class="button cocktail-card__btn cocktail-card__btn--accent js-btn-more">
                Learn more
            </button>
            <button class="button cocktail-card__btn cocktail-card__btn--transp cocktail-card__btn--centered js-btn-fav">
                ${updateFavBtnContent(
                  cocktail.idDrink,
                  constants.favCocktailStorageKey
                )}
            </button>
        </div>
    </div>
</li>`;
}
