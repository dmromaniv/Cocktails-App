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
} from './js/api/api';
import { updateFavBtnContent } from './js/btnComponent/updateBtnContent';
import { constants } from './js/constantsStorage/constants';
import { updateLocalStorage } from './js/localStorage/localStorage';

elementsRef.alphabetListEl.addEventListener('click', alphabetSearchHandler);
elementsRef.cocktailsListEl.addEventListener('click', cocktailCardHandler);
elementsRef.searchFormRef.addEventListener('submit', searchFormHandler);

initAlphabetSearch();
generateRandomCocktails();

// Generate alphabet search on page
function initAlphabetSearch() {
  console.log('111');
  renderAlphabet();
  elementsRef.selectValue.addEventListener('click', onToggleSelectOptions);
  elementsRef.selectMobileEl.addEventListener('click', onOptionClick);
}

// Generate random cocktails list after page loading
async function generateRandomCocktails() {
  try {
    const { drinks } = await getRandomCocktails();
    renderGallery(drinks, elementsRef.cocktailsListEl);
  } catch (error) {
    console.log(error);
  }
}

// Generate filtered cocktails by letter
async function alphabetSearchHandler(e) {
  if (e.target.nodeName !== 'BUTTON') return;
  try {
    const filteredCocktailByLetter = await getCocktailsByLetter(e.target.value);
    console.log('drinks by let', filteredCocktailByLetter);
    renderGallery(filteredCocktailByLetter, elementsRef.cocktailsListEl);
    createPagination(filteredCocktailByLetter, elementsRef.cocktailsListEl);
  } catch {
    console.log(error);
  }
}

// Handle button clicks in the card
function cocktailCardHandler(e) {
  if (e.target.nodeName !== 'BUTTON') return;

  if (e.target.classList.contains('js-btn-fav')) {
    console.log('222');
    const cocktailCardEl = e.target.closest('[data-id]');
    const cocktailId = cocktailCardEl.dataset.id;
    updateLocalStorage(cocktailId, constants.favCocktailStorageKey);
    console.log(e.target);
    e.target.innerHTML = updateFavBtnContent(
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
    console.log('Empty');
  } else {
    try {
      const filteredCocktailsByName = await getCocktailByName(searchQuery);
      renderGallery(filteredCocktailsByName, elementsRef.cocktailsListEl);
      createPagination(filteredCocktailsByName, elementsRef.cocktailsListEl);
    } catch {
      console.log(error);
    }
  }
}
// Utils
function onToggleSelectOptions() {
  selectOptions.classList.toggle('is-hidden');
}

function onOptionClick(e) {
  selectValue.firstElementChild.textContent = e.target.textContent;
  onToggleSelectOptions();
  activeFill();
}

function activeFill() {
  selectValue.classList.add('active-letter');
  selectValue.childNodes[3].classList.add('active-icon');
}
