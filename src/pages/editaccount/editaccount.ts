import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profile } from '../../modals/profile';

@IonicPage()
@Component({
  selector: 'page-editaccount',
  templateUrl: 'editaccount.html',
})
export class EditAccountPage {
	profile = {} as Profile
	public acctArray: any = [];

	constructor(public navCtrl: NavController, public navParams: NavParams) {}

	ionViewDidLoad() {
		this.acctArray.forEach( info => {
			this.profile.username = info['username'];
			this.profile.firstname = info['firstname'];
			this.profile.lastname = info['lastname'];
			this.profile.contactnum = info['contactnum'];
			this.acctArray.push(info);
		});
	}

	async newProfile () {
		this.ofAuth.authState.take(1).subscribe(auth => {
			this.afDatabase.list<Profile>(`users/${auth.uid}`).push(this.profile).then(() => {
				
			})
		});	
	}

}
