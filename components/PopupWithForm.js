import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor ({popupSelector, submit}) {
        super (popupSelector);
        this._submit = submit;
        this._inputList = this._popup.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        this._popupValues = {};
        this._inputList.forEach(input => {
            this._popupValues[input.name] = input.value;
        });
        return this._popupValues;
    }

    close() {
        this._popup.classList.remove('popup_opened');
        this._form.reset();
    }

    setEventListeners(evt) {
        this._form = this._popup.querySelector('.popup__form');
        super.setEventListeners(evt);
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submit(this._getInputValues());
            this._form.reset();
        });
    }

}