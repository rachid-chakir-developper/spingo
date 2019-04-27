import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from '../globals';
import { tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders ({'content-type' : 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient,
              private global: Globals) { }

editReservation(form, idResa): Observable <any> {
return this.http.put(this.global.GET_RESERVATION + '/' + idResa, form.value, httpOptions).pipe(
tap((result: any) => {
console.log(result);
})
);
}

addReservation(form): Observable <any> {
  return this.http.post(this.global.GET_RESERVATION , form.value, httpOptions).pipe(
  tap((result: any) => {
  console.log(result);
  })
  );
  }
  createContrat(id): Observable <any> {
    return this.http.post(this.global.GET_CONTRAT , {'idResa' : id}, httpOptions).pipe(
      tap((result: any) => {
        console.log(result);
      })
    );
  }
  editContrat(form, id): Observable <any> {
    return this.http.put(this.global.GET_CONTRAT + '/' + id, form.value, httpOptions).pipe(
      tap((result: any) => {
        console.log(result);
      })
    );
  }
}
