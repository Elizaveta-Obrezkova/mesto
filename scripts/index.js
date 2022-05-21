const editButton = document.querySelector('.edit-button');
const popup = document.querySelector('.popup');
const closePopup = popup.querySelector('.popup__close');
const owner = document.querySelector('.profile-owner');
const aboutOwner = document.querySelector('.profile-info__about-owner');
const InputOwner = popup.querySelector('.popup__input_name_owner');
const InputAboutOwner = popup.querySelector('.popup__input_name_about-owner');
const formPopup = popup.querySelector('.popup__form') 

function popupOpen(){
    popup.classList.add('popup_opened')
    InputOwner.value = owner.textContent;
    InputAboutOwner.value = aboutOwner.textContent; 
}

function popupClose() {
    popup.classList.remove('popup_opened')
}

function popupSave (evt) {
    evt.preventDefault()
    owner.textContent = InputOwner.value;
    aboutOwner.textContent = InputAboutOwner.value;
    popupClose()
}

editButton.addEventListener('click', popupOpen);

closePopup.addEventListener('click', popupClose);

formPopup.addEventListener ('submit', popupSave);
