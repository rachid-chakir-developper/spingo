import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { CheckTutorialService } from './services/check-tutorial.service';
import { CheckLoginService } from './services/check-login.service';


const routes: Routes = [
  { path: '', redirectTo: '/tutorial', pathMatch: 'full'},
  { path: 'app', loadChildren: './pages/tabs/tabs.module#TabsPageModule', canActivate: [CheckLoginService] },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', canLoad: [CheckLoginService] },
  { path: 'tutorial', loadChildren: './pages/tutorial/tutorial.module#TutorialPageModule', canLoad: [CheckTutorialService] },
  { path: 'offline', loadChildren: './pages/offline/offline.module#OfflinePageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
