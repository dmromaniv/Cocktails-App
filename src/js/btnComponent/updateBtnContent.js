import {
  createBtnMarkup,
  createModalBtnMarkup,
} from '../elementsMarkup/favBtnMarkup';
import { checkElInLocalStorage } from '../localStorage/localStorage';

export function updateFavBtnContent(cardId, localStorageKey) {
  const elemExists = checkElInLocalStorage(cardId, localStorageKey);
  const btnContent = createBtnMarkup(elemExists);
  return btnContent;
}

// Change button content in modal
export function updateModalFavBtnContent(cardId, localStorageKey) {
  const elemExists = checkElInLocalStorage(cardId, localStorageKey);
  const btnContent = createModalBtnMarkup(elemExists);
  return btnContent;
}
