import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
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
	public quantityArray: any = [];
	public itemTotal: any = 0;
	public serviceFee: any = 0;
	public orderTotal: any = 0;
	public quantityTotal: any = 0;
	public orderExists: boolean = false;
	public isEnabled: boolean = false;
	public isDisabled: boolean = false;
	public minDate: any = new Date().toJSON();
	public maxDate: any = new Date().getFullYear() + '-' + new Date().getMonth()+1;
	delivery = {} as Delivery;


	constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public toast: ToastController, private ofAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) {}

	async dismiss() {
	    this.navCtrl.pop();
	}

	async createToast(message) {
		this.toast.create({
			message: `${message}`,
			duration: 3000
		}).present();
	}

	async disableCheckout() {
		this.isEnabled = true;
	}

	async checkQuantity(quantity, checkOrder) {
		if (quantity < 6 && checkOrder == false) {
			this.disableCheckout();
			var quantityMessage = "The minimum number of products to order is 6. Please add more to your cart";
			this.createToast(quantityMessage);
		}
	}

	async checkOrder() {
		this.ofAuth.authState.take(1).subscribe(auth => {
			this.afDatabase.list(`order/${auth.uid}`).valueChanges().take(1).subscribe(snapshot => {
				if (snapshot.length > 0) {
					this.disableCheckout();
					var orderMessage = "You already have a placed order. You can only place another order once your previous order is finished";
					this.createToast(orderMessage);
					this.orderExists = true;
					return this.orderExists;
				}
			});
		});
	}	

	ionViewWillLoad() {
		var returnOrder = this.checkOrder();
		console.log(JSON.stringify(returnOrder));
		this.ofAuth.authState.take(1).subscribe(auth => {
            this.afDatabase.list(`cart/${auth.uid}`).valueChanges().subscribe(snapshot => {
                snapshot.forEach(product => {
					var productPrice = parseInt(product['price']);
					var productQuantity = parseInt(product['quantity']);
					var productCost = productPrice*productQuantity;

					this.cart.push({name: product['name'], pic: product['pic'], supplier: product['supplier'], price: product['price'], quantity: productQuantity, cost: productCost });
					
					this.itemTotal += productCost;
					this.quantityTotal += productQuantity;
                });

                this.serviceFee = this.itemTotal*0.10;
                this.orderTotal = this.itemTotal + this.serviceFee;
                this.orderSummary.push({ItemTotal: this.itemTotal, ServiceFee: this.serviceFee, OrderTotal: this.orderTotal});
                this.checkQuantity(this.quantityTotal, returnOrder);
            });
        });
	}

	async checkout() {
		this.ofAuth.authState.take(1).subscribe(auth => {
			this.delivery.date = new Date().toJSON().split('T')[0]
			var place = this.delivery['place'];
			var date = this.delivery['date'];
			var time = this.delivery['time'];
			if (place != null && date != null && time != null) {
				this.afDatabase.list(`order/${auth.uid}/products`).push(this.cart);
				this.afDatabase.list(`order/${auth.uid}/meetingdetails`).push(this.delivery);
				this.afDatabase.list(`order/${auth.uid}/ordersummary`).push(this.orderSummary);
				this.afDatabase.list(`order/${auth.uid}`).push({confirmation: null, delivered: false});
				this.afDatabase.list(`cart/${auth.uid}`).remove();
				this.dismiss();
				var checkoutMessage = 'We will contact you if your order has been reconfirmed';
				this.createToast(checkoutMessage);
			} else {
				var incMeetingMessage = 'Please put complete all necessary details for meeting details';
				this.createToast(incMeetingMessage);
			}
		});
	}
}
