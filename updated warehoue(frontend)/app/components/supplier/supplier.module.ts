import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierComponent } from './supplier.component';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { ListSupplierComponent } from './list-supplier/list-supplier.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OneSupplierComponent } from './one-supplier/one-supplier.component';
import { OneSupplierListComponent } from './one-supplier-list/one-supplier-list.component';
import { OneSupplierOrdersListComponent } from './one-supplier-orders-list/one-supplier-orders-list.component';
import { AddOrderDetailsComponent } from './add-order-details/add-order-details.component';
import { ListOrderDetailsComponent } from './list-order-details/list-order-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerListComponent } from './customer-list/customer-list.component';





@NgModule({
  declarations: [
    SupplierComponent,
    AddSupplierComponent,
    ListSupplierComponent,
    OrdersListComponent,
    OneSupplierComponent,
    OneSupplierListComponent,
    OneSupplierOrdersListComponent,
    AddOrderDetailsComponent,
    ListOrderDetailsComponent,
    DashboardComponent,
    CustomerListComponent,
  
   
  
  ],
  imports: [
    CommonModule,
    SupplierRoutingModule,
    ReactiveFormsModule
  ]
})
export class SupplierModule { }
