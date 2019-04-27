import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CheckLoginService } from './check-login.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor (private checkLogin: CheckLoginService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ` + user.token
        }
      });
    }
    return next.handle(request).pipe(
      tap(
        event => {
          // logging the http response to browser's console in case of a success
          if (event) {
            // console.log('api call success :', event);
          }
        },
        error => {
          // logging the http response to browser's console in case of a failuer
          if (event) {
            if (error.error.code === 401 && error.error.message !== 'Bad credentials') {
              alert('Votre session a expirée, merci de vous identifier.');
              this.checkLogin.logoutUser();
            }
          }
        }
      )
    );
  }
}
