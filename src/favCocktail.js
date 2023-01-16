import Notiflix from 'notiflix';
import './js/modals/mobileMenu';
import { elementsRef } from './js/elementsRefs/references';
import { updateLocalStorage } from './js/localStorage/localStorage';
import { constants } from './js/constantsStorage/constants';
import { getCocktailsById } from './js/api/api';
import {
  renderGallery,
  createPagination,
} from './js/elementsRender/renderGallery';
import { createCocktailModalMarkup } from './js/modals/cocktailModalMarkup';
import { createModal } from './js/modals/createModal';
import { createCocktailCardMarkup } from './js/elementsMarkup/cocktailCard';
import { showMsgNotFound } from './js/utils/utils';
import { getFavItemsByIds } from './js/elementsFav/getFavItems';
import { changeColorTheme} from './js/changeColorTheme';

window.addEventListener('load', favCocktailsHandler);
elementsRef.searchFormRef.addEventListener('submit', searchFavCocktailHandler);
elementsRef.cocktailsListEl.addEventListener('click', cocktailCardHandler);
elementsRef.themeColorToggleEl.addEventListener('change', () => {
 
});

async function favCocktailsHandler() {
  // const filteredCocktailsById = await getCocktailByStorageIds();

  const filteredCocktailsById = await getFavItemsByIds(
    constants.favCocktailStorageKey,
    getCocktailsById
  );

  if (filteredCocktailsById) {
    displayGallery(filteredCocktailsById);
  }

  // if (!filteredCocktailsById) {
  //   elementsRef.notFoundTextEl.classList.remove('is-hidden');
  // } else {
  //   // renderGallery(
  //   //   filteredCocktailsById,
  //   //   elementsRef.cocktailsListEl,
  //   //   createCocktailCardMarkup
  //   // );
  //   // createPagination(
  //   //   filteredCocktailsById,
  //   //   elementsRef.cocktailsListEl,
  //   //   createCocktailCardMarkup
  //   // );
  //   displayGallery(filteredCocktailsById);
  // }
}

async function searchFavCocktailHandler(e) {
  e.preventDefault();

  const searchQuery = e.target.elements.search.value.trim();
  if (!searchQuery) {
    Notiflix.Notify.warning('Please, enter the correct search query');
    return;
  }

  // const filteredCocktailsById = await getCocktailByStorageIds();
  const filteredCocktailsById = await getFavItemsByIds(
    constants.favCocktailStorageKey,
    getCocktailsById
  );

  if (filteredCocktailsById) {
    const filteredCocktailByName = filteredCocktailsById.filter(cocktail =>
      cocktail.strDrink.toUpperCase().includes(searchQuery.toUpperCase())
    );

    showMsgNotFound(
      filteredCocktailByName.length,
      elementsRef.cocktailsListEl,
      elementsRef.paginationEl
    );

    displayGallery(filteredCocktailByName);
  } else {
    Notiflix.Notify.info("You haven't any favorite cocktails");
  }

  // if (filteredCocktailByName !== 0) {
  //   renderGallery(
  //     filteredCocktailByName,
  //     elementsRef.cocktailsListEl,
  //     createCocktailCardMarkup
  //   );
  //   createPagination(
  //     filteredCocktailByName,
  //     elementsRef.cocktailsListEl,
  //     createCocktailCardMarkup
  //   );
  // }
}

async function cocktailCardHandler(e) {
  if (!e.target.closest('BUTTON')) {
    return;
  }

  const cocktailCardEl = e.target.closest('[data-id]');
  const cardId = cocktailCardEl.dataset.id;

  const btnEl = e.target.closest('.js-btn-fav');
  if (btnEl) {
    updateLocalStorage(cardId, constants.favCocktailStorageKey);
    cocktailCardEl.parentElement.remove();
  }
  if (e.target.classList.contains('js-btn-more')) {
    const cocktailInfo = await getCocktailsById(cardId);

    // const ingredientModalContent = createIngredientsListMarkup(cocktailInfo[0]);

    const cocktailModalContent = createCocktailModalMarkup(cocktailInfo[0]);

    createModal(cocktailModalContent, cardId, constants.favCocktailStorageKey);
  }
  if (elementsRef.cocktailsListEl.children.length === 0) {
    location.reload();
  }
}

function displayGallery(filteredCocktail) {
  if (filteredCocktail !== 0) {
    createPagination(
      filteredCocktail,
      elementsRef.cocktailsListEl,
      createCocktailCardMarkup
    );

    renderGallery(
      filteredCocktail,
      elementsRef.cocktailsListEl,
      createCocktailCardMarkup
    );
  }
}

// async function getCocktailByStorageIds() {
//   const favCocktailsId = getFromLocalStorage(constants.favCocktailStorageKey);

//   showNotFoundMessageOnFavPage(
//     favCocktailsId.length,
//     elementsRef.notFoundMsgOnFavPageEl
//   );

//   if (favCocktailsId.length === 0) {
//     return false;
//   } else {
//     try {
//       const cocktailCardsInfo = [];
//       for (const id of favCocktailsId) {
//         const favCocktail = await getCocktailsById(id);
//         cocktailCardsInfo.push(favCocktail[0]);
//       }
//       return cocktailCardsInfo;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }
