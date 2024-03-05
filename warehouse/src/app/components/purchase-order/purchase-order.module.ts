import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseOrderRoutingModule } from './purchase-order-routing.module';
import { AddOrderComponent } from './add-order/add-order.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PurchaseOrderComponent } from './purchase-order.component';
import { CartOrderComponent } from './cart-order/cart-order.component';
import { ListPurchaseOrderComponent } from './list-purchase-order/list-purchase-order.component';


@NgModule({
  declarations: [
    AddOrderComponent,
    PurchaseOrderComponent,
    CartOrderComponent,
    ListPurchaseOrderComponent
  ],
  imports: [
    CommonModule,
    PurchaseOrderRoutingModule,
    ReactiveFormsModule
  ]
})
export class PurchaseOrderModule { }
