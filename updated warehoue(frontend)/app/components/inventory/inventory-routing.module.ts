import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from './inventory.component';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';

import { ListInventoryComponent } from './list-inventory/list-inventory.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthsecGuard } from '../security/authsec.guard';


const routes: Routes = [
 {
    path: '',
    component: InventoryComponent,canActivate:[AuthsecGuard],
    children: [
      {
      path: 'add',
      component: AddInventoryComponent
      },

      {
        path:'list',
        component:ListInventoryComponent
      },
      {
        path:'',
        component:DashboardComponent
      },
      {
        path:'layout',
        component:LayoutComponent
    }
    ]
    
 }
];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class InventoryRoutingModule { }
