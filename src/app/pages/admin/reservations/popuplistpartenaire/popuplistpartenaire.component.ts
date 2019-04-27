import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';


import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Globals } from '../../../../globals';
import { OutilsService } from 'src/app/services/outils.service';

@Component({
  selector: 'app-popuplistpartenaire',
  templateUrl: './popuplistpartenaire.component.html',
  styleUrls: ['./popuplistpartenaire.component.scss'],
})
export class PopuplistpartenaireComponent implements OnInit {

  @Input() id: string;
  radioPartenaire: any;
  queryText: any = '';
  data: any;
  partenaires: any;
  partenaireAll: any;
  filterData: any;
  constructor(
    private modalCtrl: ModalController,
    private outils: OutilsService,
    private http: HttpClient,
    private global: Globals
  ) { }

  ngOnInit() {
    this.outils.presentLoading('Chargement ...').then( () => {
      this.getPartenaires();
    });
  }

  getPartenaires() {
    this.http.get(this.global.GET_PARTENAIRE).pipe(
      tap((result: any) => {

      })
    ).subscribe(
      (resultat) => {
        this.partenaires = resultat;
        this.partenaireAll = this.partenaires;
        this.radioPartenaire = this.id.toString();

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

  setValue(p) {
    this.data = p;
  }
  filterResa() {
    this.partenaires = this.partenaireAll;
    this.filterData = this.partenaires.filter((partenaire) => {

      return partenaire.nom.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1
                      || partenaire.telephone.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1
                      || partenaire.email.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1;

    });
    if (this.queryText !== '') {
      this.partenaires = this.filterData;
    } else {
      this.partenaires = this.partenaireAll;
    }
  }
}
