import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../../modals/product';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';;

@IonicPage()
@Component({
  selector: 'page-add-cart',
  templateUrl: 'add-cart.html',
})
export class AddCartPage {
	product = {} as Product;
	public cartArray: any = [];

	constructor(public navCtrl: NavController, public navParams: NavParams, private ofAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) { }

	async dismiss() {
	    this.navCtrl.pop();
	}

	async addToCart() {
		this.cartArray.push({name: this.navParams.get('name'), pic: this.navParams.get('pic'), price: this.navParams.get('price'), supplier: this.navParams.get('supplier')});
		console.log(this.cartArray);
	}

}
