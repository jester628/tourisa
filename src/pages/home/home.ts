import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoginPage } from '../../pages/login/login';
import * as firebase from "firebase";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
    
    constructor(private ofAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, public toast: ToastController, private navCtrl: NavController) {
    }

    ionViewWillLoad() {
        this.ofAuth.authState.take(1).subscribe(data => {
            this.afDatabase.list(`users/${data.uid}`).valueChanges().subscribe(snapshot => {
                snapshot.forEach (item => {
                    this.toast.create({
                        message: `Welcome to Tourisa, ${item['username']}`,
                        duration: 3000
                    }).present();   
                });
            });
        });
    }
    
    logout() {
        try {
            firebase.auth().signOut();
            console.log('User has logged off');
            firebase.database().goOffline();
            this.navCtrl.setRoot(LoginPage);
        } catch (e) {
            console.error(e);
        }
    } 
}    


