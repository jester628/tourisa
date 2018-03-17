import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { User } from "../../modals/user";
import { AngularFireAuth } from 'angularfire2/auth';
import { ProfilePage } from '../profile/profile';

@IonicPage()
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
            if (result) {
                this.navCtrl.setRoot(ProfilePage);
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