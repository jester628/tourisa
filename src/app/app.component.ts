import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage: any;
  constructor( platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private ofAuth: AngularFireAuth ) {
      ofAuth.authState.take(1).subscribe(auth => {
		    if (auth) {
		      this.rootPage = HomePage;
		    } else {
		      this.rootPage = LoginPage;
		    }
		  });
        platform.ready().then(() => {
          statusBar.styleDefault();
          splashScreen.hide();
        });
     }
}

