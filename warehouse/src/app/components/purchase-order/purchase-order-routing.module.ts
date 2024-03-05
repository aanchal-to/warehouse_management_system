import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseOrderComponent } from './purchase-order.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { CartOrderComponent } from './cart-order/cart-order.component';
import { ListPurchaseOrderComponent } from './list-purchase-order/list-purchase-order.component';

const routes: Routes = [{
  path:'',
  component:PurchaseOrderComponent,
  children:[
    {path:'add',
    component:AddOrderComponent
  },
  {path:'cart-order/:id',
    component:CartOrderComponent
  },
  {
    path:'list',
    component:ListPurchaseOrderComponent
  }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseOrderRoutingModule { }
