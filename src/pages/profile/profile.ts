import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profile } from '../../modals/profile';
///import { HomePage } from '../../pages/home/home';
///import { AngularFireDatabaseModule } from 'angularfire2/database';
///import { AngularFireAuth } from 'angularfire2/auth';
///private ofAuth: AngularFireAuth, private afDatabase: AngularFireDatabaseModule,

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
    
  profile = {} as Profile;
  
  constructor(public navCtrl: NavController, public navParams: NavParams){
  }
  
  createProfile() {
             ///auth => (this.afDatabase.list(`profile/${auth.uid}`).valueChanges(this.profile).subscribe(console.log).then(() => this.navCtrl.setRoot(HomePage)))
      }
  }

