import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, ModalController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { OrderDetailsPage  } from '../../pages/orderdetails/orderdetails';

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html'
})
export class OrdersPage {
	public meetingArray: any = [];
	public confirmation: boolean;

	constructor(public navCtrl: NavController, public menuCtrl: MenuController, private modalCtrl: ModalController, private ofAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) {} 

	ionViewDidLoad() {
		this.ofAuth.authState.take(1).subscribe(auth => {
			this.afDatabase.list(`order/${auth.uid}/meetingdetails`).valueChanges().subscribe(snapshot => {
				snapshot.forEach(detail => {
					this.meetingArray.push(detail);
				});
			});


			this.afDatabase.list(`order/${auth.uid}`).valueChanges().subscribe(snapshot => {
				snapshot.forEach(confirm => {
					//this.confirmation = confirm.confirmation;
				});	
			});
		});
	}

	async orderDetails() {
		let modalOrder = this.modalCtrl.create(OrderDetailsPage);
        modalOrder.present();
	}
}
