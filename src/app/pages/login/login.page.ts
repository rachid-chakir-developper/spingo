import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CheckLoginService } from '../../services/check-login.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private storage: Storage,
    private router: Router,
    private loadingController: LoadingController,
    private checkLogin: CheckLoginService
  ) { }

  ngOnInit() {
  }
  logMeIn(form: NgForm) {
    this.presentLoading('Connexion en cours').then( () => {
      this.checkLogin.loginUser(form.value).subscribe(
        (resultat) => {
          this.dismissLoading().then( () => {
            this.router.navigate(['/app' , 'tabs', 'dashboard']);
          });
        },
        (error: any) => {
          this.dismissLoading().then( () => {
            alert('Mauvais login ou mot de passe');
          });
        }
      );
    });
    // this.storage.set('loggedIn', true);
    /* this.presentLoading('Connexion en cours').then( () => {
      this.checkLogin.isUserLoggedIn().then( () => {
        this.dismissLoading().then( () => {
          this.router.navigate(['/admin' , 'dashboard']);
        });
      }).catch( () => {
        alert('Une erreur s\'est produite');
      });
    }); */

  }
  async presentLoading(message: string) {
     const loading = await this.loadingController.create({
      message: message
    });
    await loading.present();
  }

  async dismissLoading() {
    this.loadingController.dismiss();
  }
}
