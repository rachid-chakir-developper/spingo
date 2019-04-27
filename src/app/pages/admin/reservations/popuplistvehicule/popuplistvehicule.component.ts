import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Globals } from '../../../../globals';
import { OutilsService } from 'src/app/services/outils.service';

@Component({
  selector: 'app-popuplistvehicule',
  templateUrl: './popuplistvehicule.component.html',
  styleUrls: ['./popuplistvehicule.component.scss'],
})
export class PopuplistvehiculeComponent implements OnInit {
  @Input() id: string;
  @Input() page: string;
  radioVehicule: any;
  queryText: any = '';
  data: any;
  vehicules: any;
  vehiculeAll: any;
  filterData: any;
  constructor(
    private modalCtrl: ModalController,
    private outils: OutilsService,
    private http: HttpClient,
    private global: Globals
  ) { }

  ngOnInit() {
    this.outils.presentLoading('Chargement ...').then( () => {
      this.getVehicules();
    });
  }

  getVehicules() {
    this.http.get(this.global.GET_VEHICULE).pipe(
      tap((result: any) => {

      })
    ).subscribe(
      (resultat) => {
        this.vehicules = resultat.vehicules;
        this.vehiculeAll = this.vehicules;
        this.radioVehicule = this.id.toString();

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

  setValue(v) {
    if (v === 'Sous location') {
      this.data = {'id': -1, 'designation': 'Sous location', 'matricule': ''};
    } else if (v === 'Agence') {
      this.data = {'id': -2, 'designation': 'Agence', 'matricule': ''};
    } else {
      this.data = v;
    }
  }
  filterResa() {
    this.vehicules = this.vehiculeAll;
    this.filterData = this.vehicules.filter((vehicule) => {

      return vehicule.matricule.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1
                      || vehicule.designation.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1
                      || vehicule.marque.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1
                      || vehicule.model.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1
                      || vehicule.dateMiseEnCirculation.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1;

    });
    if (this.queryText !== '') {
      this.vehicules = this.filterData;
    } else {
      this.vehicules = this.vehiculeAll;
    }
  }
}

