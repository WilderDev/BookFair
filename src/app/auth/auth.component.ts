import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"]
})
export class AuthComponent implements OnInit {
  authObs: Observable<any>;
  isSignUpMode = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onAuthModeToggle() {
    this.isSignUpMode = !this.isSignUpMode;
  }

  onAuthFormSubmit(formObj: NgForm) {
    // Destructure the formObj values
    const { email, password } = formObj.value;

    // Validation
    if (!email || !password) return;

    // Conditionally call different methods depending on what authMode we are in
    if (this.isSignUpMode == true) {
      // Attempt to Sign Up
      this.authObs = this.authService.signUpToFirebase(email, password);
    } else {
      // Attempt to Sign In
      this.authObs = this.authService.signInToFirebase(email, password);
    }

    // Observable Logic
    this.authObs.subscribe(
      (res: any) => {
        console.log("SUCCESS:", res);
        this.router.navigate(["bookshelf"]);
      },
      (err: any) => {
        console.log("ERROR:", err);
      }
    );

    // reset the form
  }
}
