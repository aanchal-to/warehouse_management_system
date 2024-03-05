import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierComponent } from './supplier.component';
import { ListSupplierComponent } from './list-supplier/list-supplier.component';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OneSupplierComponent } from './one-supplier/one-supplier.component';
import { OneSupplierListComponent } from './one-supplier-list/one-supplier-list.component';
import { OneSupplierOrdersListComponent } from './one-supplier-orders-list/one-supplier-orders-list.component';
import { AddOrderDetailsComponent } from './add-order-details/add-order-details.component';
import { ListOrderDetailsComponent } from '../supplier/list-order-details/list-order-details.component';
import {DashboardComponent} from '../supplier/dashboard/dashboard.component'

const routes: Routes = [
  { path: '', component: SupplierComponent ,
  children: [
    {path:'list',component:ListSupplierComponent},
  {path:'add',component:AddSupplierComponent},
  {path:'ordersList',component:OrdersListComponent},
  {path:'add-item', component:OneSupplierComponent},
  {path:'itemList',component:OneSupplierListComponent},
  {path:'one-supplier-orders-list',component:OneSupplierOrdersListComponent},
  {path:'add-order-details', component:AddOrderDetailsComponent},
  {path:'list-order-details',component:ListOrderDetailsComponent},
  {path:'',component:DashboardComponent}
  ]

}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
