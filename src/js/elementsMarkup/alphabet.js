const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

// Create markup for alphabet search on tablet or desktop ver
export function createDesktopAlphabetMarkup() {
  return [...alphabet]
    .map(letter => {
      return `<li class="hero__alphabets-item"><button class="hero__alphabets-button button" value="${letter.toLowerCase()}">${letter}</button></li>`;
    })
    .join('');
}

// Create markup for alphabet search on mobile
export function createMobileAlphabetMarkup() {
  return [...alphabet]
    .map(letter => {
      return `<li class="hero__select-option" data-value="${letter.toLowerCase()}">${letter.toUpperCase()}</li>`;
    })
    .join('');
}
