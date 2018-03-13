import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from "../../modals/user";
import { HomePage } from "../../pages/home/home";
import { RegisterPage } from "../../pages/register/register";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  user = {} as User;

  constructor (private ofAuth: AngularFireAuth, public navCtrl: NavController) {
  
  }
  
  async register () {
    this.navCtrl.push(RegisterPage);
  }
  
  async login(user: User) {
        try {
            var require: any; 
            var admin = require("firebase-admin");
            const result = this.ofAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password);
            if (result) {
                console.log("User is logged in");
                    var uid = "some-uid";
                    admin.ofAuth.createCustomToken(uid).then(function(customToken) {
                        this.navCtrl.setRoot(HomePage);
                      })
                      .catch(function(e) {
                        console.log(e);
                        this.toast.create({
                            message: `Cannot login`,
                            duration: 3000
                        }).present();
                      });
            }
            
            } catch (e) {
            console.log("----");
            console.error(e);
        }
   }

}

 
 