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
import { ActivatedRoute, Router } from '@angular/router';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-editclient',
  templateUrl: './editclient.page.html',
  styleUrls: ['./editclient.page.scss'],
})
export class EditclientPage implements OnInit {

  disableItem  = false;
  id: any;
  title: any;
  clientDetails: any;

  formErrors: any;
  formEditClient = this.formBuilder.group(
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
    editedphotopermis = false;
    editedphotoPassport = false;
    editedphotoIdentite = false;

@ViewChild('listPhotoClient') listPhotoClient: IonList;

  constructor(
    private http: HttpClient,
    private global: Globals,
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private camera: Camera,
    private actionSheet: ActionSheet,
    private imagePicker: ImagePicker,
    private clientService: ClientService,
    private outils: OutilsService,
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.title = 'Modifier un client';
      this.id = this.route.snapshot.paramMap.get('id');
    } else if (this.route.snapshot.paramMap.get('idShow')) {
      this.title = 'Détails client';
      this.id = this.route.snapshot.paramMap.get('idShow');
      this.disableItem = true;
    } else {
        this.title = 'Ajouter un client';
      }

      if (this.id) {
        this.outils.presentLoading('Chargement...').then(() => {
          this.getEditClientData();
        });
      } else {
        this.clientDetails = [];
      }
  }

  getEditClientData() {

    this.http.get(this.global.GET_CLIENT + '/' + this.id).pipe(
      tap((result: any) => {

      })
    ).subscribe(
      (resultat) => {
        this.clientDetails = resultat;

        const d0 = this.clientDetails.dateNaissance != null ? this.clientDetails.dateNaissance.split('/') : ['', '', ''];
        const d1 = this.clientDetails.dateLivraisonCIN != null ? this.clientDetails.dateLivraisonCIN.split('/') : ['', '', ''];
        const d2 = this.clientDetails.dateLivraisonPermis != null ? this.clientDetails.dateLivraisonPermis.split('/') : ['', '', ''];
        const d3 = this.clientDetails.dateLivraisonPassport != null ? this.clientDetails.dateLivraisonPassport.split('/') : ['', '', ''];
        const d4 = this.clientDetails.dateEntreeMaroc != null ? this.clientDetails.dateEntreeMaroc.split('/') : ['', '', ''];


        this.formEditClient = this.formBuilder.group(
          {
            prenom: [this.clientDetails.prenom],
      nom: [this.clientDetails.nom],
      dateNaissance: [d0[2] + '-' + d0[1] + '-' + d0[0]],
      nationalite: [this.clientDetails.nationalite],
      email: [this.clientDetails.email],
      telephone: [this.clientDetails.telephone],
      adresseMaroc: [this.clientDetails.adresseMaroc],
      adresseEtranger: [this.clientDetails.adresseEtranger],
      CIN: [this.clientDetails.CIN],
      dateLivraisonCIN: [d1[2] + '-' + d1[1] + '-' + d1[0]],
      numeroPermis: [this.clientDetails.numeroPermis],
      dateLivraisonPermis: [d2[2] + '-' + d2[1] + '-' + d2[0]],
      numeroPassport: [this.clientDetails.numeroPassport],
      dateLivraisonPassport: [d3[2] + '-' + d3[1] + '-' + d3[0]],
      dateEntreeMaroc: [d4[2] + '-' + d4[1] + '-' + d4[0]],
      numeroEntree: [this.clientDetails.numeroEntree],
      etat: [this.clientDetails.etat],
      photoPassport: [this.clientDetails.photoPassport],
      photoIdentite: [this.clientDetails.photoIdentite],
      photopermis: [this.clientDetails.photopermis],

          }
        );
        this.outils.dismissLoading();
        console.log(resultat);
      },
      (error: any) => {
          this.outils.dismissLoading();
          console.log(error);
      }
    );
  }

  updateClient(formEditClient) {

    this.formErrors = [];
    if (this.route.snapshot.paramMap.get('id')) {
      this.editClient(formEditClient);
    } else {
      this.addClient(formEditClient);
    }
  }

  editClient(formEditClient) {
    this.outils.presentLoading('Traitement en cours ...').then( () => {
      this.clientService.editClient(formEditClient, this.id).subscribe((result) => {
        this.outils.dismissLoading().then(() => {
          alert('Client modifié avec succès !');
          console.log(result);
        });
      },
      (error) => {
        console.log(error);
        this.outils.dismissLoading().then( () => {
        if (error.error.message) {
          alert(error.error.message);
          this.formErrors = error.error.errors;
          console.log(this.formErrors);
      }
      });
    });
  });
  }

  addClient(formEditClient) {
    this.formErrors = [];
    this.outils.presentLoading('Traitement en cours, cela risque de prendre une minute ...').then( () => {
    this.clientService.createClient(formEditClient).subscribe((result) => {
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
        case 'photoIdentite' : this.formEditClient.get('photoIdentite').setValue('data:image/jpeg;base64,' + imageData); break;
        case 'photoPassport' : this.formEditClient.get('photoPassport').setValue('data:image/jpeg;base64,' + imageData); break;
        case 'photopermis' : this.formEditClient.get('photopermis').setValue('data:image/jpeg;base64,' + imageData); break;
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
            case 'photoIdentite' :
              this.editedphotoIdentite = true;
              this.formEditClient.get('photoIdentite').setValue('data:image/jpeg;base64,' + results[0]); break;
            case 'photoPassport' :
              this.editedphotoPassport = true;
              this.formEditClient.get('photoPassport').setValue('data:image/jpeg;base64,' + results[0]); break;
            case 'photopermis' :
              this.editedphotopermis = true;
              this.formEditClient.get('photopermis').setValue('data:image/jpeg;base64,' + results[0]); break;
          }
        }
      }, (err) => {
        alert(JSON.stringify(err));
      });
      } else {
        this.imagePicker.requestReadPermission();
        alert(`Accès refusé. Changez dans réglages > Spingo > Photos > Lecture et écriture.`);
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
    this.formEditClient.get(namePhoto).setValue('');
  }

}
