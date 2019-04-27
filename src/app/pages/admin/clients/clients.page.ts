import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Globals } from '../../../globals';
import { AlertController } from '@ionic/angular';
import { OutilsService } from '../../../services/outils.service';
import { Router } from '@angular/router';

import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {

  clients: any;
  p = 1;
  hasMore = true;
  filterData: any;
  queryText: any = '';
  clientsAll: any;
  callNumber: CallNumber;

  constructor(private http: HttpClient,
    private global: Globals,
    private alert: AlertController,
    private outils: OutilsService,
    private router: Router) { }

  ngOnInit() {
      this.outils.presentLoading('Chargement ...').then( () => {
        this.getClients();
      });
    }

    callNow(number) {
      this.callNumber.callNumber(number, true)
        .then(res => console.log('Launched dialer!', res))
        .catch(err => console.log('Error launching dialer', err));
    }

    refresh(event) {
      // this.reservations = [];
      this.p = 1;
      this.hasMore = true;
      this.filterData = [];
      // this.reservationsAll = [];

      this.getClients(event);

    }
    getMoreClients(event) {
      if (this.hasMore) {
        this.p = this.p + 1;
        this.http.get(this.global.GET_CLIENT + '/p' + '?p=' + this.p).pipe(
          tap((result: any) => {

          })
        ).subscribe(
          (resultat) => {

            if (this.p >= resultat.maxPages) {
              this.hasMore = false;
            }

            resultat.clients.forEach(element => {
              this.clientsAll.push(element);
            });

            this.filterClients  ();

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

    getClients(event = null) {
      this.http.get(this.global.GET_CLIENT + '/p').pipe(
        tap((result: any) => {

        })
      ).subscribe(
        (resultat) => {
          console.log(resultat);
          this.clients = resultat.clients;
          this.clientsAll = this.clients;


          if (!event) {
            this.outils.dismissLoading();
          }
          if (event) {
            event.target.complete();
          }

          this.filterClients();
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

    filterClients() {
      this.clients = this.clientsAll;
      this.filterData = this.clients.filter((client) => {



        return  (
          String(client.cin).toLowerCase().indexOf(this.queryText.toLowerCase()) > -1
                        || String(client.prenom).toLowerCase().indexOf(this.queryText.toLowerCase()) > -1
                        || String(client.com).toLowerCase().indexOf(this.queryText.toLowerCase()) > -1
                        || String(client.email).toLowerCase().indexOf(this.queryText.toLowerCase()) > -1
              );
      });

      if (this.queryText !== '' ) {
        this.clients = this.filterData;
      } else {
        this.clients = this.clientsAll;
      }
  }


  async presentAlertConfirm(client) {
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
            this.deleteClient(client);
          }
        }
      ]
    });

    await alert.present();
  }

  deleteClient(client) {
    this.outils.presentLoading('Suppression en cours').then( () => {
      this.http.delete(this.global.GET_CLIENT + '/' + client.id).subscribe(
        (resultat) => {
          this.outils.dismissLoading().then( () => {
            this.clients.splice(this.clients.indexOf(client), 1);
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
