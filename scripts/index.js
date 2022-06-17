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
const popupContainers = document.querySelectorAll('.popup__container');
const placeTemplate = document.querySelector('#element-template').content;


// Открыть попап

function openPopup(item) {
    item.classList.add('popup_opened');
    document.addEventListener('mousedown', closePopupOverlay);
    document.addEventListener('keyup', closePopupEsc);
}

// Сохранить попап "Редактировать профиль"


function saveEditProfilePopup(evt) {
    evt.preventDefault()
    owner.textContent = inputOwner.value;
    aboutOwner.textContent = inputAboutOwner.value;
    closePopup(popupEditProfile);
};

// Закрыть попап

function closePopup(item) {
    item.classList.remove('popup_opened');
    document.removeEventListener('mousedowm', closePopupOverlay);
    document.removeEventListener('keyup', closePopupEsc);
};

function closePopupClick(evt) {
    closePopup(evt.target.closest('.popup'));
};

closePopupButtons.forEach(button => {
    button.addEventListener('click', closePopupClick);
});

function closePopupOverlay(evt) {
    if (evt.target.classList.contains('popup') && !evt.target.classList.contains('popup__container')) {
        closePopupClick(evt);
    }
};

function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    }
};

// Создать карточку на странице

function createCard(card) {
    const placeElement = placeTemplate.querySelector('.element').cloneNode(true)
    const photo = placeElement.querySelector('.element__photo')
    photo.src = card.link;
    placeElement.querySelector('.element__title').textContent = card.name;
    photo.alt = card.name;
    
    const likeButton = placeElement.querySelector('.button-like')
    likeButton.addEventListener('click', function (evt) {
        evt.target.classList.toggle('button-like_active');
    });

    photo.addEventListener('click', function () {
        openPopup (popupSeeCard)
        seePhotoImage.src = card.link;
        imagesTitle.textContent = card.name;
        seePhotoImage.alt = card.name;
    });

    const deleteButton = placeElement.querySelector('.button-delete')
    deleteButton.addEventListener('click', function (evt) {
        const card = evt.target.closest('.element');
        card.remove();
    });
    
    return placeElement;
}

//Добавить карточку на страницу

function renderPlace (Element) {
    cardsContainer.prepend(Element);
}

// Сохранить "Новое место"


function saveAddPlace(evt) {
    evt.preventDefault()
    const card = {link: src.value, name:title.value};
    const cardElement = createCard(card);
    const buttonAddPlace = popupAddCard.querySelector('.popup__button');
    renderPlace(cardElement);
    formAddCardPopup.reset();
    closePopup(popupAddCard);
    isPopupButtonInactive(buttonAddPlace, settings);
}


editProfileButton.addEventListener('click', function () {
    inputOwner.value = owner.textContent;
    inputAboutOwner.value = aboutOwner.textContent;
    const buttonEditProfile = popupEditProfile.querySelector('.popup__button');
    openPopup(popupEditProfile);
    isPopupButtonActive(buttonEditProfile, settings);
});

addCardButton.addEventListener('click', function () {
    openPopup(popupAddCard);
});

formEditProfilePopup.addEventListener('submit', saveEditProfilePopup);

initialCards.forEach((card) => {
    const cardElement = createCard(card)
    renderPlace(cardElement);
    });

formAddCardPopup.addEventListener('submit', saveAddPlace);

