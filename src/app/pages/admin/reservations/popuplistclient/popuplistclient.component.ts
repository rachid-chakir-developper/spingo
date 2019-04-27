import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';


import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Globals } from '../../../../globals';
import { OutilsService } from 'src/app/services/outils.service';

@Component({
  selector: 'app-popuplistclient',
  templateUrl: './popuplistclient.component.html',
  styleUrls: ['./popuplistclient.component.scss'],
})
export class PopuplistclientComponent implements OnInit {
  @Input() id: string;
  radioClient: any;
  queryText: any = '';
  data: any;
  clients: any;
  clientAll: any;
  filterData: any;
  constructor(
    private modalCtrl: ModalController,
    private outils: OutilsService,
    private http: HttpClient,
    private global: Globals
  ) { }

  ngOnInit() {
    this.outils.presentLoading('Chargement ...').then( () => {
      this.getClients();
    });
  }

  getClients() {
    this.http.get(this.global.GET_CLIENT).pipe(
      tap((result: any) => {

      })
    ).subscribe(
      (resultat) => {
        this.clients = resultat;
        this.clientAll = this.clients;
        this.radioClient = this.id.toString();

        this.outils.dismissLoading();
      },
      (error: any) => {
          this.outils.dismissLoading();
      }
    );
  }

  closeModal() {
    this.modalCtrl.dismiss(this.data);
  }

  setValue(c) {
    this.data = c;
  }
  filterResa() {
    this.clients = this.clientAll;
    this.filterData = this.clients.filter((client) => {

      return client.prenom.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1
                      || client.nom.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1
                      || client.CIN.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1
                      ||
                      (
                        client.numeroPassport &&
                        client.numeroPassport.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1
                      )
                      || client.telephone.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1
                      || client.email.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1;

    });
    if (this.queryText !== '') {
      this.clients = this.filterData;
    } else {
      this.clients = this.clientAll;
    }
  }
}

