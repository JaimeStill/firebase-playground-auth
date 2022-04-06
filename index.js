import './style.css';
import { combineLatest } from 'rxjs';

import {
  AuthManager,
  FirebaseApp,
  signin,
  signout,
  hideLoading,
  showLoading,
  hideError,
  showError,
  hideSignin,
  showSignin,
  hideUser,
  showUser,
} from './app';

const firebaseApp = new FirebaseApp();
const authManager = new AuthManager(firebaseApp.app);

const sub = combineLatest({
  loading: authManager.loading$,
  identity: authManager.identity$,
  error: authManager.error$,
})
.subscribe((event) => {
  if (event.loading) {
    showLoading();
    hideUser();
    hideSignin();
    hideError();
  } else {
    hideLoading();

    if (event.error) showError(event.error);
    else hideError();

    if (event.identity?.user) {
      hideSignin();
      showUser(event.identity.user);
    } else {
      hideUser();
      showSignin();
    }
  }
});

signin.addEventListener('click', authManager.signin);
signout.addEventListener('click', authManager.signout);
window.addEventListener('beforeunload', () => sub.unsubscribe());
