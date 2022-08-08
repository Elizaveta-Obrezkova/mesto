import './index.css';
import { editProfileButton, addCardButton, inputOwner, inputAboutOwner, settings, host, token, updateAvatarButton, userData} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDeleteCard from '../components/PopupDeleteCard.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

// Создание карточки

const popupImage = new PopupWithImage('.popup_type_see-photo');
popupImage.setEventListeners();

function createCard(item) {
    const card = new Card({
        data: item,
        selector: '#element-template',
        openPopupPlace: (name, link) => {
            popupImage.open(name, link);
        },
        openPopupDeleteCard: (card, cardId) => {
            popupDeleteCard.open();
            popupDeleteCard.setCard(card, cardId);
        },
        likeCard: (cardId) => {
            api.likeCard(cardId)
            .then((res) => { 
                card.likeInfo(res.likes.length);
                card.addLike();
        })
            .catch((err)=> {console.log(err);});
        },
        deleteLike: (cardId) => {
            api.deleteLike(cardId)
            .then((res) => { 
                card.likeInfo(res.likes.length);
                card.removeLike();
        })
            .catch((err)=> {console.log(err);});
        }
    }, userData.id
    );
    const placeElement = card.createCard();
    return placeElement
};

const userInfo = new UserInfo({
    ownerSelector: '.profile-owner',
    aboutOwnerSelector: '.profile-info__about-owner',
    avatarSelector: '.avatar'
});

editProfileButton.addEventListener('click', () => {
    editPopupValidate.resetValidation();
    const user = userInfo.getUserInfo();
    inputOwner.value = user['owner'];
    inputAboutOwner.value = user['aboutOwner'];
    popupEditProfile.open();
    editPopupValidate.isPopupButtonActive();
});

addCardButton.addEventListener('click', function () {
    addPopupValidate.resetValidation();
    popupAddCard.open();
    addPopupValidate.isPopupButtonInactive();
});

updateAvatarButton.addEventListener('click', () => {
    updateAvatarPopupValidate.resetValidation();
    popupUpdateProfile.open();
    updateAvatarPopupValidate.isPopupButtonInactive();
});

const popupUpdateProfile = new PopupWithForm({
    popupSelector: '.popup_type_update-avatar',
    submit: (values) => {
        popupUpdateProfile.renderLoading(true);
        const info = {};
        info.avatar = values['update-photo-avatar'];
        api.updateAvatar(info)
        .then((info) => {
            userInfo.setUserInfo(info);
            popupUpdateProfile.close();
        })
        .catch((err)=>{
            console.log(err);
        })
        .finally(() => {popupUpdateProfile.renderLoading(false);})
    }
})

popupUpdateProfile.setEventListeners();

const updateAvatarPopupValidate = new FormValidator(settings, popupUpdateProfile._popup);
updateAvatarPopupValidate.enableValidation();

const popupEditProfile = new PopupWithForm({
    popupSelector: '.popup_type_edit',
    submit: (values) => {
        popupEditProfile.renderLoading(true);
        const info = {};
        info.name = values['edit-name-owner'];
        info.about = values['edit-about-owner'];
        console.log(info);
        api.editUserinfo(info)
        .then((info) => {
            userInfo.setUserInfo(info);
            popupEditProfile.close();
        })
        .catch((err)=>{
            console.log(err);
        })
        .finally(() => {popupEditProfile.renderLoading(false);})
    }
})

popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm({
    popupSelector: '.popup_type_add',
    submit: (values) => {
        popupAddCard.renderLoading(true);
        const item = {};
        item.name = values['add-title-place'];
        item.link = values['add-photo-place'];
        api.createCard(item)
        .then((item) => {
            const placeElement = createCard(item);
            cardList.addItem(placeElement);
            popupAddCard.close();
        })
        .catch((err)=>{
            console.log(err);
        })
        .finally(() => {popupAddCard.renderLoading(false);})
    }
})

popupAddCard.setEventListeners();

const popupDeleteCard = new PopupDeleteCard({
    popupSelector: '.popup_type_delete-card',
    submit: (card, id) => {
        popupDeleteCard.renderLoading(true);
        api.deleteCard(id)
        .then(()=> {
            card.remove();
            popupDeleteCard.close();
        })
        .catch((err)=>{
            console.log(err);
        })
        .finally(() => {popupDeleteCard.renderLoading(false);});
    }
})

popupDeleteCard.setEventListeners();

const editPopupValidate = new FormValidator(settings, popupEditProfile._popup);
editPopupValidate.enableValidation();

const addPopupValidate = new FormValidator(settings, popupAddCard._popup);
addPopupValidate.enableValidation();

const cardList = new Section({
    renderer: (carditem) => {
        const placeElement = createCard(carditem);
        cardList.addItem(placeElement);
    }
},
    '.elements');

const api = new Api(host, token);

Promise.all([
	api.getCards(),
	api.getUserData(),
])
	.then(([items, values]) => {
        userData.id = values._id;
        cardList.renderItems(items);	
        userInfo.setUserInfo(values);       
	})
	.catch((err)=>{
		console.log(err);
	})


