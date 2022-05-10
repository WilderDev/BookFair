import { map, take } from 'rxjs';

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route, state) {
    return this.authService.currUser.pipe(
      take(1),
      map(user => {
        const isAuth = !!user;

        return isAuth ? true : this.router.createUrlTree(["auth"]);
      })
    );
  }
}
