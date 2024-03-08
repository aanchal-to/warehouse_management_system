import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderDetailsRoutingModule } from './order-details-routing.module';
import { OrderDetailsComponent } from './order-details.component';
import { AddOrderDetailsComponent } from './add-order-details/add-order-details.component';
import { ListOrderDetailsComponent } from './list-order-details/list-order-details.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OrderDetailsComponent,
    AddOrderDetailsComponent,
    ListOrderDetailsComponent
  ],
  imports: [
    CommonModule,
    OrderDetailsRoutingModule,
    ReactiveFormsModule
  ]
})
export class OrderDetailsModule { }
