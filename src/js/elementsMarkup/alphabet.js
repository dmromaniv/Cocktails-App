const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

export function createDesktopAlphabetMarkup() {
  return [...alphabet]
    .map(letter => {
      return `<li class="hero__alphabets-item"}""><button class="hero__alphabets-button button" value="${letter.toLowerCase()}">${letter}</button></li>`;
    })
    .join('');
}

export function createMobileAlphabetMarkup() {
  return [...alphabet]
    .map(letter => {
      return `<li class="hero__select-option" value="${letter.toLowerCase()}">${letter.toLowerCase()}</li>`;
    })
    .join('');
}
