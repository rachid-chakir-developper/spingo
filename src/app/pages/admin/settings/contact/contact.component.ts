import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { OutilsService } from 'src/app/services/outils.service';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {

  formErrors: any;
  formContact = this.formBuilder.group(
    {
      telephone: [''],
      sujet: [''],
      message: ['']
    });

  constructor(private modalCtrl: ModalController, private formBuilder: FormBuilder, private outils: OutilsService,
    private contactService: ContactService) { }

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }


  contact() {
    this.formErrors = [];
    this.outils.presentLoading('Veuillez patienter...').then( () => {
    this.contactService.contact(this.formContact).subscribe((result) => {
      this.outils.dismissLoading().then(() => {
        alert('Message envoyé avec succès');
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
  }
}
