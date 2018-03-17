import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

    constructor(private ofAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams){ }
  
    createProfile() {
       this.ofAuth.authState.take(1).subscribe(auth => {
           var uid = auth.uid;
           this.afDatabase.list("users/" + uid).push(this.profile)
            .then(() => this.navCtrl.setRoot(HomePage));
       });
    }
}

