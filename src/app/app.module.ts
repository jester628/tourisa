import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { OrdersPage } from '../pages/orders/orders';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { AccountPage } from '../pages/account/account';
import { FeedbackPage } from '../pages/feedback/feedback';
import { AddCartPage } from '../pages/add-cart/add-cart';
import { ProfilePage } from '../pages/profile/profile';
import { CheckoutPage } from '../pages/checkout/checkout';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Firebase } from '@ionic-native/firebase';

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
    HomePage,
    OrdersPage,
    LoginPage,
    RegisterPage,
    AccountPage,
    FeedbackPage,
    ProfilePage,
    AddCartPage,
    CheckoutPage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(appConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      platforms: {
        ios: {
          menuType: 'overlay',
        },
        android: {
          menuType: 'overlay',
        }
      },
      backButtonText: 'Go Back',
      iconMode: 'ios',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      pageTransition: 'md-transition'
    },
  )],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    OrdersPage,
    LoginPage,
    RegisterPage,
    AccountPage,
    FeedbackPage,
    ProfilePage,
    AddCartPage,
    CheckoutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Firebase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
