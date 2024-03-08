import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CustomerComponent } from '../admin/customer/customer.component';
import { InventoryTableComponent } from '../admin/inventory-table/inventory-table.component'
import { SupplierComponent } from '../admin/supplier/supplier.component';
import { OrderTableComponent } from '../admin/order-table/order-table.component';
import { AddInventoryTableComponent } from './add-inventory-table/add-inventory-table.component';
import { AddSupplierTableComponent } from './add-supplier-table/add-supplier-table.component';
import { AddOrderComponent } from '../admin/add-order/add-order.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthsecGuard } from '../security/authsec.guard';

const routes: Routes = [{
  path: '', component: AdminComponent, canActivate: [AuthsecGuard], children: [
    {
      path: 'customer', component: CustomerComponent
    },
    {
      path: 'inventory-table', component: InventoryTableComponent
    },
    {
      path: 'inventory-table/add', component: AddInventoryTableComponent
    },
    {
      path: 'supplier', component: SupplierComponent
    },
    {
      path: 'order', component: OrderTableComponent
    },
    {
      path: 'supplier/add', component: AddSupplierTableComponent
    },
    {
      path: 'order/add', component: AddOrderComponent
    },
    {
      path: '', component: DashboardComponent
    },

  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
