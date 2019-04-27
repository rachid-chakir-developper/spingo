import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


import { Globals } from '../../../globals';
import { OutilsService } from 'src/app/services/outils.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  prochainesReservations: any[];
  prochainesRecuperations: any[];
  chargesMoisPrecedent: any;
  chargesStructurellesParMois: any;
  googleChartLibrary: any;
  countCharge: any;
  countClient: any;
  countRecette: any;
  countReservation: any;
  month: any;
  year: any;
  constructor(
    private storage: Storage,
    private http: HttpClient,
    private global: Globals,
    private outils: OutilsService
  ) { }

  ngOnInit() {
    this.storage.get('user').then( (user) => {
      console.log(user.token);
    });

    this.outils.presentLoading('Chargement ...').then( () => {
      this.getDashboard();
    });
  }

  useVanillaJSLibrary() {
    this.googleChartLibrary = (<any>window).google;
    // Load the Visualization API and the corechart package.
    this.googleChartLibrary.charts.load('current', { 'packages': ['corechart'] });

    // Set a callback to run when the Google Visualization API is loaded.
    this.googleChartLibrary.charts.setOnLoadCallback(this.drawChart.bind(this));
  }
  drawChart () {
    // Create the data table.
    const data = new this.googleChartLibrary.visualization.DataTable();
    data.addColumn('string', 'Type');
    data.addColumn('number', 'MAD');

    const countRecette = this.countRecette === 0 ? '1' : this.countRecette;
    const countCharge = this.countCharge === 0 ? '1' : this.countCharge;

    data.addRows([
      ['Recettes', +countRecette],
      ['Dépenses', +countCharge],
    ]);

    // Instantiate and draw our chart, passing in some options.
    const chart = new this.googleChartLibrary.visualization
      .PieChart(document.getElementById('pie-chart-div'));

    chart.draw(data, {
      'width': 343,
      'height': 300,
      'legend': 'bottom',
      'is3D': false,
      colors: ['#44ab33', '#f25454']
    });
  }

  getDashboard() {
    this.http.get(this.global.GET_DASHBOARD).pipe(
      tap((result: any) => {

      })
    ).subscribe(
      (resultat) => {
        const mois = [
          'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ];
        this.prochainesReservations = resultat.prochainesReservations;
        this.prochainesRecuperations = resultat.prochainesRecuperations;
        this.chargesMoisPrecedent = resultat.chargesMoisPrecedent !== null ? resultat.chargesMoisPrecedent : 0;
        this.chargesStructurellesParMois = resultat.chargesStructurellesParMois !== null ? resultat.chargesStructurellesParMois : 0;
        this.countCharge = resultat.countCharge !== null ? resultat.countCharge : 0;
        this.countClient = resultat.countClient !== null ? resultat.countClient : 0;
        this.countRecette = resultat.countRecette !== null ? resultat.countRecette : 0;
        this.countReservation = resultat.countReservation !== null ? resultat.countReservation : 0;
        this.year = resultat.year;
        this.month = mois[--resultat.month];

        this.useVanillaJSLibrary();

        this.outils.dismissLoading();
        console.log(resultat);

      },
      (error: any) => {
        this.outils.dismissLoading();
          alert('erreur');
      }
    );
  }
}
