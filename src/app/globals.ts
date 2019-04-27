import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  URL_API = 'http://spingorentcar.com/api';
  URL_LOGIN = this.URL_API + '/login_check';
  GET_EMPLOYE = this.URL_API + '/reservation/1/list';
  GET_RESERVATION = this.URL_API + '/reservations';
  GET_CLIENT = this.URL_API + '/clients';
  GET_VEHICULE = this.URL_API + '/vehicules';
  GET_PARTENAIRE = this.URL_API + '/partenaires';
  GET_DISPONIBILITE = this.URL_API + '/disponibilites';
  GET_CHARGES = this.URL_API + '/charges';
  GET_DASHBOARD = this.URL_API + '/dashboard';
  GET_CONTRAVENTION = this.URL_API + '/contravention';
  GET_CONTACT = this.URL_API + '/contact';
  GET_PROFIL = this.URL_API + '/monprofil';
  GET_CONTRAT = this.URL_API + '/contrats';
}
