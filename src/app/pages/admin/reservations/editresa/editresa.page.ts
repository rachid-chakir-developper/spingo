import { Component, OnInit } from '@angular/core';
import { PopupclientComponent } from '../popupclient/popupclient.component';
import { FormBuilder, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Globals } from '../../../../globals';
import { ActivatedRoute, Router } from '@angular/router';
import { OutilsService } from 'src/app/services/outils.service';
import { PopuplistclientComponent } from '../popuplistclient/popuplistclient.component';
import { ModalController } from '@ionic/angular';
import { PopuplistvehiculeComponent } from '../popuplistvehicule/popuplistvehicule.component';
import { PopuplistpartenaireComponent } from '../popuplistpartenaire/popuplistpartenaire.component';
import { ReservationService } from 'src/app/services/reservation.service';



@Component({
  selector: 'app-editresa',
  templateUrl: './editresa.page.html',
  styleUrls: ['./editresa.page.scss'],
})
export class EditresaPage implements OnInit {
  title: any;
  queryText: any = '';
  reservationDetails: any;
  clientName: any;
  vehiculeName: any;
  clientId: any;
  partenaireName: any;
  disableItem  = false;
  formErrors: any;
  dateExpirationValue: any;
  id: any;
  formEditResa = this.formBuilder.group(
    {
      dateDu: [''],
      dateAu: [''],
      lieuLivraison: ['Agence'],
      lieuRecuperation: ['Agence'],
      client: [''],
      vehicule : [''],
      partenaire : [''],
      prixSousLocation : [''],
      totalReglement: [''],
      miseEnPlace : [''],
      reste : [''],
      modeReglement : ['Espece'],
      observation : [''],
      etat : ['En cours'],
      typeCarte : [''],
      titulaireCarte : [''],
      dateExpiration : [''],
      cryptogramme : [''],
    }

  );

  constructor(
              private formBuilder: FormBuilder,
              private http: HttpClient,
              private global: Globals,
              private route: ActivatedRoute,
              private outils: OutilsService,
              private reservationService: ReservationService,
              private modalClient: ModalController,
              private router: Router
              ) { }

