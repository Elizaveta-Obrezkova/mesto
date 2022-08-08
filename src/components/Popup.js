export default class Popup {
    constructor (popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._buttonClose = this._popup.querySelector('.popup__close');
        this._handleEscClose = this._handleEscClose.bind(this);
        this._closePopupOverlay = this._closePopupOverlay.bind(this);
    }

    open () {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleEscClose);
        this._popup.addEventListener('mousedown', this._closePopupOverlay);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._handleEscClose);
        this._popup.removeEventListener('mousedown', this._closePopupOverlay);
    }

    _handleEscClose (evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _closePopupOverlay(evt) {
        if (evt.target.classList.contains('popup') && !evt.target.classList.contains('popup__container')) {
            this.close();
        }
    }

    setEventListeners(evt) {
        this._buttonClose.addEventListener('click', () => {
            this.close();
        })
    }

}