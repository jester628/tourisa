import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Profile } from '../../modals/profile';


@IonicPage()
@Component({
  selector: 'page-editaccount',
  templateUrl: 'editaccount.html',
})
export class EditAccountPage {
	profile = {} as Profile;
	public acctArray: any = [];

	constructor(public navCtrl: NavController, public navParams: NavParams, public toast: ToastController, private ofAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, private cdr: ChangeDetectorRef) {}

	async dismiss() {
	    this.navCtrl.pop();
	}
	
	ionViewWillLoad() {
		this.acctArray = this.navParams.get('acctArray');
		this.cdr.detectChanges();
	}

	async newProfile () {
		try {
			console.log(this.profile);
			this.ofAuth.authState.take(1).subscribe(auth => {
				this.profile.customer = true;
				this.afDatabase.list<Profile>(`users/${auth.uid}`).set(this.profile).then(() => {
					this.cdr.detectChanges();
					this.navCtrl.pop();
					this.toast.create({
						message: 'Profile has been updated',
						duration: 3000
					}).present();
				});
			});
		} catch (e) {
			this.toast.create({
				message: e.message,
				duration: 3000
			}).present();
		}
	}

}
