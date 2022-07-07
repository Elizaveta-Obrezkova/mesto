import {initialCards} from './cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js'

// Объявляем переменные
const editProfileButton = document.querySelector('.edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit')
const popupAddCard = document.querySelector('.popup_type_add')
const addCardButton = document.querySelector('.add-button');
const popupSeeCard = document.querySelector('.popup_type_see-photo');
const formEditProfilePopup = document.querySelector('.popup__form_type_edit')
const owner = document.querySelector('.profile-owner');
const aboutOwner = document.querySelector('.profile-info__about-owner');
const inputOwner = document.querySelector('.popup__input_name_owner');
const inputAboutOwner = document.querySelector('.popup__input_name_about-owner');
const cardsContainer = document.querySelector('.elements')
const formAddCardPopup = document.querySelector('.popup__form_type_add');
const src = document.querySelector('.popup__input_name_photo-place');
const title = document.querySelector('.popup__input_name_title-place');
const closePopupButtons = document.querySelectorAll('.popup__close');
const seePhotoImage = document.querySelector('.photo-card__images');
const imagesTitle = document.querySelector('.photo-card__title');


const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'error-message_active'}


// Открыть попап

function openPopup(item) {
    item.classList.add('popup_opened');
    document.addEventListener('mousedown', closePopupOverlay);
    document.addEventListener('keyup', closePopupEsc);
}

function openPopupPlace(nameCard, link) {
    openPopup(popupSeeCard);
    seePhotoImage.src = link;
    imagesTitle.textContent = nameCard;
    seePhotoImage.alt = nameCard;
}

// Сохранить попап "Редактировать профиль"


function saveEditProfilePopup(evt) {
    evt.preventDefault()
    owner.textContent = inputOwner.value;
    aboutOwner.textContent = inputAboutOwner.value;
    closePopup(popupEditProfile);
};

// Закрыть попап

function closePopup(item) {
    item.classList.remove('popup_opened');
    document.removeEventListener('mousedowm', closePopupOverlay);
    document.removeEventListener('keyup', closePopupEsc);
};

function closePopupClick(evt) {
    closePopup(evt.target.closest('.popup'));
};

closePopupButtons.forEach(button => {
    button.addEventListener('click', closePopupClick);
});

function closePopupOverlay(evt) {
    if (evt.target.classList.contains('popup') && !evt.target.classList.contains('popup__container')) {
        closePopupClick(evt);
    }
};

function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    }
};

// Создание карточки

function createCard(item) {
    const card = new Card(item, '#element-template', openPopupPlace);
    const placeElement = card.createCard(); 
    return placeElement 
};

initialCards.forEach((item) => {
    const placeElement = createCard(item);
    cardsContainer.prepend(placeElement);
});

// Сохранить "Новое место"

function saveAddPlace(evt) {
    evt.preventDefault()
    const card = {link: src.value, name:title.value};
    const placeElement = createCard(card);
    cardsContainer.prepend(placeElement);
    formAddCardPopup.reset();
    closePopup(popupAddCard);
    addPopupValidate.isPopupButtonInactive();
}

// Попап изменения данных профиля

editProfileButton.addEventListener('click', function () {
    inputOwner.value = owner.textContent;
    inputAboutOwner.value = aboutOwner.textContent;
    editPopupValidate.resetValidation();
    openPopup(popupEditProfile);
    editPopupValidate.isPopupButtonActive();
});

formEditProfilePopup.addEventListener('submit', saveEditProfilePopup);

// Попап добавления нового места

addCardButton.addEventListener('click', function () {
    addPopupValidate.resetValidation()
    openPopup(popupAddCard);
});

formAddCardPopup.addEventListener('submit', saveAddPlace);

// Валидация 

const editPopupValidate = new FormValidator(settings, popupEditProfile);
editPopupValidate.enableValidation();

const addPopupValidate = new FormValidator(settings, popupAddCard);
addPopupValidate.enableValidation();

export {openPopup}