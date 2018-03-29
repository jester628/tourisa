import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { LoginPage } from '../../pages/login/login';
import { AccountPage } from '../../pages/account/account';
import { FeedbackPage } from '../../pages/feedback/feedback';

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html'
})
export class OrdersPage {

	constructor(public navCtrl: NavController, public menuCtrl: MenuController) {

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

}
