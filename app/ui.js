export const signin = document.getElementById('signin');
export const signout = document.getElementById('signout');

const loading = document.getElementById('loading');

const errorSection = document.getElementById('errorSection');
const errorCode = document.getElementById('errorCode');
const errorMessage = document.getElementById('errorMessage');

const signinSection = document.getElementById('signinSection');

const userSection = document.getElementById('userSection');
const userImg = document.getElementById('userImg');
const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');

const hide = (element) =>
  element.style.display = 'none';

const show = (element) =>
  element.style.display = 'block';

export const hideLoading = () => hide(loading);
export const showLoading = () => show(loading);

export const hideError = () => hide(errorSection);
export const showError = (error) => {
  errorCode.innerHTML = error.code;
  errorMessage.innerHTML = error.message;

  show(errorSection);
}

export const hideSignin = () => hide(signinSection);
export const showSignin = () => show(signinSection);

export const hideUser = () => hide(userSection);
export const showUser = (user) => {
  userImg.src = user.photoURL;
  userImg.alt = user.displayName;
  userName.innerHTML = user.displayName;
  userEmail.innerHTML = user.email;

  show(userSection);
}

export const init = () => {
  hideError();
  hideSignin();
  hideUser();
}