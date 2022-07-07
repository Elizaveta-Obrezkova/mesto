class FormValidator {
  
  constructor (settings, popupElement) {
    this._settings = settings;
    this._popupElement = popupElement;
    this._buttonElement = this._popupElement.querySelector('.popup__button');
  }

_setEventListeners() {
  const inputList = Array.from(this._popupElement.querySelectorAll(this._settings.inputSelector));
  const buttonElement = this._popupElement.querySelector(this._settings.submitButtonSelector);
  this._toggleButtonState(inputList);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._checkInputValidity(inputElement);
      this._toggleButtonState(inputList);
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

_hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

_isPopupButtonInactive() {
  this._buttonElement.classList.add(this._settings.inactiveButtonClass);
  this._buttonElement.setAttribute('disabled', true);
}

_isPopupButtonActive() {
  this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
  this._buttonElement.removeAttribute('disabled')
}

_toggleButtonState(inputList) {
  if (this._hasInvalidInput(inputList)) {
    this._isPopupButtonInactive();
  }
  else {
    this._isPopupButtonActive()
  }
}

enableValidation() {
  const formList = Array.from(document.querySelectorAll(this._settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  });
};

}

export default FormValidator;