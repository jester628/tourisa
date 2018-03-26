import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { OrdersPage } from '../../pages/orders/orders';  

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html'
})
export class ProductsPage {

	constructor(public navCtrl: NavController) { }

	async productsRedirect() {
		this.navCtrl.setRoot(ProductsPage);
	}

	async ordersRedirect() {
		this.navCtrl.setRoot(OrdersPage);
	}
}

