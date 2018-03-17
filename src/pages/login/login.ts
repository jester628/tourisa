import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { Firebase } from '@ionic-native/firebase';
import { AngularFireAuth } from 'angularfire2/auth';

import { User } from "../../modals/user";
import { HomePage } from "../../pages/home/home";
import { RegisterPage } from "../../pages/register/register";
import * as admin from "firebase-admin";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  user = {} as User;

  constructor (private ofAuth: AngularFireAuth, private firebase: Firebase, private toast: ToastController, public navCtrl: NavController) {}
  
  async register () {
    this.navCtrl.push(RegisterPage);
  }
  
  async login(user: User) {
    
    try {
        console.log('Check if user exists');
        const result = this.ofAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password);
        var uid = "some-uid";
        if (result) {
            /// this.ofAuth.authState.setPersistence(this.ofAuth.auth.Persistence.LOCAL);
            admin.auth().createCustomToken(uid).then((customToken) => {
                    console.log("User is autheticated");
                    this.navCtrl.setRoot(HomePage);
                }).catch(function(e) {
                    console.error(e);
                    this.toast.create({
                        message: e.message,
                        duration: 3000
                    }).present();     
            }); 
        }
    } catch (e) {
        console.error(e);
         this.toast.create({
             message: e.message,
             duration: 3000
         }).present();
    
    }
  }
}

        
 
 