import { elementsRef } from './js/elementsRefs/references';
import {
  getFromLocalStorage,
  updateLocalStorage,
} from './js/localStorage/localStorage';
import { constants } from './js/constantsStorage/constants';
import { getCocktailsById } from './js/api/api';
import {
  renderGallery,
  createPagination,
} from './js/elementsRender/renderGallery';

window.addEventListener('load', favCocktailsHandler);
elementsRef.searchFormRef.addEventListener('submit', searchFavCocktailHandler);
elementsRef.cocktailsListEl.addEventListener('click', cocktailCardHandler);

async function favCocktailsHandler() {
  const filteredCocktailsById = await getCocktailByStorageIds();
  if (!filteredCocktailsById) {
    elementsRef.notFoundTextEl.classList.remove('is-hidden');
  } else {
    renderGallery(filteredCocktailsById, elementsRef.cocktailsListEl);
    createPagination(filteredCocktailsById, elementsRef.cocktailsListEl);
  }
}

async function searchFavCocktailHandler(e) {
  e.preventDefault();
  const searchQuery = e.target.elements.search.value.trim();
  if (!searchQuery) {
    console.log('Empty query');
    return;
  }
  const filteredCocktailsById = await getCocktailByStorageIds();

  const filteredCocktailByName = filteredCocktailsById.filter(cocktail =>
    cocktail.strDrink.toUpperCase().includes(searchQuery.toUpperCase())
  );

  if (filteredCocktailByName !== 0) {
    renderGallery(filteredCocktailByName, elementsRef.cocktailsListEl);
    createPagination(filteredCocktailByName, elementsRef.cocktailsListEl);
  }
}

async function getCocktailByStorageIds() {
  const favCocktailsId = getFromLocalStorage(constants.favCocktailStorageKey);
  if (favCocktailsId.length === 0) {
    return false;
  } else {
    try {
      const cocktailCardsInfo = [];
      for (const id of favCocktailsId) {
        const favCocktail = await getCocktailsById(id);
        cocktailCardsInfo.push(favCocktail[0]);
      }
      return cocktailCardsInfo;
    } catch (error) {
      console.log(error);
    }
  }
}

function cocktailCardHandler(e) {
  if (e.target.nodeName !== 'BUTTON') return;

  if (e.target.classList.contains('js-btn-fav')) {
    const cocktailCardEl = e.target.closest('[data-id]');
    const cardId = cocktailCardEl.dataset.id;

    updateLocalStorage(cardId, constants.favCocktailStorageKey);
    cocktailCardEl.parentElement.remove();
  }
}
