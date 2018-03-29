import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-add-cart',
  templateUrl: 'add-cart.html',
})
export class AddCartPage {

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidLoad() {
		console.log(this.navParams.get('name'));
		console.log(this.navParams.get('price'));
		console.log(this.navParams.get('pic'));
		console.log(this.navParams.get('supplier'));
	}

	async dismiss() {
	    this.navCtrl.pop();
	}

}
