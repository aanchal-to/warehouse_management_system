import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { ViewListingComponent } from './view-listing/view-listing.component';
import { AddListingComponent } from './add-listing/add-listing.component';
import { HistoryComponent } from './history/history.component';
import { ListComponent } from './list/list.component';
import { DashboardComponent } from '../customer/dashboard/dashboard.component'
import { AuthsecGuard } from '../security/authsec.guard';
import {OrderDetailsComponent} from '../customer/order-details/order-details.component'

const routes: Routes = [{
  path: '', component: CustomerComponent, canActivate: [AuthsecGuard],
  children: [
    { path: 'menu', component: ViewListingComponent },
    { path: 'add', component: AddListingComponent },
    { path: 'history', component: HistoryComponent },
    { path: 'list', component: ListComponent },
    { path: '', component: DashboardComponent },
    {path:'orderDetails',component:OrderDetailsComponent}
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