  ngOnInit() {

    if (this.route.snapshot.paramMap.get('id')) {
      this.title = 'Modifier la réservation';
      this.id = this.route.snapshot.paramMap.get('id');
    } else if (this.route.snapshot.paramMap.get('idShow')) {
      this.title = 'Détails réservation';
      this.id = this.route.snapshot.paramMap.get('idShow');
      this.disableItem = true;
    } else {
        this.title = 'Ajouter une réservation';
      }


      if (this.id) {
        this.outils.presentLoading('Chargement...').then(() => {
          this.getEditResaData();
        });
      } else {
        this.reservationDetails = [];
      }
    }
  getEditResaData() {

    this.http.get(this.global.GET_RESERVATION + '/' + this.id).pipe(
      tap((result: any) => {

      })
    ).subscribe(
      (resultat) => {
        this.reservationDetails = resultat;
        this.clientName = this.reservationDetails.client.prenom + ' ' + this.reservationDetails.client.nom;
        if (
          this.reservationDetails.vehicule &&
          this.reservationDetails.vehicule.matricule &&
          this.reservationDetails.vehicule.matricule !== ''
          ) {
          this.vehiculeName = this.reservationDetails.vehicule.designation + ' (' + this.reservationDetails.vehicule.matricule + ')' ;
        } else {
          this.vehiculeName = 'Sous Location';
        }
        if (this.reservationDetails.partenaire) {
          this.partenaireName = this.reservationDetails.partenaire.nom;
        } else {
          this.partenaireName = 'Choisir un partenaire';
        }

        let vehicule: any, partenaire: any;
        this.reservationDetails.vehicule ? vehicule = this.reservationDetails.vehicule.id : vehicule = -1;
        this.reservationDetails.partenaire ? partenaire = this.reservationDetails.partenaire.id : partenaire = -1;
        if (this.reservationDetails.dateExpiration) {
            this.dateExpirationValue = this.parseISOString(this.reservationDetails.dateExpiration).toISOString();
        } else {
          this.dateExpirationValue = '';
       }
        this.formEditResa = this.formBuilder.group(
          {
            dateDu: [this.parseISOString(this.reservationDetails.dateDu).toISOString()],
            dateAu: [this.parseISOString(this.reservationDetails.dateAu).toISOString()],
            lieuLivraison: [this.reservationDetails.lieuLivraison],
            lieuRecuperation: [this.reservationDetails.lieuRecuperation],
            client: [this.reservationDetails.client.id],
            vehicule : [vehicule],
            partenaire : [partenaire],
            prixSousLocation : [this.reservationDetails.prixSousLocation],
            totalReglement : [this.reservationDetails.totalReglement, Validators.required],
            miseEnPlace : [this.reservationDetails.miseEnPlace],
            reste : [this.reservationDetails.reste],
            modeReglement : [this.reservationDetails.modeReglement],
            observation : [this.reservationDetails.observation],
            etat : [this.reservationDetails.etat],
            typeCarte : [this.reservationDetails.typeCarte],
            titulaireCarte : [this.reservationDetails.titulaireCarte],
            dateExpiration : [this.dateExpirationValue],
            cryptogramme : [this.reservationDetails.cryptogramme]

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

  parseISOString(s) {
      const b = s.split(/\D+/);
      return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
  }
  showPopupClientAdd() {
    this.presentModalClientAdd();
  }
  showPopupChooseClient() {
    this.presentModalClientList();
  }
  async presentModalClientList() {
    if (this.reservationDetails && this.reservationDetails.client && this.reservationDetails.client.id) {
      this.clientId = this.reservationDetails.client.id;
    } else {
      this.clientId = 0;
    }
    const modal = await this.modalClient.create({
      component: PopuplistclientComponent,
      componentProps: {
        'id': this.clientId
      }
    });
    modal.onDidDismiss().then( (data: any) => {
      if (data.data) {
        this.reservationDetails.client = data.data;
        // this.reservationDetails.client.id = data.data.id;
        this.formEditResa.get('client').setValue(data.data.id);
        this.clientName = data.data.prenom + ' ' + data.data.nom;
      }
    });
    return await modal.present();
  }

  async presentModalClientAdd() {
    const modal = await this.modalClient.create({
      component: PopupclientComponent,
    });
    modal.onDidDismiss().then( (data: any) => {
      if (data.data) {
        this.reservationDetails.client.id = data.data.id;
        this.formEditResa.get('client').setValue(data.data.id);
        this.clientName = data.data.prenom + ' ' + data.data.nom;
      }
    });
    return await modal.present();
  }

  async presentModalVehiculeList() {

    const modal = await this.modalClient.create({
      component: PopuplistvehiculeComponent,
      componentProps: {
        'id': this.reservationDetails.vehicule ? this.reservationDetails.vehicule.id : '-1',
        'page': 'resa'
      }
    });
    modal.onDidDismiss().then( (data: any) => {
      if (data.data) {
        this.reservationDetails.vehicule = data;
        this.reservationDetails.vehicule.id = data.data.id;
        this.formEditResa.get('vehicule').setValue(data.data.id);

        if ( data.data.matricule &&  data.data.matricule !== '') {
            this.vehiculeName = data.data.designation + ' (' + data.data.matricule + ')' ;
        } else {
          this.vehiculeName = data.data.designation ;
        }


      }
    });
    return await modal.present();
  }

  async presentModalPartenaireList() {
    const modal = await this.modalClient.create({
      component: PopuplistpartenaireComponent,
      componentProps: {
        'id': this.reservationDetails.partenaire ? this.reservationDetails.partenaire.id : '-1'
      }
    });
    modal.onDidDismiss().then( (data: any) => {
      if (data.data) {
        this.reservationDetails.partenaire = data.data;
        this.reservationDetails.partenaire.id = data.data.id;
        this.formEditResa.get('partenaire').setValue(data.data.id);
        this.partenaireName = data.data.nom;
      }
    });
    return await modal.present();
  }

  updateResa(formEditResa) {
    if (this.route.snapshot.paramMap.get('id')) {
      this.editResa(formEditResa);
    } else {
      this.addResa(formEditResa);
    }
  }
  editResa(formEditResa) {
    this.outils.presentLoading('Traitement en cours ...').then( () => {
      this.reservationService.editReservation(formEditResa, this.id).subscribe((result) => {
        this.outils.dismissLoading().then(() => {
          alert('Reservation modifiée avec succès !');
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

  addResa(formEditResa) {
    this.outils.presentLoading('Traitement en cours ...').then( () => {
      this.reservationService.addReservation(formEditResa).subscribe((result) => {
        this.outils.dismissLoading().then(() => {
          alert('Reservation ajoutée avec succès !');
          this.router.navigate(['/app' , 'tabs', 'reservations']);
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

}
