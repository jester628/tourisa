import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoginPage } from '../../pages/login/login';
import { OrdersPage } from '../../pages/orders/orders';

@Injectable()
export class MenuProvider {

  constructor(private ofAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) { }

}
