import './js/modals/mobileMenu';
import './js/changeColorTheme';
import Notiflix from 'notiflix';
import { elementsRef } from './js/elementsRefs/references';
import { renderAlphabet } from './js/elementsRender/renderAlphabet';
import {
  renderGallery,
  createPagination,
} from './js/elementsRender/renderGallery';
import {
  getRandomCocktails,
  getCocktailsByLetter,
  getCocktailByName,
  getCocktailsById,
} from './js/api/api';
import { updateFavBtnContent } from './js/btnComponent/updateBtnContent';
import { constants } from './js/constantsStorage/constants';
import { updateLocalStorage } from './js/localStorage/localStorage';
import { createModal } from './js/modals/createModal';
import {
  createCocktailModalMarkup,
  createIngredientsListMarkup,
} from './js/modals/cocktailModalMarkup';
import { createCocktailCardMarkup } from './js/elementsMarkup/cocktailCard';
import { calcCardsPerPage } from './js/elementsRender/renderGallery';
import { showNotFoundMsg } from './js/utils/utils';

elementsRef.alphabetListEl.addEventListener('click', alphabetSearchHandler);

elementsRef.cocktailsListEl.addEventListener('click', cocktailCardHandler);
elementsRef.searchFormRef.addEventListener('submit', searchFormHandler);

initAlphabetSearch();
generateRandomCocktails();

// Generate alphabet search on page
function initAlphabetSearch() {
  renderAlphabet();
  elementsRef.selectValue.addEventListener('click', onToggleSelectOptions);
  elementsRef.selectMobileEl.addEventListener('click', onOptionClick);
}

// Generate random cocktails list after page loading
async function generateRandomCocktails() {
  try {
    const randomCocktailsData = [];
    for (let i = 1; i <= calcCardsPerPage(); i++) {
      const { drinks } = await getRandomCocktails();
      randomCocktailsData.push(drinks);
    }
    renderGallery(
      randomCocktailsData.flat(),
      elementsRef.cocktailsListEl,
      createCocktailCardMarkup
    );
  } catch (error) {
    console.log(error);
  }
}

// Generate filtered cocktails by letter
async function alphabetSearchHandler(e) {
  if (e.target.nodeName !== 'BUTTON') return;
  try {
    const filteredCocktailByLetter = await getCocktailsByLetter(e.target.value);

    showNotFoundMsg(
      filteredCocktailByLetter,
      elementsRef.cocktailsListEl,
      elementsRef.paginationEl
    );

    if (filteredCocktailByLetter) {
      renderGallery(
        filteredCocktailByLetter,
        elementsRef.cocktailsListEl,
        createCocktailCardMarkup
      );
      createPagination(
        filteredCocktailByLetter,
        elementsRef.cocktailsListEl,
        createCocktailCardMarkup
      );
    }
  } catch (error) {
    console.log(error);
  }
}

// Handle button clicks in the card
async function cocktailCardHandler(e) {
  if (e.target.nodeName !== 'BUTTON') return;

  const cocktailCardEl = e.target.closest('[data-id]');
  const cocktailId = cocktailCardEl.dataset.id;

  if (e.target.classList.contains('js-btn-fav')) {
    updateLocalStorage(cocktailId, constants.favCocktailStorageKey);

    e.target.innerHTML = updateFavBtnContent(
      cocktailId,
      constants.favCocktailStorageKey
    );
  }
  if (e.target.classList.contains('js-btn-more')) {
    const cocktailInfo = await getCocktailsById(cocktailId);
    // console.log(cocktailInfo);

    // const ingredientModalContent = createIngredientsListMarkup(cocktailInfo[0]);

    const cocktailModalContent = createCocktailModalMarkup(
      cocktailInfo[0]
      // ingredientModalContent
    );

    createModal(
      cocktailModalContent,
      cocktailId,
      constants.favCocktailStorageKey
    );
  }
}

// Handle search query
async function searchFormHandler(e) {
  e.preventDefault();
  const searchQuery = e.target.elements.search.value.trim();
  if (!searchQuery) {
    Notiflix.Notify.warning('Please, enter the correct search query');
  } else {
    try {
      const filteredCocktailsByName = await getCocktailByName(searchQuery);

      showNotFoundMsg(
        filteredCocktailsByName,
        elementsRef.cocktailsListEl,
        elementsRef.paginationEl
      );

      if (filteredCocktailsByName) {
        renderGallery(
          filteredCocktailsByName,
          elementsRef.cocktailsListEl,
          createCocktailCardMarkup
        );
        createPagination(
          filteredCocktailsByName,
          elementsRef.cocktailsListEl,
          createCocktailCardMarkup
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
}

// Utils
function onToggleSelectOptions() {
  elementsRef.selectOptions.classList.toggle('is-hidden');
}

async function onOptionClick(e) {
  elementsRef.selectValue.firstElementChild.textContent = e.target.textContent;
  onToggleSelectOptions();
  activeFill();

  console.log(e.target.dataset.value);
  try {
    const filteredCocktailByLetter = await getCocktailsByLetter(
      e.target.dataset.value
    );

    showNotFoundMsg(
      filteredCocktailByLetter,
      elementsRef.cocktailsListEl,
      elementsRef.paginationEl
    );

    if (filteredCocktailByLetter) {
      renderGallery(
        filteredCocktailByLetter,
        elementsRef.cocktailsListEl,
        createCocktailCardMarkup
      );
      createPagination(
        filteredCocktailByLetter,
        elementsRef.cocktailsListEl,
        createCocktailCardMarkup
      );
    }
  } catch (error) {
    console.log(error);
  }
}

function activeFill() {
  elementsRef.selectValue.classList.add('active-letter');
  elementsRef.selectValue.childNodes[3].classList.add('active-icon');
}
