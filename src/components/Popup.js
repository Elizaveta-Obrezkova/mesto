export default class Popup {
    constructor (popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._buttonClose = this._popup.querySelector('.popup__close');
    }

    open () {
        this._popup.classList.add('popup_opened')
    }

    close() {
        this._popup.classList.remove('popup_opened')
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
        document.addEventListener('mousedown', (evt) => {
            this._closePopupOverlay(evt)
        });
        document.addEventListener('keyup', (evt) => {
            this._handleEscClose(evt)
        });
        this._buttonClose.addEventListener('click', () => {
            this.close();
        })
    }

}