import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { User } from "../../modals/user";
import { AngularFireAuth } from 'angularfire2/auth';
import { ProfilePage } from '../profile/profile';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as User;
  
  constructor (private ofAuth: AngularFireAuth, private toast: ToastController, public navCtrl: NavController) {
    
  
  }
  
    async register(user: User) {
        try {
            const result = await this.ofAuth.auth.createUserWithEmailAndPassword(this.user.email, this.user.password);
            console.log(result);
            console.log(user);
            if (result) {
            
            this.navCtrl.setRoot(ProfilePage);
            
            } else if (typeof result == undefined) {
                this.toast.create({
                    message: `Wrong input`,
                    duration: 3000
                }).present();
                
            } else {
                this.toast.create({
                    message: `Cannot register at the moment`,
                    duration: 3000
                }).present();
            }
        } catch (e) {
            console.log("----");
            console.error(e);
        }
    }
}