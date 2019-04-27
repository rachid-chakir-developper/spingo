import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Globals } from '../../../globals';
import { OutilsService } from '../../../services/outils.service';

import { PopoverController } from '@ionic/angular';
import { ResadetailsComponent } from './resadetails/resadetails.component';
import { DisponibiliteService } from 'src/app/services/disponibilite.service';

@Component({
  selector: 'app-disponibilite',
  templateUrl: './disponibilite.page.html',
  styleUrls: ['./disponibilite.page.scss'],
})
export class DisponibilitePage implements OnInit {

  monthsNames = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jui', 'Jul', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'];
  thisMonth = 0;
  thisYear = 2019;
  dateDetail: any = {
    date : new Date(),
    today : 0,
    nbrDayInWeek : 0,
    daysInMonthNow : 0,
    daysInMonthPrevious : 0,
    daysInMonthNext : 0
  };
  calendarShow: any[] = [];
  vehicules: any[];
  reservations: any[];

  filterData: any;
  queryText: any = '';
  cars: any;
  carsAll: any;
  reservationsAll: any;

  select = false;

  constructor(private sanitizer: DomSanitizer,
    private http: HttpClient,
    private global: Globals,
    private outils: OutilsService,
    public popoverController: PopoverController,
    public disponibilite: DisponibiliteService) { }

  ngOnInit() {
    this.outils.presentLoading('Chargement ...').then( () => {
      this.getDisponibilte() ;
    });
  }


  filterCar() {


    this.calendarShow = [];
    this.reservations = this.reservationsAll;
    this.filterData = this.reservations.filter((reservation) => {

      return  (
                reservation.client.prenom.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1
                      || reservation.client.nom.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1
                      || reservation.dateDu.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1
                      || reservation.dateAu.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1
            );
    });

    let vehicules: any = [];
    const vehiculesIndex: any = [];

    if (this.queryText !== '' ) {
      this.reservations = this.filterData;

    for (const resa of this.reservations) {
      if (!vehiculesIndex.includes(resa.vehicule.id)) {
        vehiculesIndex.push(resa.vehicule.id);
        vehicules.push(resa.vehicule);
      }
    }

    } else {
      this.reservations = this.reservationsAll;
      vehicules = this.vehicules;
    }



    for (const vehicule of vehicules) {
      this.calendarShow.push({vehicule : vehicule, calendar: this.boucle(this.dateDetail, vehicule, this.reservations)});
    }

}

getDateDetail(year, month, day) {
  const date: Date = new Date(year, month, day);
  const nbrDayInWeek: number = new Date(date.getFullYear() , date.getMonth() , 1).getDay();
  const today: number = date.getDate();

  const dateNow: Date = new Date(date.getFullYear() , date.getMonth() , 32);
  const datePreviuos: Date = new Date(date.getFullYear() , date.getMonth() - 1 , 32);
  const dateNext: Date = new Date(date.getFullYear() , date.getMonth() + 1 , 32);

  const daysInMonthNow: number = 32 - dateNow.getDate();
  const daysInMonthPrevious: number = 32 - datePreviuos.getDate();
  const daysInMonthNext: number = 32 - dateNext.getDate();
 return {date, today, nbrDayInWeek , daysInMonthNow, daysInMonthPrevious, daysInMonthNext};

}
boucle(dateDetail , vehicule , reservations) {
  let dateDu: Date;
  let dateAu: Date;
  const datesResa: any[] = [];
  const date: Date = dateDetail.date;


  for (const reservation of reservations) {
    if (reservation.vehicule.id === vehicule.id) {
      const dateResa = { dateDu: dateDu, dateAu: dateAu , reservation: null};
        dateDu = new Date(reservation.dateDu);
        dateResa.dateDu = new Date(dateDu.getFullYear(), dateDu.getMonth() , dateDu.getDate());
        dateAu = new Date(reservation.dateAu);
        dateResa.dateAu = new Date(dateAu.getFullYear(), dateAu.getMonth() , dateAu.getDate());
        dateResa.reservation = reservation;
        datesResa.push(dateResa);
    }
  }

  let dayInfos = {day: 0, nbrReserved: 0, reservations: []};
  const calendar: any[] = [];

  let startDay:  number =  dateDetail.daysInMonthPrevious - dateDetail.nbrDayInWeek + 2;
  let nbrDays = 0;
  let restDays: number = 7 * 6;
  for (let i = 1 ; i < dateDetail.nbrDayInWeek ; i++) {
    dayInfos = {day: 0, nbrReserved: 0, reservations: []};
    dayInfos.day = startDay;
    for (const resa of datesResa) {
      if ((new Date(date.getFullYear() , date.getMonth() - 1 , startDay )) >= resa.dateDu
              && (new Date(date.getFullYear() , date.getMonth() - 1 , startDay )) <= resa.dateAu) {
                dayInfos.nbrReserved++;
                dayInfos.reservations.push(resa.reservation);
          }
      }
    calendar.push(dayInfos);
    startDay++;
    nbrDays++;
    restDays--;
  }
      for (let j = 1 ; j <= dateDetail.daysInMonthNow ; j++) {
        dayInfos = {day: 0, nbrReserved: 0, reservations: []};
        dayInfos.day = j;
        for (const resa of datesResa) {
          if ((new Date(date.getFullYear() , date.getMonth()  , j )) >= resa.dateDu
                  && (new Date(date.getFullYear() , date.getMonth()  , j )) <= resa.dateAu) {
                    dayInfos.nbrReserved++;
                    dayInfos.reservations.push(resa.reservation);
              }
          }
        calendar.push(dayInfos);
        nbrDays++;
        restDays--;
      }
      for (let k = 1 ; k <= restDays ; k++) {
        dayInfos = {day: 0, nbrReserved: 0, reservations: []};
        dayInfos.day = k;
        for (const resa of datesResa) {
          if ((new Date(date.getFullYear() , date.getMonth() + 1  , k )) >= resa.dateDu
                  && (new Date(date.getFullYear() , date.getMonth() + 1 , k )) <= resa.dateAu) {
                    dayInfos.nbrReserved++;
                    dayInfos.reservations.push(resa.reservation);
              }
          }
        calendar.push(dayInfos);
        nbrDays++;
      }
  const calendarWeek = [];
  for (const week of [0, 7, 14, 21, 28, 35]) {

    calendarWeek.push(calendar.slice(week , week + 7));
  }

   return calendarWeek;
}


