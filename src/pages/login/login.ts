import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../../modals/user';
import { HomePage } from '../../pages/home/home';
import { RegisterPage } from '../../pages/register/register';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  user = {} as User;

  constructor (public toast: ToastController, public navCtrl: NavController, private ofAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) {}

  async register () {
    this.navCtrl.push(RegisterPage);
  }

  matchingRole() {
    this.ofAuth.authState.take(1).subscribe( auth => {
      this.afDatabase.list(`users/${auth.uid}`).valueChanges().subscribe(snapshot => {
        snapshot.forEach(role => {
          if (role['customer'] === true) {
            firebase.database().goOnline();
            this.navCtrl.setRoot(HomePage);
          } else if (role['customer'] === false) {
            this.toast.create({
              message: 'Denied access',
              duration: 3000
            }).present();
          }
        });
      });
    });
  } 
  
  async login(user: User) {
    try {
      const result = await this.ofAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password);
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
        if (result) {
            this.matchingRole();
        } else {
          this.toast.create({
              message: 'Incomplete profile details',
              duration: 3000
          }).present();            
        }
      });
    } catch (e) {
        this.toast.create({
            message: e.message,
            duration: 3000
        }).present();
    }
  }
}
 