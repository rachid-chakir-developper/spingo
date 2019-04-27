import { Component, OnInit } from '@angular/core';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ContactComponent } from './contact/contact.component';
import { PasswordComponent } from './password/password.component';
import { CheckLoginService } from 'src/app/services/check-login.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private socialSharing: SocialSharing, private sms: SMS, private alertController: AlertController,
    private modalClient: ModalController, private checkLogin: CheckLoginService) { }

  ngOnInit() {
  }


  async share() {

    const options = {
      message: 'Télécharge Spingo! c\'est la meilleur application de gestion de location de voiture https://google.fr',
      subject: 'Télécharge Spingo APP',
      files: ['', ''], // an array of filenames either locally or remotely
      url: 'https://www.212communication.com',
      chooserTitle: 'Partager',
      appPackageName: 'com.apple.social.facebook' // Android only, you can provide id of the App you want to share with
    };

    this.socialSharing.shareWithOptions(options);
  }

  async inviteFriend() {
    const alert = await this.alertController.create({
      header: 'N° de Téléphone de votre ami',
      inputs: [
        {
          name: 'phone',
          type: 'text',
          placeholder: '0123456789'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            this.sms.send(data.phone,
              'Télécharge Spingo! c\'est la meilleur application de gestion de location de voiture https://google.fr'
              );
          }
        }
      ]
    });

    await alert.present();
  }


  async changePasswd() {
    const modal = await this.modalClient.create({
      component: PasswordComponent,
    });
    return await modal.present();
  }

  async contact() {
    const modal = await this.modalClient.create({
      component: ContactComponent,
    });
    return await modal.present();
  }

  logout() {
    this.checkLogin.logoutUser();
  }
}
