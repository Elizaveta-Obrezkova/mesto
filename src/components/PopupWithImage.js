import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super (popupSelector);
        this._seePhotoImage = this._popup.querySelector('.photo-card__images');
        this._imagesTitle = this._popup.querySelector('.photo-card__title');
    }

    open(nameCard, link) {
        super.open();
        this._seePhotoImage.src = link;
        this._imagesTitle.textContent = nameCard;
        this._seePhotoImage.alt = nameCard;
    }
}