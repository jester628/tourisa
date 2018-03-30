import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Delivery } from '../../modals/delivery';

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
	public cart: any = [];
	public orderSummary: any = [];
	public itemTotal: any = 0;
	public serviceFee: any = 0;
	public orderTotal: any = 0;
	delivery = {} as Delivery;

	constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private ofAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) {
	}

	async dismiss() {
	    this.navCtrl.pop();
	}	

	ionViewWillLoad() {
        this.ofAuth.authState.take(1).subscribe(auth => {
            this.afDatabase.list(`cart/${auth.uid}`).valueChanges().subscribe(snapshot => {
                snapshot.forEach(product => {
					var productPrice = parseInt(product['price'].substring(1));
					console.log("Price: " + productPrice);
					
					var productQuantity = parseInt(product['quantity']);
					console.log("Quantity: " + productQuantity);
					
					var productCost = productPrice*productQuantity;
					console.log("Cost: " + productCost);
					
					this.cart.push({name: product['name'], pic: product['pic'], supplier: product['supplier'], price: product['price'], quantity: productQuantity, cost: productCost });
					
					this.itemTotal += productCost;
					console.log("Item total: " + this.itemTotal);
                });

                this.serviceFee = this.itemTotal - (this.itemTotal*0.10);
                this.orderTotal = this.itemTotal + this.serviceFee;
                this.orderSummary.push({ItemTotal: this.itemTotal, ServiceFee: this.serviceFee, OrderTotal: this.orderTotal});
            });

        });
	}

	async checkout() {
		this.ofAuth.authState.take(1).subscribe(auth => {
			this.afDatabase.list(`order/${auth.uid}/products`).push(this.cart);
			this.afDatabase.list(`order/${auth.uid}/meetingdetails`).push(this.delivery);
			this.afDatabase.list(`order/${auth.uid}/ordersummary`).push(this.orderSummary);
			this.afDatabase.list(`cart/${auth.uid}`).remove();
		});

		this.navCtrl.pop();
	}
}
