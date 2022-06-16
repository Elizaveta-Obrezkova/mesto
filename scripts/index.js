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
    document.addEventListener('click', closePopupOverlay);
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
        document.removeEventListener('click', closePopupOverlay);
    }
};

function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
        document.removeEventListener('keyup', closePopupEsc);
    }
};

// Создать карточку на странице

function createCard(card) {
    const placeElement = placeTemplate.querySelector('.element').cloneNode(true)

    placeElement.querySelector('.element__photo').src = card.link;
    placeElement.querySelector('.element__title').textContent = card.name;
    placeElement.querySelector('.element__photo').alt = card.name;

    const photo = placeElement.querySelector('.element__photo')
    photo.addEventListener('click', function (evt) {
        const imagesSrc = evt.target.src;
        const titleCard = evt.target.closest('.element').querySelector('.element__title').textContent;
        openPopup (popupSeeCard)
        seePhotoImage.src = imagesSrc;
        imagesTitle.textContent = titleCard;
    });
    
    return placeElement;
}

// Лайкнуть фото

cardsContainer.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('button-like')) {
   evt.target.classList.toggle('button-like_active'); 
    }
  })

// Удалить фото

cardsContainer.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('button-delete')) {
        evt.target.closest('.element').remove();
    }
  })

//Добавить карточку на страницу

function renderPlace (Element) {
    cardsContainer.prepend(Element);
}

// Сохранить "Новое место"


function saveAddPlace(evt) {
    evt.preventDefault()
    const card = {link: src.value, name:title.value};
    const cardElement = createCard(card);
    renderPlace(cardElement);
    closePopup(popupAddCard);
}


editProfileButton.addEventListener('click', function () {
    inputOwner.value = owner.textContent;
    inputAboutOwner.value = aboutOwner.textContent;
    openPopup(popupEditProfile);
});

addCardButton.addEventListener('click', function () {
    openPopup(popupAddCard);
    formAddCardPopup.reset();
});

formEditProfilePopup.addEventListener('submit', function (evt) {
    if (!hasInvalidInput(Array.from(formEditProfilePopup.querySelectorAll('.popup__input')))) {
        saveEditProfilePopup(evt);
    };
});

initialCards.forEach((card) => {
    const cardElement = createCard(card)
    renderPlace(cardElement);
    });

formAddCardPopup.addEventListener('submit', function (evt) {
    if (!hasInvalidInput(Array.from(formAddCardPopup.querySelectorAll('.popup__input')))) {
        saveAddPlace(evt);
    };
});

