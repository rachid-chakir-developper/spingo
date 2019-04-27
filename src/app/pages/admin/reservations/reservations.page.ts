import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Globals } from '../../../globals';
import { AlertController } from '@ionic/angular';
import { OutilsService } from '../../../services/outils.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss'],
})
export class ReservationsPage implements OnInit {

  reservations: any;
  p = 1;
  hasMore = true;
  filterData: any;
  queryText: any = '';
  reservationsAll: any;
  segment = 'all';
  constructor(
    private http: HttpClient,
    private global: Globals,
    private alert: AlertController,
    private outils: OutilsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.outils.presentLoading('Chargement ...').then( () => {
      this.getReservation();
    });
  }
  refresh(event) {
    // this.reservations = [];
    this.p = 1;
    this.hasMore = true;
    this.filterData = [];
    // this.reservationsAll = [];

    this.getReservation(event);

  }
  getReservation(event = null) {
    this.http.get(this.global.GET_RESERVATION).pipe(
      tap((result: any) => {

      })
    ).subscribe(
      (resultat) => {
        console.log(resultat);
        this.reservations = resultat.reservations;
        this.reservationsAll = this.reservations;
        if (!event) {
          this.outils.dismissLoading();
        }
        if (event) {
          event.target.complete();
        }

        this.filterResa();
      },
      (error: any) => {
          this.outils.dismissLoading();
          console.log(error);
          if (event) {
            event.target.complete();
          }
      }
    );
  }

  filterResa() {
    this.reservations = this.reservationsAll;
    this.filterData = this.reservations.filter((reservation) => {
      let mySegment = true;
      if (this.segment !== '' && this.segment !== 'all') {
        mySegment = reservation.etat === this.segment;
      } else {
        mySegment = true;
      }
      return  (
                reservation.client.prenom.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1
                      || reservation.client.nom.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1
                      || reservation.dateDu.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1
                      || reservation.dateAu.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1
                      || (
                          reservation.partenaire &&
                          reservation.partenaire.hasOwnProperty('nom') &&
                          reservation.partenaire.nom.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1
                        )
                      || (
                          reservation.vehicule &&
                          reservation.vehicule.hasOwnProperty('matricule') &&
                          reservation.vehicule.matricule.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1
                        )
                      || (
                          reservation.vehicule &&
                          reservation.vehicule.hasOwnProperty('designation') &&
                          reservation.vehicule.designation.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1
                        )
            ) && mySegment;
    });


    if (this.queryText !== '' || this.segment !== 'all') {
      this.reservations = this.filterData;
    } else {
      this.reservations = this.reservationsAll;
    }
}

  getMoreResa(event) {
    if (this.hasMore) {
      this.p = this.p + 1;
      this.http.get(this.global.GET_RESERVATION + '?p=' + this.p).pipe(
        tap((result: any) => {

        })
      ).subscribe(
        (resultat) => {

          if (this.p >= resultat.maxPages) {
            this.hasMore = false;
          }

          resultat.reservations.forEach(element => {
            this.reservationsAll.push(element);
          });

          this.filterResa();

          event.target.complete();
        },
        (error: any) => {
            console.log(error);
        }
      );
    } else {
      this.outils.presentToast('Aucune donnée à afficher');
    }
  }


  async presentAlertConfirm(reservation) {
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
            this.deleteResa(reservation);
          }
        }
      ]
    });

    await alert.present();
  }

  deleteResa(reservation) {
    this.outils.presentLoading('Suppression en cours').then( () => {
      this.http.delete(this.global.GET_RESERVATION + '/' + reservation.id).subscribe(
        (resultat) => {
          this.outils.dismissLoading().then( () => {
            this.reservations.splice(this.reservations.indexOf(reservation), 1);
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
}
