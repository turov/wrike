var btnPopup = document.querySelector('.btn--popup');
var popup = document.querySelector('.popup');
var wrapper = document.querySelector('.wrapper');
var btnEdit = document.querySelector('.btn--edit');
var container = document.querySelector('.container');
var btnCross = document.querySelector('#popupClose');

btnPopup.onclick = function () {
  popup.classList.add('popup--active');
  wrapper.classList.add('wrapper--active');
};

btnCross.onclick = function () {
  popup.classList.remove('popup--active');
  wrapper.classList.remove('wrapper--active');
  container.classList.remove('container--active');
};

btnEdit.onclick = function () {
  container.classList.toggle('container--active');
};

