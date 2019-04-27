import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Globals } from '../../../../globals';
import { ActivatedRoute, Router } from '@angular/router';
import { OutilsService } from 'src/app/services/outils.service';
import { ModalController } from '@ionic/angular';
import { VehiculeService } from 'src/app/services/vehicule.service';


@Component({
  selector: 'app-editvehicule',
  templateUrl: './editvehicule.page.html',
  styleUrls: ['./editvehicule.page.scss'],
})
export class EditvehiculePage implements OnInit {

  title: any;
  queryText: any = '';
  vehiculeDetails: any;
  disableItem  = false;
  formErrors: any;
  id: any;


  formEditVehicule = this.formBuilder.group(
    {
      Avance: [''],
      actif: [''],
      categorie: [''],
      climatisation: [''],
      dateDebutMensualite: [''],
      dateFinMensualite : [''],
      dateMiseEnCirculation : [''],
      designation : [''],
      energie: [''],
      marque : [''],
      matricule : [''],
      mensualiteRestante : [''],
      model : [''],
      montantMensualite : [''],
      nombreBagage : [''],
      nombrePlace : [''],
      nombrePorte : [''],
      numeroWW : [''],
      prixAchat : [''],
      puissancefiscale : [''],
      transmission : [''],

    }

  );
  constructor(
    private formBuilder: FormBuilder,
              private http: HttpClient,
              private global: Globals,
              private route: ActivatedRoute,
              private outils: OutilsService,
              private vehiculeService: VehiculeService,
              private modalClient: ModalController,
              private router: Router
  ) { }

  ngOnInit() {

    if (this.route.snapshot.paramMap.get('id')) {
      this.title = 'Modifier un véhicule';
      this.id = this.route.snapshot.paramMap.get('id');
    } else if (this.route.snapshot.paramMap.get('idShow')) {
      this.title = 'Détails véhicule';
      this.id = this.route.snapshot.paramMap.get('idShow');
      this.disableItem = true;
    } else {
        this.title = 'Ajouter un véhicule';
      }


      if (this.id) {
        this.outils.presentLoading('Chargement...').then(() => {
          this.getEditVehiculeData();
        });
      } else {
        this.vehiculeDetails = [];
      }
    }

    getEditVehiculeData() {

      this.http.get(this.global.GET_VEHICULE + '/' + this.id).pipe(
        tap((result: any) => {

        })
      ).subscribe(
        (resultat) => {
          this.vehiculeDetails = resultat;
          let d = ['', '', ''];
          let d2 = ['', '', ''];
          let d3 = ['', '', ''];
          if (this.vehiculeDetails.dateMiseEnCirculation) {
            d = this.vehiculeDetails.dateMiseEnCirculation.split('/');
          }
          if (this.vehiculeDetails.dateDebutMensualite) {
            d2 = this.vehiculeDetails.dateDebutMensualite.split('/');
          }
          if (this.vehiculeDetails.dateFinMensualite) {
            d3 = this.vehiculeDetails.dateFinMensualite.split('/');
          }
          this.formEditVehicule = this.formBuilder.group(
            {
              avance: [String(this.vehiculeDetails.Avance)],
              actif: [this.vehiculeDetails.actif],
              categorie: [String(this.vehiculeDetails.categorie.id)],
              climatisation: [this.vehiculeDetails.climatisation],
              dateDebutMensualite: [d2[2] + '-' + d2[1] + '-' + d2[0]],
              dateFinMensualite : [d3[2] + '-' + d3[1] + '-' + d3[0]],
              dateMiseEnCirculation : [d[2] + '-' + d[1] + '-' + d[0]],
              designation : [this.vehiculeDetails.designation],
              energie: [this.vehiculeDetails.energie],
              marque : [this.vehiculeDetails.marque],
              matricule : [this.vehiculeDetails.matricule],
              mensualiteRestante : [this.vehiculeDetails.mensualiteRestante],
              model : [this.vehiculeDetails.model],
              montantMensualite : [this.vehiculeDetails.montantMensualite],
              nombreBagage : [this.vehiculeDetails.nombreBagage],
              nombrePlace : [this.vehiculeDetails.nombrePlace],
              nombrePorte : [this.vehiculeDetails.nombrePorte],
              numeroWW : [this.vehiculeDetails.numeroWW],
              prixAchat : [this.vehiculeDetails.prixAchat],
              puissancefiscale : [this.vehiculeDetails.puissancefiscale],
              transmission : [this.vehiculeDetails.transmission],
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

    updateVehicule(formEditVehicule) {
      if (this.route.snapshot.paramMap.get('id')) {
        this.editVehicule(formEditVehicule);
      } else {
        this.addVehicule(formEditVehicule);
      }
    }
    editVehicule(formEditVehicule) {
      this.outils.presentLoading('Traitement en cours ...').then( () => {
        this.vehiculeService.editVehicule(formEditVehicule, this.id).subscribe((result) => {
          this.outils.dismissLoading().then(() => {
            alert('Véhicule modifié avec succès !');
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

    addVehicule(formEditVehicule) {
      this.outils.presentLoading('Traitement en cours ...').then( () => {
        this.vehiculeService.addVehicule(formEditVehicule).subscribe((result) => {
          this.outils.dismissLoading().then(() => {
            alert('Véhicule ajouté avec succès !');
            this.router.navigate(['/app' , 'tabs', 'dashboard', 'vehicules']);
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

    parseISOString(s) {
      const b = s.split(/\D+/);
      return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
  }
}
