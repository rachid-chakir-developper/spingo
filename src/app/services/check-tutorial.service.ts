import { Injectable } from '@angular/core';
import { Router, CanLoad } from '@angular/router';

import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class CheckTutorialService implements CanLoad {

  constructor(private storage: Storage, private router: Router) {}

  canLoad() {
    return this.storage.get('ion_did_tutorial').then(res => {
      if (res) {
        this.storage.get('loggedIn').then(loggedIn => {
          if (loggedIn) {
            this.router.navigate(['/app' , 'tabs', 'dashboard']);
          } else {
            this.router.navigate(['/login']);
          }
        });
        return false;
      } else {
        return true;
      }
    });
  }
}
