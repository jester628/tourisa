import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { OrdersPage } from '../pages/orders/orders';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ProfilePage } from '../pages/profile/profile';
import { ModalPage } from '../pages/modal/modal';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Firebase } from '@ionic-native/firebase';
import { MenuProvider } from '../providers/menu/menu';

export const appConfig = {
    databaseURL: "https://tourisa-628ef.firebaseio.com",
    apiKey: "AIzaSyDB3ohWWUA7F0ppgDwCgP-KN2IcgYZYOR0",
    authDomain: "tourisa-628ef.firebaseapp.com",
    projectId: "tourisa-628ef",
    storageBucket: "tourisa-628ef.appspot.com",
    messagingSenderId: "595936375688"
};

@NgModule({
  declarations: [
    MyApp,
    TabsPage,    
    HomePage,
    OrdersPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    ModalPage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(appConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      menuType: 'push',
      platforms: {
        ios: {
          menuType: 'overlay',
        }
      },
      backButtonText: 'Go Back',
      iconMode: 'ios',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'bottom',
      pageTransition: 'ios-transition'
    },
  )],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    HomePage,
    OrdersPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    ModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Firebase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MenuProvider
  ]
})
export class AppModule {}
