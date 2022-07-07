class FormValidator {
  
  constructor (settings, popupElement) {
    this._settings = settings;
    this._popupElement = popupElement;
    this._buttonElement = this._popupElement.querySelector('.popup__button');
    this._inputList = Array.from(this._popupElement.querySelectorAll(this._settings.inputSelector));
  }

_setEventListeners() {
  this._toggleButtonState(this._inputList);
  this._inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._checkInputValidity(inputElement);
      this._toggleButtonState(this._inputList);
    });
  });
};

_checkInputValidity(inputElement) {
  if (!inputElement.validity.valid) {
    this._showInputError(inputElement, inputElement.validationMessage);
  } else {
    this._hideInputError(inputElement);
  };
};

_showInputError(inputElement, errorMessage) {
const errorElement = this._popupElement.querySelector(`#error-${inputElement.id}`);
inputElement.classList.add(this._settings.inputErrorClass);
errorElement.textContent = errorMessage;
errorElement.classList.add(this._settings.errorClass);
};

_hideInputError(inputElement) {
const errorElement = this._popupElement.querySelector(`#error-${inputElement.id}`);
inputElement.classList.remove(this._settings.inputErrorClass);
errorElement.classList.remove(this._settings.errorClass);
errorElement.textContent = '';
};

_hasInvalidInput() {
  return this._inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

isPopupButtonInactive() {
  this._buttonElement.classList.add(this._settings.inactiveButtonClass);
  this._buttonElement.setAttribute('disabled', true);
}

isPopupButtonActive() {
  this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
  this._buttonElement.removeAttribute('disabled')
}

_toggleButtonState(inputList) {
  if (this._hasInvalidInput()) {
    this.isPopupButtonInactive();
  }
  else {
    this.isPopupButtonActive()
  }
}

resetValidation() {
    this._inputList.forEach((inputElement) => {
    this._hideInputError(inputElement)
  });

}

enableValidation() {
  this._popupElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
};

}

export default FormValidator;