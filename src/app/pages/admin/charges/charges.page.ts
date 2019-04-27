import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Globals } from '../../../globals';
import { AlertController } from '@ionic/angular';
import { OutilsService } from '../../../services/outils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-charges',
  templateUrl: './charges.page.html',
  styleUrls: ['./charges.page.scss'],
})
export class ChargesPage implements OnInit {

  charges: any;
  p = 1;
  hasMore = true;
  filterData: any;
  queryText: any = '';
  chargesAll: any;
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
      this.getCharges();
    });
  }
  refresh(event) {
    // this.reservations = [];
    this.p = 1;
    this.hasMore = true;
    this.filterData = [];
    // this.reservationsAll = [];

    this.getCharges(event);

  }
  getMoreCharges(event) {
    if (this.hasMore) {
      this.p = this.p + 1;
      this.http.get(this.global.GET_CHARGES + '?p=' + this.p).pipe(
        tap((result: any) => {

        })
      ).subscribe(
        (resultat) => {

          if (this.p >= resultat.maxPages) {
            this.hasMore = false;
          }

          resultat.charges.forEach(element => {
            this.chargesAll.push(element);
          });

          this.filterCharges();

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

  getCharges(event = null) {
    this.http.get(this.global.GET_CHARGES).pipe(
      tap((result: any) => {

      })
    ).subscribe(
      (resultat) => {
        console.log(resultat);
        this.charges = resultat.charges;
        this.chargesAll = this.charges;


        if (!event) {
          this.outils.dismissLoading();
        }
        if (event) {
          event.target.complete();
        }

        this.filterCharges();
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

  filterCharges() {
    this.charges = this.chargesAll;
    this.filterData = this.charges.filter((charge) => {

      let mySegment = true;
      if (this.segment === 'vehicule' ) {
        mySegment = charge.vehicule !== null;
      } else if (this.segment === 'societe') {
        mySegment = charge.vehicule === null;
      } else {
        mySegment = true;
      }

      return  (
        String(charge.montant).toLowerCase().indexOf(this.queryText.toLowerCase()) > -1
                      || charge.libelle.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1
                      || String(charge.details).toLowerCase().indexOf(this.queryText.toLowerCase()) > -1
                      || charge.datecharge.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1
            ) && mySegment;
    });

    if (this.queryText !== '' || this.segment !== 'all') {
      this.charges = this.filterData;
    } else {
      this.charges = this.chargesAll;
    }
}


async presentAlertConfirm(charge) {
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
          this.deleteCharge(charge);
        }
      }
    ]
  });

  await alert.present();
}

deleteCharge(charge) {
  this.outils.presentLoading('Suppression en cours').then( () => {
    this.http.delete(this.global.GET_CHARGES + '/' + charge.id).subscribe(
      (resultat) => {
        this.outils.dismissLoading().then( () => {
          this.charges.splice(this.charges.indexOf(charge), 1);
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
