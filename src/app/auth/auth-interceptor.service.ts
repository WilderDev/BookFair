import { exhaustMap, take } from 'rxjs';

import { HttpInterceptor, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: "root"
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: any, next: any): any {
    return this.authService.currUser.pipe(
      take(1),
      exhaustMap(user => {
        // Validate we have user
        if (!user) return next.handle(req);

        // Modify the request to contain access token
        const modifiedReq = req.clone({
          params: new HttpParams().set("auth", user.token)
        });

        // Return the modified request
        return next.handle(modifiedReq);
      })
    );
  }
}
