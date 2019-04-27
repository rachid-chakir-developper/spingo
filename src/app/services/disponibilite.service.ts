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

export class DisponibiliteService {

  constructor(private http: HttpClient,
    private global: Globals) { }

  getDisponibilites(data): Observable <any> {
  return this.http.post(this.global.GET_DISPONIBILITE, data, httpOptions).pipe(
  tap((result: any) => {
  console.log(result);
  })
  );
  }
}
