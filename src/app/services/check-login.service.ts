import { Injectable } from '@angular/core';
import { Router, CanLoad, CanActivate } from '@angular/router';

import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Employe } from '../classes/employe';

import { Globals } from '../globals';

const httpOptions = {
  headers: new HttpHeaders ({'content-type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CheckLoginService implements CanActivate, CanLoad {

  user = new Employe();

  constructor(private storage: Storage, private router: Router, private http: HttpClient, private global: Globals) {}

  loginUser(form): Observable <any> {
    return this.http.post(this.global.URL_LOGIN, form, httpOptions).pipe(
      tap((result: any) => {
        this.user = result;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.storage.set('user', this.user).then( () => {
          console.log(result);
        });
      })
    );
  }

  isUserLoggedIn(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.storage.get('user').then((value) => {
        if (value) {
          resolve (value);
        } else {
          resolve (false);
        }
      }).catch( (error) => {
        console.log('Erreur : ' + error);
        return false;
      });
    });
  }

  logoutUser() {

    localStorage.removeItem('user');
    this.storage.remove('user').then( () => {
      this.router.navigate(['/login']);
    });
  }
  canLoad() {
    return this.isUserLoggedIn().then(res => {
      if (res) {
        this.router.navigate(['/app' , 'tabs', 'dashboard']);
        return false;
      } else {
        return true;
      }
    });
  }

  canActivate() {
    return this.isUserLoggedIn().then(res => {
      if (res) {
        return true;
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  getToken() {
    this.storage.get('user').then((user) => {
      if (user) {
        return user.token;
      }
    });
  }
}
