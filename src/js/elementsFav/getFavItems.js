import { getFromLocalStorage } from '../localStorage/localStorage';
import { showMsgNotAddedCocktailOnFavPage } from '../utils/utils';
import { elementsRef } from '../elementsRefs/references';

// Get favorite items using stored ids
export async function getFavItemsByIds(storageKey, getItems) {
  const favItemsId = getFromLocalStorage(storageKey);

  showMsgNotAddedCocktailOnFavPage(
    favItemsId.length,
    elementsRef.notFoundMsgOnFavPageEl
  );

  if (favItemsId.length === 0) {
    return false;
  } else {
    try {
      const itemsInfo = [];
      for (const id of favItemsId) {
        const favItems = await getItems(id);
        itemsInfo.push(favItems[0]);
      }
      return itemsInfo;
    } catch (error) {
      console.log(error);
    }
  }
}
