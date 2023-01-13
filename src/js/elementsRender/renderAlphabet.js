import { elementsRef } from '../elementsRefs/references';
import {
  createDesktopAlphabetMarkup,
  createMobileAlphabetMarkup,
} from '../elementsMarkup/alphabet';

export function renderAlphabet() {
  elementsRef.selectMobileEl.innerHTML = createMobileAlphabetMarkup();
  elementsRef.selectWidescreenEl.innerHTML = createDesktopAlphabetMarkup();
}
