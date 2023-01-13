import { createBtnMarkup } from '../elementsMarkup/favBtnMarkup';
import { checkElInLocalStorage } from '../localStorage/localStorage';

export function updateFavBtnContent(cardId, localStorageKey) {
  const elemExists = checkElInLocalStorage(cardId, localStorageKey);
  const btnContent = createBtnMarkup(elemExists);
  return btnContent;
}
