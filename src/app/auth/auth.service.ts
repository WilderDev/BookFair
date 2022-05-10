import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './user.model';

const SIGN_UP_URL =
  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
const SIGN_IN_URL =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private tokenExpTimer: any;
  currUser = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {}

  signUpToFirebase(email: string, password: string): any {
    return this.http
      .post<any>(SIGN_UP_URL + environment.firebaseAPIKey, {
        email,
        password,
        returnSecureToken: true
      })
      .pipe(
        tap(res => {
          // Destructure the response object
          const { email, localId, idToken, expiresIn } = res;

          // Pass those values into a "handleAuth" method
          this.handleAuth(email, localId, idToken, +expiresIn);
        })
      );
  }

  signInToFirebase(email: string, password: string) {
    return this.http
      .post<any>(SIGN_IN_URL + environment.firebaseAPIKey, {
        email,
        password,
        returnSecureToken: true
      })
      .pipe(
        tap(res => {
          // Destructure the response object
          const { email, localId, idToken, expiresIn } = res;

          // Pass those values into a "handleAuth" method
          this.handleAuth(email, localId, idToken, +expiresIn);
        })
      );
  }

  signOut() {
    this.currUser.next(null);

    localStorage.removeItem("book_user_data");

    if (this.tokenExpTimer) clearTimeout(this.tokenExpTimer);

    this.router.navigate(["auth"]);
  }

  autoSignIn() {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (!userData) return;
    const { email, id, _token, _tokenExpirationDate } = userData;

    const loadedUser = new User(
      email,
      id,
      _token,
      new Date(_tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.currUser.next(loadedUser);

      const expDuration =
        new Date(_tokenExpirationDate).getTime() - new Date().getTime();
      this.autoSignOut(expDuration);
    }
  }

  autoSignOut(expDuration) {
    this.tokenExpTimer = setTimeout(() => {
      this.signOut();
    }, expDuration);
  }

  handleAuth(email: string, userId: string, token: string, expiresIn: number) {
    // 1. Create an Expiration Token
    const expDate = new Date(new Date().getTime() + expiresIn * 1000);

    // 1.5 Set a new Timer for the Expiration Token
    this.autoSignOut(expiresIn * 1000);

    // 2. Create a new instance of a User object using the data passed in
    const newUser = new User(email, userId, token, expDate);

    // 3. Emit/Save that in our service (as a BehaviorSubject)
    this.currUser.next(newUser);

    // 4. Save the user to local storage
    localStorage.setItem("book_user_data", JSON.stringify(newUser));
  }
}
