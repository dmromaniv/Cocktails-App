import { constants } from './constantsStorage/constants';
import {
  addToLocalStorage,
  getFromLocalStorage,
} from './localStorage/localStorage';
import { elementsRef } from './elementsRefs/references';

export function changeColorTheme() {
  if (elementsRef.themeColorToggleEl.checked) {
    changeThemeOnDarkMode();
  } else {
    changeThemeOnLightMode();
  }
}

export function setDefaultTheme() {
  if (getFromLocalStorage(constants.themeMode) == 'dark') {
    changeThemeOnDarkMode();
  } else {
    changeThemeOnLightMode();
  }
}

function changeThemeOnDarkMode() {
  document.body.classList.add('dark');
  elementsRef.themeColorToggleEl.checked = true;
  addToLocalStorage(constants.themeMode, 'dark');
}

function changeThemeOnLightMode() {
  document.body.classList.remove('dark');
  elementsRef.themeColorToggleEl.checked = false;
  addToLocalStorage(constants.themeMode, 'light');
}
