import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../../pages/login/login'

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
    constructor(private ofAuth: AngularFireAuth, private toast: ToastController, private navCtrl: NavController, publicNavParams: NavParams) { }
 
    ionViewWillLoad() {
        this.ofAuth.authState.subscribe(auth => {
            if (auth.username && auth.id)  {
                this.toast.create({
                    message: `Welcome to Tourisa, ${auth.username}`,
                    duration: 3000,
                    position: 'top'
                }).present();
            } else {
                this.toast.create({
                    message: `Could not find authentication details`,
                    duration: 3000,
                    position: 'top'
                }).present();
            }
        });
    }
    
    /// ADD PRODUCT PAGE

    logout() {
        try {
            this.navCtrl.setRoot(LoginPage);
        } catch (e) {
            console.error(e);
        }
    } 
}    


