export function addToLocalStorage(key, value) {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
}

export function getFromLocalStorage(key) {
  try {
    const serializedState = localStorage.getItem(key);

    return serializedState === null ? [] : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}

export function removeFromLocalStorage(key) {
  localStorage.removeItem(key);
}

// Checks whether card is added to localStorage
export function checkElInLocalStorage(cardId, key) {
  return getFromLocalStorage(key).includes(cardId);
}

export function updateLocalStorage(cardId, key) {
  let cardsId = [];

  if (!getFromLocalStorage(key)) {
    cardsId.push(cardId);
    addToLocalStorage(key, cardsId);
  } else {
    cardsId = getFromLocalStorage(key);
    const index = cardsId.indexOf(cardId);
    if (index !== -1) {
      cardsId.splice(index, 1);
      addToLocalStorage(key, cardsId);
    } else {
      cardsId.push(cardId);
      addToLocalStorage(key, cardsId);
    }
  }
}
