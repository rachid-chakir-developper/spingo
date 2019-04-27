import { Component, OnInit, ViewChild } from '@angular/core';
import { ReservationService } from '../../../../services/reservation.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { IonList, AlertController } from '@ionic/angular';
import { Globals } from '../../../../globals';
import { OutilsService } from '../../../../services/outils.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contrat',
  templateUrl: './contrat.page.html',
  styleUrls: ['./contrat.page.scss'],
})
export class ContratPage implements OnInit {
  idContrat;
  formErrors: any;
  photos: any[] = [];
  etatrecuperation: any[] = [];
  photosPicker: any[] = [];
  etatrecuperationPicker: any[] = [];
  contratForm = this.formBuilder.group({
    date : [''],
    prenom2: [''],
    nom2 : [''],
    datenaissance2 : [''],
    lieunaissance2 : [''],
    nationalite2 : [''],
    numeropermis2 : [''],
    datepermis2 : [''],
    adresseetranger2 : [''],
    cin2 : [''],
    datecin2 : [''],
    numpassport2 : [''],
    datepassport2 : [''],
    telphone2 : [''],
    carburant : [''],
    kilometragedebut : [''],
    photos : [''],
    carburantretour : [''],
    kilometragefin : [''],
    etatrecuperation : [''],
    reservation : [''],
    });
  constructor(private resaService: ReservationService,
              private activeRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private camera: Camera,
              private actionSheet: ActionSheet,
              private imagePicker: ImagePicker,
              private alert: AlertController,
              private outils: OutilsService,
              private global: Globals,
              private http: HttpClient) { }

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

@ViewChild('listPhotoVehicule') listPhotoVehicule: IonList;

  ngOnInit() {
    this.createContrat(this.activeRoute.snapshot.paramMap.get('id'));
  }
  createContrat(id) {
    this.outils.presentLoading('Chargement en cours ...').then( () => {
      this.resaService.createContrat(id).subscribe((result) => {
        this.outils.dismissLoading().then(() => {
          this.idContrat = result.id;
          this.contratForm = this.formBuilder.group({
          date : [result.date],
          prenom2: [result.prenom2],
          nom2 : [result.nom2],
          datenaissance2 : [result.datenaissance2],
          lieunaissance2 : [result.lieunaissance2],
          nationalite2 : [result.nationalite2],
          numeropermis2 : [result.numeropermis2],
          datepermis2 : [result.datepermis2],
          adresseetranger2 : [result.adresseetranger2],
          cin2 : [result.cin2],
          datecin2 : [result.datecin2],
          numpassport2 : [result.numpassport2],
          datepassport2 : [result.datepassport2],
          telphone2 : [result.telphone2],
          carburant : [result.carburant],
          kilometragedebut : [result.kilometragedebut],
          photos : [this.photosPicker],
          carburantretour : [result.carburantretour],
          kilometragefin : [result.kilometragefin],
          etatrecuperation : [this.etatrecuperation],
          reservation : [result.reservation.id],
          });
          this.photos = result.photos ? result.photos :  [];
          this.etatrecuperation = result.etatrecuperation ? result.etatrecuperation : [];
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
  onEditContrat(form) {
    console.log(this.contratForm.value);
    this.outils.presentLoading('Traitement en cours ...').then( () => {
      this.resaService.editContrat(form, this.idContrat).subscribe((result) => {
        this.outils.dismissLoading().then(() => {
          alert('Contrat modifiée avec succès !');
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
  takePhoto(field) {
    this.camera.getPicture(this.cameraOptions).then((imageData) => {
      switch ( field ) {
        case 'photos' : this.photosPicker.push('data:image/jpeg;base64,' + imageData);
                        this.contratForm.get('photos').setValue(this.photosPicker);
                        break;
        case 'etatrecuperation' : this.etatrecuperationPicker.push('data:image/jpeg;base64,' + imageData);
                                  this.contratForm.get('etatrecuperation').setValue(this.etatrecuperationPicker);
                                  break;
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
      this.imagePicker.getPictures(this.libraryOptions).then((results: any[]) => {
        console.log(results);
        if (results.length > 0) {
          switch ( field ) {
            case 'photos' : for (let res of results) {
                                this.photosPicker.push('data:image/jpeg;base64,' + res);
                              }
                                this.contratForm.get('photos').setValue(this.photosPicker);
                            break;
            case 'etatrecuperation' : for (let res of results) {
                                          this.etatrecuperationPicker.push('data:image/jpeg;base64,' + res);
                                        }
                                          this.contratForm.get('etatrecuperation').setValue(this.etatrecuperationPicker);
                                      break;
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

  async presentAlertConfirm(namePhoto, idPhoto) {
    const alert = await this.alert.create({
      header: 'Attention !',
      message: 'Voulez vous vraiement supprimer cet élément ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Annuler');
          }
        }, {
          text: 'Oui',
          handler: () => {
            this.deletePhoto(namePhoto, idPhoto);
          }
        }
      ]
    });

    await alert.present();
  }
  async presentAlertConfirmPicker(field, namePhoto) {
    const alert = await this.alert.create({
      header: 'Attention !',
      message: 'Voulez vous vraiement supprimer cet élément ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Annuler');
          }
        }, {
          text: 'Oui',
          handler: () => {
            this.deletePhotoPicker(field, namePhoto);
          }
        }
      ]
    });

    await alert.present();
  }
  deletePhoto(namePhoto, idPhoto) {
    //this.listPhotoVehicule.closeSlidingItems();
    this.outils.presentLoading('Suppression en cours').then( () => {
      this.http.delete(this.global.GET_CONTRAT + '/' + this.idContrat + '/' + namePhoto + '/' + idPhoto).subscribe(
        (resultat) => {
          this.outils.dismissLoading().then( (res) => {
            //this.listPhotoVehicule.closeSlidingItems();
            alert('Suppression ok');
            this.createContrat(this.activeRoute.snapshot.paramMap.get('id'));

          });
        },
        (error: any) => {
          this.outils.dismissLoading().then( () => {
            alert(`Une erreur s'est produite !`);
          });
        }
      );
    });
  }
  deletePhotoPicker(field, namePhoto) {
    //this.listPhotoVehicule.closeSlidingItems();
    switch ( field ) {
      case 'photos' : this.photosPicker.splice(this.photosPicker.indexOf(namePhoto), 1);
                      this.contratForm.get('photos').setValue(this.photosPicker);
                      break;
      case 'etatrecuperation' : this.etatrecuperationPicker.splice(this.etatrecuperationPicker.indexOf(namePhoto), 1);
                                this.contratForm.get('etatrecuperation').setValue(this.etatrecuperationPicker);
                                break;
    }
  }
}
