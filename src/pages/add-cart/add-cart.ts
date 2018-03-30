import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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

	constructor(public navCtrl: NavController, public navParams: NavParams, public toast: ToastController, private ofAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) { }

	async dismiss() {
	    this.navCtrl.pop();
	}
		
	async addToCart() {
		this.product.name = this.navParams.get('name');
		this.product.pic = this.navParams.get('pic');
		this.product.price = this.navParams.get('price');
		this.product.supplier = this.navParams.get('supplier');
		/// this.product.quantity is already declared when user inputs their quantity
		console.log(this.product);
		this.ofAuth.authState.take(1).subscribe(auth => {
			this.afDatabase.list<Product>(`cart/${auth.uid}/`).push(this.product).then(() => {
				this.toast.create({
					message: `${this.product.quantity} ${this.product.name} has been added to your cart`,
					duration: 2000
				}).present();
				this.dismiss();
			}, e => {
				this.toast.create({
					message: `Please input the correct amount for quantity`,
					duration: 2000
				}).present();
			});
		});
	}

}
