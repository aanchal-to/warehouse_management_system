import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { InventoryTableComponent } from './inventory-table/inventory-table.component';
import { OrderTableComponent } from './order-table/order-table.component';
import { CustomerComponent } from './customer/customer.component';
import { SupplierComponent } from './supplier/supplier.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddInventoryTableComponent } from './add-inventory-table/add-inventory-table.component';
import { AddSupplierTableComponent } from './add-supplier-table/add-supplier-table.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    AdminComponent,
    InventoryTableComponent,
    OrderTableComponent,
    CustomerComponent,
    SupplierComponent,
    AddInventoryTableComponent,
    AddSupplierTableComponent,
    AddOrderComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
