import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        children: [
          { path: '', loadChildren: '../admin/dashboard/dashboard.module#DashboardPageModule' },
          { path: 'contravention', loadChildren: '../admin/contravention/contravention.module#ContraventionPageModule' },
          { path: 'vehicules', loadChildren: '../admin/vehicules/vehicules.module#VehiculesPageModule' },
          { path: 'vehicules/edit/:id', loadChildren: '../admin/vehicules/editvehicule/editvehicule.module#EditvehiculePageModule' },
          { path: 'vehicules/show/:idShow', loadChildren: '../admin/vehicules/editvehicule/editvehicule.module#EditvehiculePageModule' },
          { path: 'vehicules/add', loadChildren: '../admin/vehicules/editvehicule/editvehicule.module#EditvehiculePageModule' },
          { path: 'clients', loadChildren: '../admin/clients/clients.module#ClientsPageModule' },
          { path: 'clients/add', loadChildren: '../admin/clients/editclient/editclient.module#EditclientPageModule' },
          { path: 'clients/edit/:id', loadChildren: '../admin/clients/editclient/editclient.module#EditclientPageModule' },
          { path: 'clients/show/:idShow', loadChildren: '../admin/clients/editclient/editclient.module#EditclientPageModule' },
        ]
      },
      {
        path: 'reservations',
        children: [
          { path: '', loadChildren: '../admin/reservations/reservations.module#ReservationsPageModule' },
          { path: 'edit/:id', loadChildren: '../admin/reservations/editresa/editresa.module#EditresaPageModule' },
          { path: 'show/:idShow', loadChildren: '../admin/reservations/editresa/editresa.module#EditresaPageModule' },
          { path: 'add', loadChildren: '../admin/reservations/editresa/editresa.module#EditresaPageModule' },
          { path: 'contrat/:id', loadChildren: '../admin/reservations/contrat/contrat.module#ContratPageModule' }
        ]
      },
      {
        path: 'disponibilite',
        children: [
          { path: '', loadChildren: '../admin/disponibilite/disponibilite.module#DisponibilitePageModule' },
        ]
      },
      {
        path: 'charges',
        children: [
          { path: '', loadChildren: '../admin/charges/charges.module#ChargesPageModule' },
          { path: 'edit/:id', loadChildren: '../admin/charges/editcharge/editcharge.module#EditchargePageModule' },
          { path: 'show/:idShow', loadChildren: '../admin/charges/editcharge/editcharge.module#EditchargePageModule' },
          { path: 'add', loadChildren: '../admin/charges/editcharge/editcharge.module#EditchargePageModule' },
        ]
      },
      {
        path: 'settings',
        children: [
          { path: '', loadChildren: '../admin/settings/settings.module#SettingsPageModule' }
        ]
      },
      {
        path: '',
        redirectTo: '/app/tabs/dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
