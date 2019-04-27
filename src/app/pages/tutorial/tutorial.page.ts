import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { MenuController, IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {

  showSkip = true;

  @ViewChild('slides') slides: IonSlides;
  constructor(
    public menu: MenuController,
    public router: Router,
    public storage: Storage
  ) { }

  ngOnInit() {
    this.storage.get('ion_did_tutorial').then(res => {
      if (res === true) {
        this.router.navigateByUrl('/app/tabs/login');
      }
    });
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

  startApp() {
    this.router
      .navigate(['/login'])
      .then(() => this.storage.set('ion_did_tutorial', 'true'));
  }

  onSlideChangeStart(event) {
    event.target.isEnd().then(isEnd => {
      this.showSkip = !isEnd;
    });
  }
}

