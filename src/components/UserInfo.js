export default class UserInfo {
    constructor({ownerSelector, aboutOwnerSelector, avatarSelector}) {
        this._owner = document.querySelector(ownerSelector);
        this._aboutOwner = document.querySelector(aboutOwnerSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        this._userInfo = {};
        this._userInfo.owner = this._owner.textContent;
        this._userInfo.aboutOwner = this._aboutOwner.textContent;
        return this._userInfo;
    }

    setUserInfo(values) {
        this._owner.textContent = values['name'];
        this._aboutOwner.textContent = values['about'];
        this._avatar.src = values['avatar'];
    }

}