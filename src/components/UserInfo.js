export default class UserInfo {
    constructor({ownerSelector, aboutOwnerSelector}) {
        this._owner = document.querySelector(ownerSelector);
        this._aboutOwner = document.querySelector(aboutOwnerSelector);
    }

    getUserInfo() {
        this._userInfo = {};
        this._userInfo.owner = this._owner.textContent;
        this._userInfo.aboutOwner = this._aboutOwner.textContent;
        return this._userInfo;
    }

    setUserInfo(values) {
        this._owner.textContent = values['edit-name-owner'];
        this._aboutOwner.textContent = values['edit-about-owner'];
    }

}