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
import { AddCartPage } from '../pages/add-cart/add-cart';
import { ProfilePage } from '../pages/profile/profile';
import { CheckoutPage } from '../pages/checkout/checkout';
import { OrderDetailsPage  } from '../pages/orderdetails/orderdetails';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Firebase } from '@ionic-native/firebase';

export const appConfig = {
    apiKey: "AIzaSyBE_0KKClbBy5VoSHUwOCO89V4xHNY_qag",
    authDomain: "salubong-88dde.firebaseapp.com",
    databaseURL: "https://salubong-88dde.firebaseio.com",
    projectId: "salubong-88dde",
    storageBucket: "salubong-88dde.appspot.com",
    messagingSenderId: "410395805346"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    OrdersPage,
    LoginPage,
    RegisterPage,
    AccountPage,
    ProfilePage,
    AddCartPage,
    CheckoutPage,
    OrderDetailsPage
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
    ProfilePage,
    AddCartPage,
    CheckoutPage,
    OrderDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Firebase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
