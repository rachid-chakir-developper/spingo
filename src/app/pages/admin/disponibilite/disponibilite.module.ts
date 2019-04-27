import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DisponibilitePage } from './disponibilite.page';
import { ResadetailsComponent } from './resadetails/resadetails.component';

const routes: Routes = [
  {
    path: '',
    component: DisponibilitePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DisponibilitePage, ResadetailsComponent],
  entryComponents : [ResadetailsComponent]
})
export class DisponibilitePageModule {}
