import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../../pages/login/login'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
    constructor(private ofAuth: AngularFireAuth, private toast: ToastController, private navCtrl: NavController, publicNavParams: NavParams) {

    }
 
    ionViewWillLoad() {
        this.ofAuth.authState.subscribe(data => {
            if (data.email && data.uid)  {
                this.toast.create({
                    message: `Welcome to Tourisa, ${data.email}`,
                    duration: 3000,
                    position: 'top'
                }).present();
            } else {
                this.toast.create({
                    message: `Could not find authentication details`,
                    duration: 3000
                }).present();
            }
        });
    }
    
    logout() {
        try {
            this.navCtrl.setRoot(LoginPage);
        } catch (e) {
            console.error(e);
        }
    } 
}    


