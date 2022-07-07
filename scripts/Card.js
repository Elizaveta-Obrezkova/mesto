import {openPopup} from './index.js';

export default class Card {
    constructor(data, selector) {
        this._name = data.name;
        this._link = data.link;
        this._template = selector; 
    }

    _setEventListeners() {
        this._element.querySelector('.button-like').addEventListener('click', () => {
            this._likeCard();
        });
        this._element.querySelector('.button-delete').addEventListener('click', () => {
            this._deleteCard();
        });
        this._element.querySelector('.element__photo').addEventListener('click', () => {
            this._openPopup();
        });
    }

    _likeCard() {
        this._element.querySelector('.button-like').classList.toggle('button-like_active');
    }

    _deleteCard() {
        this._element.closest('.element').remove();
    }

    _openPopup() {
        const popupSeeCard = document.querySelector('.popup_type_see-photo')
        openPopup(popupSeeCard);
        const seePhotoImage = document.querySelector('.photo-card__images');
        const imagesTitle = document.querySelector('.photo-card__title');
        seePhotoImage.src = this._link;
        imagesTitle.textContent = this._name;
        seePhotoImage.alt = this._name;
    }

    _getTemplate() {
        const placeElement = document.querySelector(this._template).content.querySelector('.element').cloneNode(true);
        return placeElement;
    }

    createCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.element__photo').src = this._link;
        this._element.querySelector('.element__photo').alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;

        return this._element;
    }

}