import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Globals } from '../../../../globals';
import { ActivatedRoute, Router } from '@angular/router';
import { OutilsService } from 'src/app/services/outils.service';
import { ModalController } from '@ionic/angular';
import { PopuplistvehiculeComponent } from '../../reservations/popuplistvehicule/popuplistvehicule.component';
import { ChargeService } from 'src/app/services/charge.service';

@Component({
  selector: 'app-editcharge',
  templateUrl: './editcharge.page.html',
  styleUrls: ['./editcharge.page.scss'],
})
export class EditchargePage implements OnInit {
  formErrors: any;
  chargeDetails: any;
  disableItem  = false;
  id: any;
  title: any;
  vehiculeName: any;
  passed: boolean;
  formEditCharge = this.formBuilder.group(
    {
      datecharge: [''],
      typereglement: [''],
      numerocheque: [''],
      montant: [''],
      vehicule: [''],
      libelle: [''],
      details: ['']
    }

  );

  constructor(
    private formBuilder: FormBuilder,
              private http: HttpClient,
              private global: Globals,
              private route: ActivatedRoute,
              private outils: OutilsService,
              private modalClient: ModalController,
              private router: Router,
              private chargeService: ChargeService
  ) { }

  ngOnInit() {

    if (this.route.snapshot.paramMap.get('id')) {
      this.title = 'Modifier charge';
      this.id = this.route.snapshot.paramMap.get('id');
    } else if (this.route.snapshot.paramMap.get('idShow')) {
      this.title = 'Détails charge';
      this.id = this.route.snapshot.paramMap.get('idShow');
      this.disableItem = true;
    } else {
        this.title = 'Ajouter une charge';
      }

      if (this.id) {
        this.outils.presentLoading('Chargement...').then(() => {
          this.getEditChargeData();
        });
      } else {
        this.chargeDetails = [];
      }

  }

  getEditChargeData() {

    this.http.get(this.global.GET_CHARGES + '/' + this.id).pipe(
      tap((result: any) => {

      })
    ).subscribe(
      (resultat) => {
        this.chargeDetails = resultat;
        let v: any;
        if (this.chargeDetails.vehicule && this.chargeDetails.vehicule.id !== '') {
          this.vehiculeName = this.chargeDetails.vehicule.designation;
          v = this.chargeDetails.vehicule.id;

        } else {
          this.vehiculeName = 'Agence';
          v = -2;
        }
        const d = this.chargeDetails.datecharge.split('/');
        console.log(this.chargeDetails.datecharge);
        this.formEditCharge = this.formBuilder.group(
          {
            datecharge: [d[2] + '-' + d[1] + '-' + d[0]],
            typereglement: [this.chargeDetails.typereglement],
            numerocheque: [this.chargeDetails.numerocheque],
            montant: [this.chargeDetails.montant],
            vehicule: [v],
            libelle: [this.chargeDetails.libelle],
            details: [this.chargeDetails.details]

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

async presentModalVehiculeList() {

  const modal = await this.modalClient.create({
    component: PopuplistvehiculeComponent,
    componentProps: {
      'id': this.chargeDetails.vehicule ? this.chargeDetails.vehicule.id : '-2',
      'page': 'charge'
    }
  });
  modal.onDidDismiss().then( (data: any) => {
    if (data.data) {
      this.chargeDetails.vehicule = data;
      this.chargeDetails.vehicule.id = data.data.id;
      this.formEditCharge.get('vehicule').setValue(data.data.id);

      if ( data.data.matricule &&  data.data.matricule !== '') {
          this.vehiculeName = data.data.designation + ' (' + data.data.matricule + ')' ;
      } else {
        this.vehiculeName = data.data.designation ;
      }


    }
  });
  return await modal.present();
}

updateCharge(formEditCharge) {

  if (this.formEditCharge.get('vehicule').value === '-2' || this.formEditCharge.get('vehicule').value === -2) {
    this.formEditCharge.get('vehicule').setValue('');
    this.passed = true;
  }
  this.formErrors = [];
  if (this.route.snapshot.paramMap.get('id')) {
    this.editCharge(formEditCharge);
  } else {
    this.addCharge(formEditCharge);
  }
}

editCharge(formEditCharge) {
  this.outils.presentLoading('Traitement en cours ...').then( () => {
    this.chargeService.editcharge(formEditCharge, this.id).subscribe((result) => {
      this.outils.dismissLoading().then(() => {
        alert('Charge modifiée avec succès !');
        if (this.passed) {
          this.formEditCharge.get('vehicule').setValue('-2');
          this.passed = false;
        }
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

addCharge(formEditCharge) {
  this.outils.presentLoading('Traitement en cours ...').then( () => {
    this.chargeService.addCharge(formEditCharge).subscribe((result) => {
      this.outils.dismissLoading().then(() => {
        alert('Charge ajoutée avec succès !');
        this.router.navigate(['/app' , 'tabs', 'charges']);
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
