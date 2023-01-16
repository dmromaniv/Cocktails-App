import Notiflix from 'notiflix';
import './js/modals/mobileMenu';
import { constants } from './js/constantsStorage/constants';
import { getIngredientById } from './js/api/api';
import {
  renderGallery,
  createPagination,
} from './js/elementsRender/renderGallery';
import { elementsRef } from './js/elementsRefs/references';
import { updateLocalStorage } from './js/localStorage/localStorage';
import { createIngredientCardMarkup } from './js/elementsMarkup/ingredientCard';
import { createIngredientModalMarkup } from './js/modals/ingredientModalMarkup';
import { createIngredientModal } from './js/modals/createModal';
import { showMsgNotFound } from './js/utils/utils';
import { getFavItemsByIds } from './js/elementsFav/getFavItems';
import { setDefaultTheme } from './js/changeColorTheme';
import { changeColorTheme} from './js/changeColorTheme';

window.addEventListener('load', favIngredientHandler);
elementsRef.ingredientsListEl.addEventListener('click', ingredientCardHandler);
elementsRef.searchFormRef.addEventListener(
  'submit',
  searchFavIngredientHandler
);
elementsRef.themeColorToggleEl.addEventListener('change', () => {

});

async function favIngredientHandler() {
  // const filteredIngredientsById = await getIngredientsByStorageIds();

  const filteredIngredientsById = await getFavItemsByIds(
    constants.favIngredientStorageKey,
    getIngredientById
  );

  if (filteredIngredientsById) {
    displayIngredientsGallery(filteredIngredientsById);
  }

  // if (!filteredIngredientsById) {
  //   elementsRef.notFoundTextEl.classList.remove('is-hidden');
  // } else {
  //   renderGallery(
  //     filteredIngredientsById,
  //     elementsRef.ingredientsListEl,
  //     createIngredientCardMarkup
  //   );
  // }
}

async function ingredientCardHandler(e) {
  if (!e.target.closest('BUTTON')) return;

  const ingredientCardEl = e.target.closest('[data-id]');
  const cardId = ingredientCardEl.dataset.id;

  const btnEl = e.target.closest('.js-btn-fav');
  if (btnEl) {
    updateLocalStorage(cardId, constants.favIngredientStorageKey);
    ingredientCardEl.remove();
  }
  if (e.target.classList.contains('js-btn-more')) {
    const ingredientInfo = await getIngredientById(cardId);
    const ingredientModalContent = createIngredientModalMarkup(ingredientInfo);

    createIngredientModal(
      ingredientModalContent,
      ingredientInfo[0].idIngredient,
      constants.favIngredientStorageKey
    );
  }
  if (elementsRef.ingredientsListEl.children.length === 0) {
    location.reload();
  }
}

async function searchFavIngredientHandler(e) {
  e.preventDefault();

  const searchQuery = e.target.elements.search.value.trim();
  if (!searchQuery) {
    Notiflix.Notify.warning('Please, enter the correct search query');
    return;
  }

  // const filteredCocktailsById = await getIngredientsByStorageIds();
  const filteredCocktailsById = await getFavItemsByIds(
    constants.favIngredientStorageKey,
    getIngredientById
  );

  if (filteredCocktailsById) {
    const filteredIngredientByName = filteredCocktailsById.filter(cocktail =>
      cocktail.strIngredient.toUpperCase().includes(searchQuery.toUpperCase())
    );

    showMsgNotFound(
      filteredIngredientByName.length,
      elementsRef.ingredientsListEl,
      elementsRef.paginationEl
    );

    displayIngredientsGallery(filteredIngredientByName);
  } else {
    Notiflix.Notify.info("You haven't any favorite ingredients");
  }

  // if (filteredCocktailByName !== 0) {
  //   renderGallery(
  //     filteredCocktailByName,
  //     elementsRef.ingredientsListEl,
  //     createIngredientCardMarkup
  //   );
  //   createPagination(
  //     filteredCocktailByName,
  //     elementsRef.ingredientsListEl,
  //     createIngredientCardMarkup
  //   );
  // }
}

function displayIngredientsGallery(filteredIngredient) {
  if (filteredIngredient !== 0) {
    createPagination(
      filteredIngredient,
      elementsRef.ingredientsListEl,
      createIngredientCardMarkup
    );

    renderGallery(
      filteredIngredient,
      elementsRef.ingredientsListEl,
      createIngredientCardMarkup
    );
  }
}

// async function getIngredientsByStorageIds() {
//   const favIngredientsId = getFromLocalStorage(
//     constants.favIngredientStorageKey
//   );

//   console.log(favIngredientsId.length);
//   showNotFoundMessageOnFavPage(
//     favIngredientsId.length,
//     elementsRef.notFoundMsgOnFavPageEl
//   );
//   if (favIngredientsId.length === 0) {
//     return false;
//   } else {
//     try {
//       const ingredientsCardsInfo = [];
//       for (const id of favIngredientsId) {
//         const favIngredient = await getIngredientById(id);
//         ingredientsCardsInfo.push(favIngredient[0]);
//       }
//       return ingredientsCardsInfo;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }
