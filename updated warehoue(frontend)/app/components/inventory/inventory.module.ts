import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';

import { ListInventoryComponent } from './list-inventory/list-inventory.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';




@NgModule({
  declarations: [
    InventoryComponent,
    AddInventoryComponent,

    ListInventoryComponent,
     DashboardComponent,
     LayoutComponent,

   
    
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    ReactiveFormsModule
  ]
})
export class InventoryModule { }
