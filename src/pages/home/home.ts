import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoginPage } from '../../pages/login/login';
import { Profile } from '../../modals/profile';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
    
    constructor(private ofAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, private toast: ToastController, private navCtrl: NavController) {
    }

    ionViewWillLoad() {
        this.ofAuth.authState.take(1).subscribe(data => {
            this.afDatabase.list<Profile>("users/" + data.uid).valueChanges().subscribe(snapshot => {
            console.log(snapshot);
            snapshot.forEach (item => {
                this.toast.create({
                    message: `Welcome to Tourisa, ${item.username}`,
                    duration: 3000,
                    position: 'top'
                }).present();   
            })
            
            
            });
        });
    }
    
    logout() {
        try {
            this.navCtrl.setRoot(LoginPage);
        } catch (e) {
            console.error(e);
        }
    } 
}    


