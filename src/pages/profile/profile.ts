import { Component} from '@angular/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { Profile } from '../../modals/profile';
import { HomePage } from '../../pages/home/home';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

export class ProfilePage {
    profile = {} as Profile; 

    constructor(private ofAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, private toast: ToastController, public navCtrl: NavController, public navParams: NavParams) {}
    
  
    createProfile() {
       try {
          var username = this.profile['username'];
          var firstname = this.profile['firstname'];
          var lastname = this.profile['lastname'];
          var contactnum = this.profile['contactnum'];
          
         if (username != null && firstname != null && lastname != null && contactnum != null) {
            this.ofAuth.authState.subscribe(auth => {
                this.profile.customer = true;
                this.afDatabase.list<Profile>(`users/${auth.uid}`).push(this.profile).then(() => {
                  this.navCtrl.setRoot(HomePage)
                });
            });
         } else {
            this.toast.create({
              message: 'Please fill up all profile details',
              duration: 3000
            }).present(); 
         }
       } catch (e) {
            this.toast.create({
                message: e.message,
                duration: 3000
            }).present(); 
       }
    }
}

