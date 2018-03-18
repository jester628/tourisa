import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ProductsPage } from '../pages/products/products';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { OrdersPage } from '../pages/orders/orders';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ProfilePage } from '../pages/profile/profile';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Firebase } from '@ionic-native/firebase';
import * as admin from "firebase-admin";
var serviceAccount =  require("../../resources/tourisa-628ef-firebase-adminsdk-mbdyn-726cd9a14e.json");

export const appConfig = {
    databaseURL: "https://tourisa-628ef.firebaseio.com",
    credential: admin.credential.cert(serviceAccount),
    apiKey: "AIzaSyDB3ohWWUA7F0ppgDwCgP-KN2IcgYZYOR0",
    authDomain: "tourisa-628ef.firebaseapp.com",
    projectId: "tourisa-628ef",
    storageBucket: "tourisa-628ef.appspot.com",
    messagingSenderId: "595936375688"
};

admin.initializeApp(appConfig);

@NgModule({
  declarations: [
    MyApp,
    ProductsPage,
    HomePage,
    TabsPage,
    OrdersPage,
    LoginPage,
    RegisterPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(appConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
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
    ProductsPage,
    HomePage,
    TabsPage,
    OrdersPage,
    LoginPage,
    RegisterPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Firebase,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
