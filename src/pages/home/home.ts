import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, ModalController, MenuController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { OrdersPage } from '../../pages/orders/orders';
import { LoginPage } from '../../pages/login/login';
import { AddCartPage } from '../../pages/add-cart/add-cart';
import { AccountPage } from '../../pages/account/account';
import { FeedbackPage } from '../../pages/feedback/feedback';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
    pasalubong: string = "food";
    public productArray: any = [];

    constructor(public toast: ToastController, public navCtrl: NavController, private modalCtrl: ModalController, public menuCtrl: MenuController, private ofAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) {}

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

        this.afDatabase.list(`products`).valueChanges().subscribe(snapshot => {
            snapshot.forEach(productObj => {
                console.log(productObj);
                this.productArray.push(productObj);
            });
        });

        return productArray;
    }

    async openMenu() {
       this.menuCtrl.open();
    }

    async openOrders() {
        this.navCtrl.push(OrdersPage);
    }

    async openAccount() {
        this.navCtrl.push(AccountPage);
    }

    async openFeedback() {
        this.navCtrl.push(FeedbackPage);
    }

    async closeMenu() {
        this.menuCtrl.close();
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

    async addCart(productName) {
        productArray.forEach(product => {
            if(product == productName) {
                console.log(product);
                console.log(productName);
                let modal = this.modalCtrl.create(AddCartPage, {name: product['name'], pic: product['pic'], price: product['price'], supplier: product['supplier']});
                modal.onDidDismiss(data => {
                    console.log(data);
                });
                modal.present();
            }
        });
    }
}    


