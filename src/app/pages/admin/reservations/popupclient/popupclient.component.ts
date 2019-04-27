import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonList } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ClientService } from 'src/app/services/client.service';
import { OutilsService } from 'src/app/services/outils.service';

@Component({
  selector: 'app-popupclient',
  templateUrl: './popupclient.component.html',
  styleUrls: ['./popupclient.component.scss'],
})
export class PopupclientComponent implements OnInit {
  formErrors: any;
  formCreateClient = this.formBuilder.group(
    {
      prenom: [''],
      nom: [''],
      dateNaissance: [''],
      nationalite: [''],
      email: [''],
      telephone: [''],
      adresseMaroc: [''],
      adresseEtranger: [''],
      CIN: [''],
      dateLivraisonCIN: [''],
      numeroPermis: [''],
      dateLivraisonPermis: [''],
      numeroPassport: [''],
      dateLivraisonPassport: [''],
      dateEntreeMaroc: [''],
      numeroEntree: [''],
      etat: ['Normal'],
      photoPassport: [''],
      photoIdentite: [''],
      photopermis: [''],
    });

    cameraOptions: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    buttonLabels = ['Depuis la caméra', 'Depuis la librairie'];
    actionOptions: ActionSheetOptions = {
      title: `Source de l'image`,
      subtitle: 'Merci de choisir une action',
      buttonLabels: this.buttonLabels,
      addCancelButtonWithLabel: 'Annuler',
      androidTheme: 1
    };
    libraryOptions = {
      quality: 80,
      maximumImagesCount: 1,
      outputType: 1
    };

@ViewChild('listPhotoClient') listPhotoClient: IonList;

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private camera: Camera,
    private actionSheet: ActionSheet,
    private imagePicker: ImagePicker,
    private clientService: ClientService,
    private outils: OutilsService
    ) { }

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

  createClient() {
    this.formErrors = [];
    this.outils.presentLoading('Traitement en cours, cela risque de prendre une minute ...').then( () => {
    this.clientService.createClient(this.formCreateClient).subscribe((result) => {
      this.outils.dismissLoading().then(() => {
        alert('Client ajouté avec succès !');
        this.modalCtrl.dismiss(result);
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

  takePhoto(field) {
    this.camera.getPicture(this.cameraOptions).then((imageData) => {
      switch ( field ) {
        case 'photoIdentite' : this.formCreateClient.get('photoIdentite').setValue('data:image/jpeg;base64,' + imageData); break;
        case 'photoPassport' : this.formCreateClient.get('photoPassport').setValue('data:image/jpeg;base64,' + imageData); break;
        case 'photopermis' : this.formCreateClient.get('photopermis').setValue('data:image/jpeg;base64,' + imageData); break;
      }

     }, (err) => {
       if (err === 'has no access to camera') {
        alert(`Merci d'autoriser l'accès à votre caméra`);
       }
     });
  }

  choosePhoto( field ) {

    this.imagePicker.hasReadPermission().then(result => {
      if (result) {
      this.imagePicker.getPictures(this.libraryOptions).then((results) => {
        console.log(results);
        if (results[0]) {
          switch ( field ) {
            case 'photoIdentite' : this.formCreateClient.get('photoIdentite').setValue('data:image/jpeg;base64,' + results[0]); break;
            case 'photoPassport' : this.formCreateClient.get('photoPassport').setValue('data:image/jpeg;base64,' + results[0]); break;
            case 'photopermis' : this.formCreateClient.get('photopermis').setValue('data:image/jpeg;base64,' + results[0]); break;
          }
        }
      }, (err) => {
        alert(JSON.stringify(err));
      });
      } else {
        this.imagePicker.requestReadPermission();
        alert(`Accès refusé. Changez dans réglages > Spingo >  Photos > Lecture et écriture.`);
      }
    },
    (error) => {
      alert(JSON.stringify(error));
    });
  }
  chooseAction( field ) {
    this.actionSheet.show(this.actionOptions).then((buttonIndex: number) => {
      if (buttonIndex === 1) { this.takePhoto(field); }
      if (buttonIndex === 2) { this.choosePhoto(field); }
    });
  }
  deletePhoto(namePhoto) {
    this.listPhotoClient.closeSlidingItems();
    this.formCreateClient.get(namePhoto).setValue('');
  }
}
