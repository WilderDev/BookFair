import { Component, OnDestroy, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/user.model';
import { HTTPService } from '../http/http.service';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  collapsed = true;

  constructor(
    private httpService: HTTPService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currUser.subscribe((user: User) => {
      // !! BANG BANG => Boolean
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.authService.currUser.unsubscribe();
  }

  onSignOut() {
    this.authService.signOut();
  }

  onSaveData() {
    this.httpService.saveBooksToFirebase();
  }

  onFetchData() {
    this.httpService.fetchBooksFromFirebase().subscribe();
  }
}
