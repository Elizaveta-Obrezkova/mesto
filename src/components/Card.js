export default class Card {
    constructor({data, selector, openPopupPlace, openPopupDeleteCard, likeCard, deleteLike}, userProfileId) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._cardId = data._id;
        this._ownerId = data.owner._id;
        this._template = selector;
        this._openPopupPlace = openPopupPlace;
        this._openPopupDeleteCard = openPopupDeleteCard;
        this._likeCard = likeCard;
        this._deleteLike = deleteLike;  
        this._userProfileId = userProfileId;
    }

    _showTrash() {
        if (`${this._ownerId}` != `${this._userProfileId}`)
        {this._trash.remove();}
    }

    likeInfo(likes) {
        this._likeInfo.textContent = `${likes}`;
    }

    addLike(){
        this._buttonLike.classList.add('button-like_active');
    }

    removeLike() {
        this._buttonLike.classList.remove('button-like_active');
    }

    _showLike(id) {
        if (this._likes.some(function (item) {return item._id === id}))
        {this._buttonLike.classList.add('button-like_active');}
    }

    _getTemplate() {
        const placeElement = document.querySelector(this._template).content.querySelector('.element').cloneNode(true);
        return placeElement;
    }

    createCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._photo.src = this._link;
        this._photo.alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;
        this._showTrash();
        this._showLike(this._userProfileId);
        this.likeInfo(this._likes.length);
        return this._element;
    }

    _setEventListeners() {
        this._likeInfo = this._element.querySelector('.element__like-counter');
        this._buttonLike = this._element.querySelector('.button-like');
        this._photo =  this._element.querySelector('.element__photo');
        this._trash = this._element.querySelector('.button-delete');

        this._buttonLike.addEventListener('click', () => {
            if(!this._buttonLike.classList.contains('button-like_active'))
            {this._likeCard(this._cardId);}
            else {this._deleteLike(this._cardId);}
        });
        this._trash.addEventListener('click', () => {
            this._openPopupDeleteCard(this._element, this._cardId);
        });
        this._photo.addEventListener('click', () => {
            this._openPopupPlace(this._name, this._link);
        });
    }
    
}