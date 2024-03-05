import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailsComponent } from './order-details.component';
import { ListOrderDetailsComponent } from './list-order-details/list-order-details.component';
import { AddOrderDetailsComponent } from './add-order-details/add-order-details.component';

const routes: Routes = [{ path: '', component: OrderDetailsComponent ,
children:[
 { path:'list', component:ListOrderDetailsComponent},
 {path:'add',component:AddOrderDetailsComponent}
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderDetailsRoutingModule { }
