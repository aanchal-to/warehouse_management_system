import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  
  { path: 'inventory', loadChildren: () => import('./components/inventory/inventory.module').then(m => m.InventoryModule) },  //staff+admin
  
  { path: 'login', loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule) },
 

  
  { path: 'register', loadChildren: () => import('./components/register/register.module').then(m => m.RegisterModule) },
  
  { path: 'supplier', loadChildren: () => import('./components/supplier/supplier.module').then(m => m.SupplierModule) },   //supplier+admin
  {
    path:'purchaseOrder', loadChildren:()=>import('./components/purchase-order/purchase-order.module').then(m=>m.PurchaseOrderModule)   //customer+admin
  },
  
  { path: 'orderDetails', loadChildren: () => import('./components/order-details/order-details.module').then(m => m.OrderDetailsModule) },  //supplier+admin
  
  { path: 'customer', loadChildren: () => import('./components/customer/customer.module').then(m => m.CustomerModule) }, //customer+admin

   { path: 'admin', loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule) },
   {path:'security',loadChildren: () => import('./components/security/security.module').then(m => m.SecurityModule)}
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
  