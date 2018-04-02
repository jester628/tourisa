import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Profile } from '../../modals/profile';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
	public acctArray: any = [];
	profile = {} as Profile;

	constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public toast: ToastController, private ofAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, private cdr: ChangeDetectorRef) {}

	ionViewDidLoad() {
		this.ofAuth.authState.take(1).subscribe(auth => {
			this.afDatabase.list(`users/${auth.uid}`).valueChanges().take(1).subscribe(snapshot => {
				snapshot.forEach(info => {
					this.acctArray.push(info);
					console.log(info);
					this.cdr.detectChanges();
				});
			})
		});		 
	}
}
