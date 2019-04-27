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
export class ClientService {

  constructor(private http: HttpClient,
              private global: Globals) { }

  createClient(form): Observable <any> {
    return this.http.post(this.global.GET_CLIENT, form.value, httpOptions).pipe(
      tap((result: any) => {
          console.log(result);
      })
    );
  }

  editClient(form, idClient): Observable <any> {
    return this.http.put(this.global.GET_CLIENT + '/' + idClient, form.value, httpOptions).pipe(
    tap((result: any) => {
    console.log(result);
    })
    );
    }

}
