import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Globals } from '../../../globals';
import { AlertController } from '@ionic/angular';
import { OutilsService } from '../../../services/outils.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-vehicules',
  templateUrl: './vehicules.page.html',
  styleUrls: ['./vehicules.page.scss'],
})
export class VehiculesPage implements OnInit {

  vehicules: any;
  p = 1;
  hasMore = true;
  filterData: any;
  queryText: any = '';
  vehiculesAll: any;

  constructor(
    private http: HttpClient,
    private global: Globals,
    private alert: AlertController,
    private outils: OutilsService,
    private router: Router) { }

    ngOnInit() {
      this.outils.presentLoading('Chargement ...').then( () => {
        this.getVehicules();
      });
    }

    refresh(event) {
      // this.reservations = [];
      this.p = 1;
      this.hasMore = true;
      this.filterData = [];
      // this.reservationsAll = [];

      this.getVehicules(event);

    }
    getMoreVehicules(event) {
      if (this.hasMore) {
        this.p = this.p + 1;
        this.http.get(this.global.GET_VEHICULE + '?p=' + this.p).pipe(
          tap((result: any) => {

          })
        ).subscribe(
          (resultat) => {

            if (this.p >= resultat.maxPages) {
              this.hasMore = false;
            }

            resultat.vehicules.forEach(element => {
              this.vehiculesAll.push(element);
            });

            this.filterVehicules  ();

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

    getVehicules(event = null) {
      this.http.get(this.global.GET_VEHICULE).pipe(
        tap((result: any) => {

        })
      ).subscribe(
        (resultat) => {
          console.log(resultat);
          this.vehicules = resultat.vehicules;
          this.vehiculesAll = this.vehicules;


          if (!event) {
            this.outils.dismissLoading();
          }
          if (event) {
            event.target.complete();
          }

          this.filterVehicules();
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

    filterVehicules() {
      this.vehicules = this.vehiculesAll;
      this.filterData = this.vehicules.filter((vehicule) => {



        return  (
          String(vehicule.marque).toLowerCase().indexOf(this.queryText.toLowerCase()) > -1
                        || String(vehicule.model).toLowerCase().indexOf(this.queryText.toLowerCase()) > -1
                        || String(vehicule.designation).toLowerCase().indexOf(this.queryText.toLowerCase()) > -1
                        || String(vehicule.numeroWW).toLowerCase().indexOf(this.queryText.toLowerCase()) > -1
              );
      });

      if (this.queryText !== '' ) {
        this.vehicules = this.filterData;
      } else {
        this.vehicules = this.vehiculesAll;
      }
  }


  async presentAlertConfirm(vehicule) {
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
            this.deleteVvehicule(vehicule);
          }
        }
      ]
    });

    await alert.present();
  }

  deleteVvehicule(vehicule) {
    this.outils.presentLoading('Suppression en cours').then( () => {
      this.http.delete(this.global.GET_VEHICULE + '/' + vehicule.id).subscribe(
        (resultat) => {
          this.outils.dismissLoading().then( () => {
            this.vehicules.splice(this.vehicules.indexOf(vehicule), 1);
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
