
export default class Card {
    constructor(data, selector, openPopupPlace) {
        this._name = data.name;
        this._link = data.link;
        this._template = selector;
        this._openPopupPlace = openPopupPlace;
    }

    _likeCard() {
        this._element.querySelector('.button-like').classList.toggle('button-like_active');
    }

    _deleteCard() {
        this._element.closest('.element').remove();
    }

    _getTemplate() {
        const placeElement = document.querySelector(this._template).content.querySelector('.element').cloneNode(true);
        return placeElement;
    }

    createCard() {
        this._element = this._getTemplate();
        this._photo =  this._element.querySelector('.element__photo');
        this._setEventListeners();
        this._photo.src = this._link;
        this._photo.alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.button-like').addEventListener('click', () => {
            this._likeCard();
        });
        this._element.querySelector('.button-delete').addEventListener('click', () => {
            this._deleteCard();
        });
        this._photo.addEventListener('click', () => {
            this._openPopupPlace(this._name, this._link);
        });
    }
    
}