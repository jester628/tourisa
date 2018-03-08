import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ProductsPage } from '../products/products';
import { OrdersPage } from '../orders/orders';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ProductsPage;
  tab3Root = OrdersPage;

  constructor() {

  }
}
