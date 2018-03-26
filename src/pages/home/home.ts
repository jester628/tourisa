import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, ModalController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { OrdersPage } from '../../pages/orders/orders';
<<<<<<< HEAD
import { Profile } from '../../modals/profile';
=======
import { ModalPage } from '../../pages/modal/modal';
import { MenuProvider } from '../../providers/menu/menu';
>>>>>>> 3dbc4f6deeaa00045603cfa53d6e788e4ab8861d
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
    pasalubong: string = "food";

    constructor(private ofAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, private toast: ToastController, private navCtrl: NavController, private modalCtrl: ModalController, private menu: MenuProvider) {}

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

    async presentModal(){
        this.modalCtrl.create(OrdersPage).present();
    }

    async openMenu() {
       this.menuCtrl.open();
    }

    async openPage(page) {
        this.navCtrl.setRoot(page);
    }

    async closeMenu() {

    }

    async logout() {
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


