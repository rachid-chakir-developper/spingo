import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { OutilsService } from 'src/app/services/outils.service';
import { ProfilService } from 'src/app/services/profil.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent implements OnInit {

  formErrors: any;
  formPassword = this.formBuilder.group(
    {
      password: [''],
      password1: ['']
    });

  constructor(private modalCtrl: ModalController, private formBuilder: FormBuilder, private outils: OutilsService,
    private profilService: ProfilService) { }

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }


  updatePassword() {

    if (this.formPassword.get('password').value === '') {
      this.formErrors = {password: 'Le mot de passe ne peut pas être vide'};
    } else {
      if (this.formPassword.get('password').value === this.formPassword.get('password1').value
    ) {
        this.formErrors = [];
        this.outils.presentLoading('Veuillez patienter...').then( () => {
        this.profilService.updatePasswd(this.formPassword).subscribe((result) => {
          this.outils.dismissLoading().then(() => {
            alert('Mot de passe modifié avec succès');
            this.modalCtrl.dismiss();
          });
        },
        (error) => {
          console.log(error);
          this.outils.dismissLoading();
          if (error.error.message) {
            alert(error.error.message);
              this.formErrors = error.error.errors;
              console.log(this.formErrors);
          }
        });
      });

  } else {
    this.formErrors = {password: 'Les deux mots de passes ne correspondent pas'};
  }
    }
  }
}
