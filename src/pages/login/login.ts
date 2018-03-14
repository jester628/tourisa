import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from "../../modals/user";
import { HomePage } from "../../pages/home/home";
import { RegisterPage } from "../../pages/register/register";
import * as admin from "firebase-admin";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  user = {} as User;

  constructor (private ofAuth: AngularFireAuth, private toast: ToastController, public navCtrl: NavController) {
  
  }
  
  async register () {
    this.navCtrl.push(RegisterPage);
  }
  
  async login(user: User) {
        try {
            const result = this.ofAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password);
            if (result) {
                console.log("User is autheticated");
                var uid = "some-uid";
                admin.auth().createCustomToken(uid).then((customToken) => {
                    this.navCtrl.setRoot(HomePage);
                }).catch(function(e) {
                console.log(e)
                this.toast.create({
                    message: `Cannot login`,
                    duration: 3000
                }).present();
               });
             }
          } catch (e) {
            console.error(e);
        }
   }
}

 
 