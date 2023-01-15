import * as basicLightbox from 'basiclightbox';
import {
  updateModalFavBtnContent,
  updateFavBtnContent,
} from '../btnComponent/updateBtnContent';
import { updateLocalStorage } from '../localStorage/localStorage';
import { elementsRef } from '../elementsRefs/references';
import { getIngredientByName } from '../api/api';
import { createIngredientModalMarkup } from '../modals/ingredientModalMarkup';
import { constants } from '../constantsStorage/constants';

const currentPage = window.location;

// Create cocktail modal
export function createModal(
  modalContent,
  cardId,
  localStorageKey = constants.favCocktailStorageKey
) {
  let temporarySavedRemovedCard;
  let cardExists = true;

  const instance = basicLightbox.create(modalContent, {
    onShow: instance => {
      const modalEl = instance.element();
      const ingredientListEl = modalEl.querySelector('.cocktail__ingredients');

      // Create ingredient modal by clicking on ingredient
      ingredientListEl.addEventListener('click', async e => {
        if (e.target.nodeName !== 'A') return;

        const ingredientInfo = await getIngredientByName(
          e.target.dataset.name.toLowerCase()
        );

        const ingredientModalContent =
          createIngredientModalMarkup(ingredientInfo);

        createIngredientModal(
          ingredientModalContent,
          ingredientInfo[0].idIngredient
        );
      });

      const btnEl = modalEl.querySelector('.js-cocktail-add-btn');
      btnEl.innerHTML = updateModalFavBtnContent(
        cardId,
        (localStorageKey = constants.favCocktailStorageKey)
      );

      if (currentPage.href.includes('favCocktail.html')) {
        btnEl.addEventListener('click', modalFavBtnContentHandler);
      } else {
        btnEl.addEventListener('click', modalBtnContentHandler);
      }

      instance.element().querySelector('.js-modal-close-btn').onclick =
        instance.close;
    },
  });

  instance.show();

  // Button Actions when home page is opened
  function modalBtnContentHandler(e) {
    updateLocalStorage(cardId, localStorageKey);
    e.target.innerHTML = updateModalFavBtnContent(cardId, localStorageKey);
    const cocktailCardEl = document.querySelector(`[data-id="${cardId}"]`);
    cocktailCardEl.querySelector('.js-btn-fav').innerHTML = updateFavBtnContent(
      cardId,
      localStorageKey
    );
  }

  // Button Actions when favCocktail page is opened
  function modalFavBtnContentHandler(e) {
    updateLocalStorage(cardId, localStorageKey);
    e.target.innerHTML = updateModalFavBtnContent(cardId, localStorageKey);
    if (cardExists) {
      const cocktailCardEl = document.querySelector(`[data-id="${cardId}"]`);
      temporarySavedRemovedCard = cocktailCardEl.parentElement;
      cocktailCardEl.parentElement.remove();
      cardExists = false;
    } else {
      elementsRef.cocktailsListEl.insertAdjacentElement(
        'beforeend',
        temporarySavedRemovedCard
      );
      cardExists = true;
    }
  }
}

export function createIngredientModal(
  modalContent,
  ingredientId,
  localStorageKey = constants.favIngredientStorageKey
) {
  let temporarySavedRemovedCard;
  let cardExists = true;

  const instance = basicLightbox.create(modalContent, {
    onShow: instance => {
      const modalEl = instance.element();
      const btnEl = modalEl.querySelector('.js-cocktail-add-btn');

      btnEl.innerHTML = updateModalFavBtnContent(ingredientId, localStorageKey);

      if (currentPage.href.includes('favIngridients.html')) {
        btnEl.addEventListener('click', modalFavIngredientHandler);
      } else {
        btnEl.addEventListener('click', modalBtnContentHandler);
      }

      instance.element().querySelector('.js-ing-modal-close-btn').onclick =
        instance.close;
    },
  });

  instance.show();

  function modalBtnContentHandler(e) {
    updateLocalStorage(ingredientId, localStorageKey);
    e.target.innerHTML = updateModalFavBtnContent(
      ingredientId,
      localStorageKey
    );
  }

  // Button Actions when favIngredient page is opened
  function modalFavIngredientHandler(e) {
    updateLocalStorage(ingredientId, localStorageKey);
    e.target.innerHTML = updateModalFavBtnContent(
      ingredientId,
      localStorageKey
    );

    if (cardExists) {
      const cocktailCardEl = document.querySelector(
        `[data-id="${ingredientId}"]`
      );

      temporarySavedRemovedCard = cocktailCardEl;
      cocktailCardEl.remove();
      cardExists = false;
    } else {
      elementsRef.ingredientsListEl.insertAdjacentElement(
        'beforeend',
        temporarySavedRemovedCard
      );
      cardExists = true;
    }
  }
}
