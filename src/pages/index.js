import './index.css';

import { editProfileButton, addCardButton, inputOwner, inputAboutOwner, settings, initialCards } from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

// Создание карточки

const popupImage = new PopupWithImage('.popup_type_see-photo');
popupImage.setEventListeners();


function createCard(item) {
    const card = new Card({
        data: item,
        selector: '#element-template',
        openPopupPlace: (name, link) => {
            popupImage.open(name, link);
        }
    });
    const placeElement = card.createCard();
    return placeElement
};

const userInfo = new UserInfo({
    ownerSelector: '.profile-owner',
    aboutOwnerSelector: '.profile-info__about-owner'
});

const cardList = new Section({
    items: initialCards,
    renderer: (carditem) => {
        const placeElement = createCard(carditem);
        cardList.addItem(placeElement);
    }
},
    '.elements');

cardList.renderItems();

editProfileButton.addEventListener('click', () => {
    editPopupValidate.resetValidation();
    const user = userInfo.getUserInfo();
    inputOwner.value = user['owner'];
    inputAboutOwner.value = user['aboutOwner'];
    popupEditProfile.open();
    editPopupValidate.isPopupButtonActive();
});

addCardButton.addEventListener('click', function () {
    addPopupValidate.resetValidation();
    popupAddCard.open();
    addPopupValidate.isPopupButtonInactive();
});

const popupEditProfile = new PopupWithForm({
    popupSelector: '.popup_type_edit',
    submit: (values) => {
        userInfo.setUserInfo(values);
        popupEditProfile.close();
    }
})

popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm({
    popupSelector: '.popup_type_add',
    submit: (values) => {
        const item = {};
        item.name = values['add-title-place'];
        item.link = values['add-photo-place'];
        const placeElement = createCard(item);
        cardList.addItem(placeElement);
        popupAddCard.close();
    }
})

popupAddCard.setEventListeners();



const editPopupValidate = new FormValidator(settings, popupEditProfile._popup);
editPopupValidate.enableValidation();

const addPopupValidate = new FormValidator(settings, popupAddCard._popup);
addPopupValidate.enableValidation();
