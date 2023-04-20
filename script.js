const toggleButton = document.querySelector('button[name="toggle_password"]');
const inputFields = document.querySelectorAll('input');
const inputPassword = document.querySelector('input[name="password"]');
const inputConfirmPassword = document.querySelector('input[name="password_confirm"]');
const pwRequirementList = document.querySelectorAll('li');
let pwRequirements = [false, false, false, false];

function checkConfirmation(ev) {
  const pwConfirmed = ev.target.value === inputPassword.value ? true : false;
  if (pwConfirmed) {
    inputConfirmPassword.setCustomValidity('');
  } else {
    inputConfirmPassword.setCustomValidity('You should repeat your chosen password!');
  }
}

function checkPassword(ev) {
  ev.target.value.length >= ev.target.minLength ?
    pwRequirementList[0].classList.add('passed') :
    pwRequirementList[0].classList.remove('passed');
  /[A-Z]/.test(ev.target.value) ?
    pwRequirementList[1].classList.add('passed') :
    pwRequirementList[1].classList.remove('passed');
  /[\W]/.test(ev.target.value) ?
    pwRequirementList[2].classList.add('passed') :
    pwRequirementList[2].classList.remove('passed');
  /[0-9]/.test(ev.target.value) ?
    pwRequirementList[3].classList.add('passed') :
    pwRequirementList[3].classList.remove('passed');
  pwRequirements[0] = ev.target.value.length >= ev.target.minLength;
  pwRequirements[1] = /[A-Z]/.test(ev.target.value);
  pwRequirements[2] = /[\W]/.test(ev.target.value);
  pwRequirements[3] = /[0-9]/.test(ev.target.value);
  if (pwRequirements.every( req => req === true)) {
    inputPassword.setCustomValidity('');
  } else {
    inputPassword.setCustomValidity('your password should have a length of at least 8 signs, and must consist of upper- and lowercase letters, special characters and digits!');
  }
}

function simpleValidityCheck(ev) {
  const isValid = ev.target.validity.valid;
  const message = ev.target.validationMessage;
  const validationId = ev.target.getAttribute('aria-describedby');
  const connectedValidation = validationId ? document.getElementById(validationId) : false;
  if (ev.target.value !== '' && connectedValidation && message && !isValid) {
    connectedValidation.textContent = message;
  } else {
    connectedValidation.textContent = '';
  }
}

function togglePassword() {
  if (toggleButton.textContent === String.fromCodePoint(0x1f648)) {
    toggleButton.textContent = String.fromCodePoint(0x1f435);
    toggleButton.setAttribute('title', 'hide password');
    inputPassword.setAttribute('type', 'text');
    inputConfirmPassword.setAttribute('type', 'text');
  } else {
    toggleButton.textContent = String.fromCodePoint(0x1f648);
    toggleButton.setAttribute('title', 'show password'); 
    inputPassword.setAttribute('type', 'password');
    inputConfirmPassword.setAttribute('type', 'password');
  }
}

function scrollToForm() {
  document.documentElement.scrollTo(0, document.documentElement.clientHeight);
  document.querySelector('body').classList.remove('locked');
  document.querySelector('body').removeEventListener('click', scrollToForm);
  document.querySelector('body').removeEventListener('touchstart', scrollToForm);
  document.querySelector('body').removeEventListener('keypress', scrollToForm);
}

document.querySelector('body').addEventListener('click', scrollToForm);
document.querySelector('body').addEventListener('touchstart' , scrollToForm);
document.querySelector('body').addEventListener('keypress', scrollToForm);
toggleButton.addEventListener('click', togglePassword);
inputPassword.addEventListener('input', checkPassword);
inputConfirmPassword.addEventListener('input', checkConfirmation);
inputFields.forEach( input => input.addEventListener('blur', simpleValidityCheck));