getDisponibilte(date = null) {
  this.http.get(this.global.GET_DISPONIBILITE).pipe(
    tap((result: any) => {

    })
  ).subscribe(
    (resultat) => {

      this.vehicules = resultat.vehicules;
      this.reservations = resultat.reservations;
      this.reservationsAll = resultat.reservations;

      this.dateDetail = this.getDateDetail(resultat.year, resultat.month - 1, resultat.day);
      this.thisMonth = resultat.month - 1;
      this.thisYear = resultat.year;
      for (const vehicule of this.vehicules) {
        this.calendarShow.push({vehicule : vehicule, calendar: this.boucle(this.dateDetail, vehicule, this.reservations)});
      }



      this.outils.dismissLoading();
    },
    (error: any) => {

        this.outils.dismissLoading();
    }
  );
}

async showDetails(ev: any, reservations: any[]) {
  if (reservations.length > 0 ) {
    const popover = await this.popoverController.create({
      component: ResadetailsComponent,
      componentProps: {'reservations' : reservations},
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
  return ;
}

nextMonth() {
  this.calendarShow = [];
  this.disponibilite.getDisponibilites({'year': this.thisYear, 'month': this.thisMonth + 1, 'get': 'next'}).subscribe((resultat) => {

    this.vehicules = resultat.vehicules;
    this.reservations = resultat.reservations;
    this.reservationsAll = resultat.reservations;

    this.dateDetail = this.getDateDetail(resultat.year, resultat.month - 1, resultat.day);
    this.thisMonth = resultat.month - 1;
    this.thisYear = resultat.year;
    for (const vehicule of this.vehicules) {
      this.calendarShow.push({vehicule : vehicule, calendar: this.boucle(this.dateDetail, vehicule, this.reservations)});
    }
    this.outils.dismissLoading();
  },
  (error: any) => {

      this.outils.dismissLoading();
  });
}

previousMonth() {
  this.calendarShow = [];
  this.disponibilite.getDisponibilites({'year': this.thisYear, 'month': this.thisMonth + 1, 'get': 'previous'}).subscribe((resultat) => {

    this.vehicules = resultat.vehicules;
    this.reservations = resultat.reservations;
    this.reservationsAll = resultat.reservations;

    this.dateDetail = this.getDateDetail(resultat.year, resultat.month - 1, resultat.day);
    this.thisMonth = resultat.month - 1;
    this.thisYear = resultat.year;
    for (const vehicule of this.vehicules) {
      this.calendarShow.push({vehicule : vehicule, calendar: this.boucle(this.dateDetail, vehicule, this.reservations)});
    }
    this.outils.dismissLoading();
  },
  (error: any) => {

      this.outils.dismissLoading();
  });
}

}

