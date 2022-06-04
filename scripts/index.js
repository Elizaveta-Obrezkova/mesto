// Объявляем переменные
const editProfileButton = document.querySelector('.edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit')
const popupAddCard = document.querySelector('.popup_type_add')
const popupSeeCard = document.querySelector('.popup_type_see-photo')
const addCardButton = document.querySelector('.add-button');
const formEditProfilePopup = document.querySelector('.popup__form_type_edit')
const owner = document.querySelector('.profile-owner');
const aboutOwner = document.querySelector('.profile-info__about-owner');
const inputOwner = document.querySelector('.popup__input_name_owner');
const inputAboutOwner = document.querySelector('.popup__input_name_about-owner');
const cardsContainer = document.querySelector('.elements')
const seePhotoImage = document.querySelector('.photo-card__images');
const imagesTitle = document.querySelector('.photo-card__title');
const formAddCardPopup = document.querySelector('.popup__form_type_add');
const src = document.querySelector('.popup__input_name_photo-place');
const title = document.querySelector('.popup__input_name_title-place');
const closePopupButtons = document.querySelectorAll('.popup__close');
const placeTemplate = document.querySelector('#element-template').content;


// Открыть попап

function openPopup(item) {
    item.classList.add('popup_opened')
}

// Сохранить попап "Редактировать профиль"


function saveEditProfilepopup(evt) {
    evt.preventDefault()
    owner.textContent = inputOwner.value;
    aboutOwner.textContent = inputAboutOwner.value;
    closePopup(popupEditProfile);
};

// Закрыть попап

function closePopup(item) {
    item.classList.remove('popup_opened');
};

function closePopupClick(evt) {
    closePopup(evt.target.closest('.popup'));
    if (evt.target.closest('.popup').classList.contains('popup_type_add') === true) {
    formAddCardPopup.reset();
    }
};

closePopupButtons.forEach(button => {
    button.addEventListener('click', closePopupClick);

});

// Действия с карточками на странице (добавить, лайкнуть, удалить)

function addPlace(card) {
    const placeElement = placeTemplate.querySelector('.element').cloneNode(true)

    placeElement.querySelector('.element__photo').src = card.link;
    placeElement.querySelector('.element__title').textContent = card.name;

    const likeButton = placeElement.querySelector('.button-like')
    likeButton.addEventListener('click', function (evt) {
        evt.target.classList.toggle('button-like_active');
    });

    const photo = placeElement.querySelector('.element__photo')
    photo.addEventListener('click', function (evt) {
        const imagesSrc = evt.target.src;
        const titleCard = evt.target.closest('.element').querySelector('.element__title').textContent;
        openPopup (popupSeeCard)
        seePhotoImage.src = imagesSrc;
        imagesTitle.textContent = titleCard;
    });

    const DeleteButton = placeElement.querySelector('.button-delete')
    DeleteButton.addEventListener('click', function (evt) {
        const card = evt.target.closest('.element');
        card.remove();
    });

    return placeElement;
}


// Сохранить "Новое место"


function saveAddPlace(evt) {
    evt.preventDefault()
    const card = {};
    card.link = src.value;
    card.name = title.value;
    const cardElement = addPlace(card);
    cardsContainer.prepend(cardElement);
    closePopup(popupAddCard);

    src.value = '';
    title.value = '';
}


editProfileButton.addEventListener('click', function () {
    inputOwner.value = owner.textContent;
    inputAboutOwner.value = aboutOwner.textContent;
    openPopup(popupEditProfile);
});

addCardButton.addEventListener('click', function () {
    openPopup(popupAddCard);
});

formEditProfilePopup.addEventListener('submit', saveEditProfilepopup);

initialCards.forEach((card) => {
const cardElement = addPlace(card)
cardsContainer.prepend(cardElement);
});

formAddCardPopup.addEventListener('submit', saveAddPlace);

