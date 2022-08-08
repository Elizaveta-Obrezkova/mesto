import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, submit }) {
        super(popupSelector);
        this._submit = submit;
        this._inputList = this._popup.querySelectorAll('.popup__input');
        this._submitButton = this._popup.querySelector('.popup__button');
        this._text = this._submitButton.textContent;
        this._form = this._popup.querySelector('.popup__form');
    }

    renderLoading(isLoading) {
        if (isLoading) {
            this._submitButton.textContent = 'Сохранение...';
        }
        else {
            this._submitButton.textContent = this._text;
        }
    }

    _getInputValues() {
        this._popupValues = {};
        this._inputList.forEach(input => {
            this._popupValues[input.name] = input.value;
        });
        return this._popupValues;
    }

    close() {
        super.close();
        this.resetForm()
    }

    resetForm() {
        this._form.reset();
    }

    setEventListeners(evt) {
        super.setEventListeners(evt);
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submit(this._getInputValues());
        });
    }

}