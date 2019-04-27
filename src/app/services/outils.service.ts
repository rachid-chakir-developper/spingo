import { Injectable } from '@angular/core';
import { LoadingController, ToastController, ModalController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class OutilsService {

  constructor(
    private loadingController: LoadingController,
    private toast: ToastController,
    private modalClient: ModalController,
  ) { }

  async presentLoading(message: string) {
    const loading = await this.loadingController.create({
     message: message
   });
   await loading.present();
 }

 async dismissLoading() {
   this.loadingController.dismiss();
 }

 async presentToast(myMessage) {
  const toast = await this.toast.create({
    message: myMessage,
    duration: 2000,
    position: 'top',
  });
  toast.present();
}

async presentModal(myComponent) {
  const modal = await this.modalClient.create({
    component: myComponent
  });
  return await modal.present();
}
}
