import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'reservations', loadChildren: './reservations/reservations.module#ReservationsPageModule' },
  { path: 'popupclient', loadChildren: './reservations/popupclient/popupclient.module#PopupclientPageModule' },
  { path: 'vehicules', loadChildren: './vehicules/vehicules.module#VehiculesPageModule' },
  { path: 'disponibilite', loadChildren: './disponibilite/disponibilite.module#DisponibilitePageModule' },
  { path: 'charges', loadChildren: './charges/charges.module#ChargesPageModule' },
  { path: 'statistiques', loadChildren: './statistiques/statistiques.module#StatistiquesPageModule' },
  { path: 'contrat', loadChildren: './reservations/contrat/contrat.module#ContratPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
