import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, ModalController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoginPage } from '../../pages/login/login';
import { OrdersPage } from '../../pages/orders/orders';
import { Profile } from '../../modals/profile';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
    
    constructor(private ofAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, private toast: ToastController, private navCtrl: NavController, private modalCtrl: ModalController) { }


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

    async productsRedirect() {
        this.navCtrl.setRoot(HomePage);
    }

    async ordersRedirect(){
        this.navCtrl.setRoot(OrdersPage);
    }
    
    async click(){
        this.modalCtrl.create(OrdersPage).present();
    }

    async userMenu() {

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

    async presentModal(){
        this.modalCtrl.create(OrdersPage).present();
    }
}    


