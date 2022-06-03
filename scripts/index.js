// Открыть попап
const editButton = document.querySelector('.edit-button');
const popup = document.querySelectorAll('.popup');
const popupArray = Array.from(popup);
const addButton = document.querySelector('.add-button');


function openPopup(item) {
    item.classList.add('popup_opened')
    InputOwner.value = owner.textContent;
    InputAboutOwner.value = aboutOwner.textContent;

    const closePopup = item.querySelector('.popup__close');
    closePopup.addEventListener('click', function (evt) {
        evt.target.closest('.popup').classList.remove('popup_opened');
        src.value = '';
        title.value = '';
    });
}

editButton.addEventListener('click', function () {
    openPopup(popupArray.find(function (item) {
        return item.classList.contains('popup_type_edit')
    }));
});

addButton.addEventListener('click', function () {
    openPopup(popupArray.find(function (item) {
        return item.classList.contains('popup_type_add')
    }));
});

// Сохранить попап "Редактировать профиль"

const formEditPopup = document.querySelector('.popup__form_type_edit')
const owner = document.querySelector('.profile-owner');
const aboutOwner = document.querySelector('.profile-info__about-owner');
const InputOwner = document.querySelector('.popup__input_name_owner');
const InputAboutOwner = document.querySelector('.popup__input_name_about-owner');

function popupSaveEdit(evt) {
    evt.preventDefault()
    owner.textContent = InputOwner.value;
    aboutOwner.textContent = InputAboutOwner.value;
    popupClose(popupArray.find(function (item) {
        return item.classList.contains('popup_type_edit')

    }));
};

formEditPopup.addEventListener('submit', popupSaveEdit);

// Закрыть попап

function popupClose(item) {
    item.classList.remove('popup_opened');
};

// Действия с карточками на странице (добавить, лайкнуть, удалить)
const placeContainer = document.querySelector('.elements')
const Images = document.querySelector('.photo-card__images');
const ImagesTitle = document.querySelector('.photo-card__title');
const initialCards = [
    {
        name: 'Зеленоградск',
        link: 'https://images.unsplash.com/photo-1627912878381-7604c488054b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    },
    {
        name: 'Тарховка',
        link: 'https://images.unsplash.com/photo-1590079020499-832a755ee71e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
    },
    {
        name: 'Сулакский каньон',
        link: 'https://images.unsplash.com/photo-1598535222392-28363ab684fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    },
    {
        name: 'Санкт-Петербург',
        link: 'https://images.unsplash.com/photo-1628664508562-59d557172257?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    },
    {
        name: 'Москва. Савёловская',
        link: 'https://images.unsplash.com/photo-1628227361602-eedff53b595a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    },
    {
        name: 'Республика Карелия',
        link: 'https://images.unsplash.com/photo-1590079019458-0eb5b40a3371?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    }
];

function addPlace(srcValue, titleValue) {
    const placeTemplate = document.querySelector('#element-template').content;
    const placeElement = placeTemplate.querySelector('.element').cloneNode(true)

    placeElement.querySelector('.element__photo').src = srcValue;
    placeElement.querySelector('.element__title').textContent = titleValue;

    const likeButton = placeElement.querySelector('.button-like')
    likeButton.addEventListener('click', function (evt) {
        evt.target.classList.toggle('button-like_active');
    });

    const photo = placeElement.querySelector('.element__photo')
    photo.addEventListener('click', function (evt) {
        const ImagesSrc = evt.target.src;
        const TitleCard = evt.target.closest('.element').querySelector('.element__title').textContent;
        const popupPhoto = document.querySelector('.popup_type_see-photo');
        popupPhoto.classList.add('popup_opened');

        Images.src = ImagesSrc;
        ImagesTitle.textContent = TitleCard;

        const closePopup = popupPhoto.querySelector('.popup__close');
        closePopup.addEventListener('click', function (evt) {
            evt.target.closest('.popup').classList.remove('popup_opened');
        });
    });


    const DeleteButton = placeElement.querySelector('.button-delete')
    DeleteButton.addEventListener('click', function (evt) {
        const card = evt.target.closest('.element');
        card.remove();
    });

    placeContainer.prepend(placeElement);

    popupClose(popupArray.find(function (item) {
        return item.classList.contains('popup_type_add')
    }));
}

initialCards.forEach(function (item) {
    addPlace(item.link, item.name);
})

// Сохранить "Новое место"

const formAddPopup = document.querySelector('.popup__form_type_add');
const src = document.querySelector('.popup__input_name_photo-place');
const title = document.querySelector('.popup__input_name_title-place');

function SaveAddPlace(evt) {
    evt.preventDefault()

    addPlace(src.value, title.value);

    src.value = '';
    title.value = '';
}

formAddPopup.addEventListener('submit', SaveAddPlace);

