import sprite from '../../images/svg/icons-sprite.svg';

export function createBtnMarkup(existsElemInStorage) {
  if (existsElemInStorage) {
    return `<span class="">Remove</span>
            <svg style="" class="cocktail-card__heart-icon" width="21" height="19">
                    <use href="${sprite}#accent-heart"></use>
            </svg>`;
  } else {
    return `<span class="">Add to</span>
            <svg style="" class="cocktail-card__heart-icon" width="21" height="19">
                    <use href="${sprite}#heart"></use>
            </svg>`;
  }
}

export function createModalBtnMarkup(existsElemInStorage) {
  if (existsElemInStorage) {
    return `<span>Remove from favorite</span>`;
  } else {
    return `<span>Add to favorite</span>`;
  }
}
