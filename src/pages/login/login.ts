import { Component, NgZone } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from "../../modals/user";
import { HomePage } from "../../pages/home/home";
import { RegisterPage } from "../../pages/register/register"

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  user = {} as User;
  
  constructor (private ofAuth: AngularFireAuth, private zone: NgZone, private toast: ToastController, public navCtrl: NavController) {
  
  }
  
  async register () {
    this.navCtrl.push(RegisterPage);
  }
  
async login(user: User) {
        try {
            const result = await this.ofAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password);
            if (result) {
                this.navCtrl.setRoot(HomePage);
            } else {
                this.zone.run(() => {
                    this.toast.create({
                        message: `The password is invalid or the user does not have a password`,
                        duration: 3000
                    }).present();
                });
            }
        } catch (e) {
            console.error(e);
        }
   }

}

 
 