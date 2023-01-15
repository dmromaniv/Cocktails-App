import sprite from '../../images/svg/icons-sprite.svg';
export function createCommonModalMarkup(modalContent) {
  return `
    <div class="modal cocktail js-cocktail-modal">
      <button class="button close-btn js-modal-close-btn" type="button">
        <svg width="32" height="32">
          <use href="${sprite}#close"></use>
        </svg>
      </button>
        ${modalContent}
      <button class="button cocktail__button js-cocktail-add-btn">
        Add to favorite
      </button>
    </div>
  `;
}
