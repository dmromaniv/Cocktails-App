const burgerBtn = document.querySelector('.burger-btn');
const headerRef = document.querySelector('.header');

burgerBtn.addEventListener('click', onMenuToggle);

function onMenuToggle() {
  headerRef.classList.toggle('menu-active');
  onScrollToggle();
}

function onScrollToggle() {
  document.body.classList.toggle('hide-scroll');
}

window
  .matchMedia('(max-width: 1279px)')
  .addEventListener('change', onChangeScreen);

function onChangeScreen(e) {
  if (e.matches) return;
  headerRef.classList.remove('menu-active');
  document.body.classList.remove('hide-scroll');
}
