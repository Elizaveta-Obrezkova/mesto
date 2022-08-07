const editProfileButton = document.querySelector('.edit-button_type_profile-info');
const updateAvatarButton = document.querySelector('.edit-button_type_update-avatar');
const addCardButton = document.querySelector('.add-button');
const inputOwner = document.querySelector('.popup__input_name_owner');
const inputAboutOwner = document.querySelector('.popup__input_name_about-owner');
const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'error-message_active'
}
const userData = {};
const host = 'https://mesto.nomoreparties.co';
const token = '0c92a17d-ab7c-45c7-b476-e80d1afdd752';

/* const initialCards = [
    {
        name: 'Зеленоградск',
        link: 'https://images.unsplash.com/photo-1627912878381-7604c488054b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    },
    {
        name: 'Тарховка',
        link: 'https://images.unsplash.com/photo-1590079020499-832a755ee71e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
    },
    {
        name: 'Сулакский каньон',
        link: 'https://images.unsplash.com/photo-1598535222392-28363ab684fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    },
    {
        name: 'Санкт-Петербург',
        link: 'https://images.unsplash.com/photo-1628664508562-59d557172257?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    },
    {
        name: 'Москва. Савёловская',
        link: 'https://images.unsplash.com/photo-1628227361602-eedff53b595a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    },
    {
        name: 'Республика Карелия',
        link: 'https://images.unsplash.com/photo-1590079019458-0eb5b40a3371?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    }
]; */

export { editProfileButton, addCardButton, inputOwner, inputAboutOwner, settings, host, token, updateAvatarButton, userData}