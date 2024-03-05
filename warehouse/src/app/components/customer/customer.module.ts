import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { ViewListingComponent } from './view-listing/view-listing.component';
import { AddListingComponent } from './add-listing/add-listing.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HistoryComponent } from './history/history.component';
import { ListComponent } from './list/list.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    CustomerComponent,
    ViewListingComponent,
    AddListingComponent,
    HistoryComponent,
    ListComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule
  ]
})
export class CustomerModule { }
