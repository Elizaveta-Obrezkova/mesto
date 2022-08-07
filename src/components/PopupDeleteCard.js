import Popup from './Popup.js';

export default class PopupDeleteCard extends Popup {
    constructor ({popupSelector, submit}) {
        super (popupSelector);
        this._submit = submit;
        this._submitButton = this._popup.querySelector('.popup__button');
        this._text = this._submitButton.textContent;
        this._form = this._popup.querySelector('.popup__form');
    }

    setCard(card, cardId) {
        this._card = card;
        this._cardId = cardId;
    }

    renderLoading(isLoading) {
        const textButton = this._submitButton.textContent;
        if (isLoading) {
            this._submitButton.textContent = 'Сохранение...';
        }
        else {
            this._submitButton.textContent = this._text;
        }
    }

    setEventListeners(evt) {
        super.setEventListeners(evt);
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submit(this._card, this._cardId);
        });
    }

}