import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-orderdetails',
  templateUrl: 'orderdetails.html',
})
export class OrderDetailsPage {
	public orderArray: any = [];
	public productsArray: any = [];

	constructor(public navCtrl: NavController, public navParams: NavParams, private ofAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) {}

	async dismiss() {
	    this.navCtrl.pop();
	}

	ionViewDidLoad() {
		this.ofAuth.authState.take(1).subscribe( auth => {
			this.afDatabase.list(`order/${auth.uid}/ordersummary`).valueChanges().subscribe(snapshot => {
				snapshot.forEach(summary => {
					for (var item in summary) {
						this.orderArray.push(summary[item]);
					}
				});
			});

			this.afDatabase.list(`order/${auth.uid}/products`).valueChanges().subscribe(snapshot => {
				snapshot.forEach(product => {
					for (var item in product) {
						this.productsArray.push(product[item]);
					}
				});
			});
		});
  	}

}
