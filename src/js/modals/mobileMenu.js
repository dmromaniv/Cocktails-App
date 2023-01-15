import sprite from '../../images/svg/icons-sprite.svg';

const burgerBtn = document.querySelector('.burger-btn');
const svgIconEl = document.querySelector('.menu-icon');
const headerRef = document.querySelector('.header');

burgerBtn.addEventListener('click', onMenuToggle);
window
  .matchMedia('(max-width: 1279px)')
  .addEventListener('change', onChangeScreen);

function onMenuToggle() {
  headerRef.classList.toggle('menu-active');
  changeModalBtn();
  // onScrollToggle();
}

function onScrollToggle() {
  document.body.classList.toggle('hide-scroll');
}

function onChangeScreen(e) {
  if (e.matches) return;
  headerRef.classList.remove('menu-active');
  document.body.classList.remove('hide-scroll');
}

function changeModalBtn() {
  if (headerRef.classList.contains('menu-active')) {
    svgIconEl.setAttribute('href', `${sprite}#close`);
  } else {
    svgIconEl.setAttribute('href', `${sprite}#burger-menu`);
  }
}
