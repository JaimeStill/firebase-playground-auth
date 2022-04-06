import {
  getAuth,
  getRedirectResult,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
  updateEmail,
  updateProfile,
  GoogleAuthProvider,
} from 'firebase/auth';

import { BehaviorSubject } from 'rxjs';

export class AuthManager {
  #auth;
  #provider;
  #identity = new BehaviorSubject(null);
  #error = new BehaviorSubject(null);
  #loading = new BehaviorSubject(true);

  constructor(app) {
    this.#auth = getAuth(app);
    this.#auth.languageCode = this.auth.useDeviceLanguage();
    this.#provider = new GoogleAuthProvider();
    this.identity$ = this.#identity.asObservable();
    this.error$ = this.#error.asObservable();
    this.loading$ = this.#loading.asObservable();

    this.provider.setCustomParameters({
      login_hint: 'user@example.com',
    });

    onAuthStateChanged(this.auth, (user) => {
      this.#loading.next(false);
      this.#identity.next({ ...this.#identity.value, user });
    });

    getRedirectResult(this.auth)
      .then((result) => {
        if (result) {
          const credential = GoogleAuthProvider.credentialFromResult(result);

          this.#identity.next({
            ...this.#identity.value,
            credential,
            token: credential.accessToken
          });
        }
      })
      .catch((error) => this.#handleError(error));
  }

  get auth() {
    return this.#auth;
  }

  get provider() {
    return this.#provider;
  }

  #handleError = (error) => {
    this.#loading.next(false);
    console.error(error);

    this.error.next({
      code: error.code,
      message: error.message,
    });
  };

  #beginAction = () => {
    this.#loading.next(true);
    this.#error.next(null);
  }

  signin = () => {
    this.#beginAction();
    signInWithRedirect(this.auth, this.provider);
  }

  signout = async () => {
    try {
      this.#beginAction();
      await signOut(this.auth);
    } catch (error) {
      this.#handleError(error);
    }
  }

  logUserData = () => {
    if (this.user != null)
      /*
        displayName, email, photoURL, emailVerified, uid
      */
      console.table(this.user);
  };

  logProviderData = () => {
    if (this.user != null)
      /*
        providerId, uid, displayName, email, photoURL
      */
      user.providerData.forEach((profile) => console.table(profile));
  };

  updateEmail = async (email) => {
    if (this.user != null) {
      try {
        this.#beginAction();
        await updateEmail(this.user, email);
      } catch (error) {
        this.#handleError(error);
      }
    }
  };

  updateProfile = async (profile) => {
    if (this.user != null) {
      try {
        this.#beginAction();
        await updateProfile(this.user, profile);
      } catch (error) {
        this.#handleError(error);
      }
    }
  };
}
