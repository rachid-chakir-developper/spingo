import { Component, OnInit } from '@angular/core';
import { PopuplistvehiculeComponent } from '../reservations/popuplistvehicule/popuplistvehicule.component';
import { ModalController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Globals } from '../../../globals';

import { OutilsService } from 'src/app/services/outils.service';
import { ContraventionService } from 'src/app/services/contravention.service';

@Component({
  selector: 'app-contravention',
  templateUrl: './contravention.page.html',
  styleUrls: ['./contravention.page.scss'],
})
export class ContraventionPage implements OnInit {
  reservationDetails: any;
  vehiculeName: any;
  formErrors: any;
  formContravention = this.formBuilder.group(
    {
      date: [''],
      vehicule: ['']
    }

  );

  constructor(
    private modalClient: ModalController,
    private formBuilder: FormBuilder,
              private http: HttpClient,
              private global: Globals,
              private outils: OutilsService,
              private contraventionService: ContraventionService
    ) { }

  ngOnInit() {
  }

  async presentModalVehiculeList() {

    const modal = await this.modalClient.create({
      component: PopuplistvehiculeComponent,
      componentProps: {
        'id': '-3',
        'page': 'contravention'
      }
    });
    modal.onDidDismiss().then( (data: any) => {
      if (data.data) {
        this.formContravention.get('vehicule').setValue(data.data.id);

        if ( data.data.matricule &&  data.data.matricule !== '') {
            this.vehiculeName = data.data.designation + ' (' + data.data.matricule + ')' ;
        } else {
          this.vehiculeName = data.data.designation ;
        }


      }
    });
    return await modal.present();
  }

  doSearch(formContravention) {
    this.outils.presentLoading('Traitement en cours ...').then( () => {
      this.contraventionService.search(formContravention).subscribe((result) => {
        if (result && result.reservations) {
          this.reservationDetails = result.reservations;
        } else {
          this.reservationDetails = null;
        }
        this.outils.dismissLoading();

      },
      (error) => {
        console.log(error);
        this.outils.dismissLoading().then( () => {
      });
    });
  });
  }
}
