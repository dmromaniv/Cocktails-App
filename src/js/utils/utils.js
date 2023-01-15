const notFoundImgEl = document.querySelector('.img-notfound');
const foundTextEl = document.querySelector('.main-heading');

export function showMsgNotFound(elFound, galleryEl, pagination) {
  if (elFound) {
    foundTextEl.textContent = 'Searching results';
    notFoundImgEl.classList.add('is-hidden');
  } else {
    foundTextEl.textContent = "Sorry, we didn't find any cocktail for you";
    notFoundImgEl.classList.remove('is-hidden');
    galleryEl.innerHTML = '';
    pagination.innerHTML = '';
  }
}

export function showMsgNotAddedCocktailOnFavPage(emptyStorage, elementRef) {
  if (!emptyStorage) {
    elementRef.classList.remove('is-hidden');
  } else {
    elementRef.classList.add('is-hidden');
  }
}
