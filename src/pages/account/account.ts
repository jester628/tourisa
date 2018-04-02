import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { EditAccountPage } from '../../pages/editaccount/editaccount';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
	public acctArray: any = [];

	constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private ofAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) {}

	ionViewDidLoad() {
		this.ofAuth.authState.take(1).subscribe(auth => {
			this.afDatabase.list(`users/${auth.uid}`).valueChanges().subscribe(snapshot => {
				snapshot.forEach( info => {
					this.acctArray.push(info);
				});
			})
		});		 
	}

	async editAcct () {
		let modalCheckout = this.modalCtrl.create(EditAccountPage, {acctArray: this.acctArray});
        modalCheckout.present();
	}
}
