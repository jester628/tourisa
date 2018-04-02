import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Profile } from '../../modals/profile';


@IonicPage()
@Component({
  selector: 'page-editaccount',
  templateUrl: 'editaccount.html',
})
export class EditAccountPage {
	profile = {} as Profile
	public acctArray: any = [];

	constructor(public navCtrl: NavController, public navParams: NavParams, private ofAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, private cdr: ChangeDetectorRef) {}

	async dismiss() {
	    this.navCtrl.pop();
	}
	
	ionViewDidLoad() {
		this.acctArray = this.navParams.get('acctArray');
		this.cdr.detectChanges();
	}

	async newProfile () {
		console.log(this.profile.username);	
	}

}
