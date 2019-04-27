import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { Platform, MenuController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CheckLoginService } from './services/check-login.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  public onlineOffline: boolean = navigator.onLine;
  pages = [
    {
      title: `Tableau de bord`, url: `/`, icon: `home`
    },
    {
      title: `Gestion de véhicule`, url: `/app/tabs/dashboard/vehicules`, icon: `car`
    },
    {
      title: `Gestion clients`, url: `/app/tabs/dashboard/clients`, icon: `person`
    },
    /*{
      title: 'Gestion de véhicule', icon: 'car', submenu: [
        { title: 'Liste des véhicules', url: '/login' },
        { title: 'Echéancier du parc', url: '/tutorial' },
        { title: `Tableau d'entretien`, url: '/' }
      ]
    },*/
    {
      title: `Réservations`, url: `/app/tabs/reservations`, icon: `create`
    }
    ,
    {
      title: `Dsiponibilité`, url: `/app/tabs/disponibilite`, icon: `calendar`
    },
    {
      title: `Charges`, url: `/app/tabs/charges`, icon: `pricetags`
    },
    {
      title: `Contravention`, url: `/app/tabs/dashboard/contravention`, icon: `hand`
    },
    {
      title: `Réglages`, url: `/app/tabs/settings`, icon: `cog`
    }


];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menuCtrl: MenuController,
    private router: Router,
    private toast: ToastController,
    private checkLogin: CheckLoginService,
    public storage: Storage
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd && event.url === '/login') {
        this.menuCtrl.enable(false);
      } else if (event instanceof NavigationEnd && event.url !== '/login') {
        this.menuCtrl.enable(true);
      }
    });
  }

  async presentToast() {
    const toast = await this.toast.create({
      message: 'Vérifier la connexion internet',
      position: 'bottom',
    });
    toast.present();
  }
  seeTutorial() {
    this.storage.remove('ion_did_tutorial').then(res => {
        this.router.navigateByUrl('/tutorial');
    });
  }
  logout() {
    this.checkLogin.logoutUser();
  }
  initializeApp() {
    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();

      window.addEventListener('offline', () => {
        alert('Connexion perdue');
        this.router.navigate(['offline']);
      });

      window.addEventListener('online', () => {
        this.router.navigate(['app', 'tabs', 'dashboard']);
      });

      if (!navigator.onLine) {
        this.router.navigate(['offline']);
      }

    });
  }
}
