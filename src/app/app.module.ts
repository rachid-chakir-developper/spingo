import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/token-interceptor.service';

import { Globals } from './globals';
import { PopupclientComponent } from './pages/admin/reservations/popupclient/popupclient.component';
import { PopuplistclientComponent } from './pages/admin/reservations/popuplistclient/popuplistclient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopuplistvehiculeComponent } from './pages/admin/reservations/popuplistvehicule/popuplistvehicule.component';
import { PopuplistpartenaireComponent } from './pages/admin/reservations/popuplistpartenaire/popuplistpartenaire.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { CallNumber } from '@ionic-native/call-number/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { ContactComponent } from './pages/admin/settings/contact/contact.component';
import { PasswordComponent } from './pages/admin/settings/password/password.component';

@NgModule({
  declarations: [AppComponent, PopupclientComponent, PopuplistclientComponent, PopuplistvehiculeComponent,
    PopuplistpartenaireComponent, ContactComponent, PasswordComponent],
  entryComponents: [PopupclientComponent, PopuplistclientComponent, PopuplistvehiculeComponent, PopuplistpartenaireComponent,
    ContactComponent, PasswordComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  providers: [
    Globals,
    SocialSharing,
    SMS,
    StatusBar,
    CallNumber,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
