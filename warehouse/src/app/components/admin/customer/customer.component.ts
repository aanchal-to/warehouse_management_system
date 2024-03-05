import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Customer } from 'src/shared/models/Customer';
import { AdminService } from 'src/shared/services/admin.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {
  customerList: Customer[] = [];
 private subscription!: Subscription;

 

 constructor(private adminService:AdminService,) {}

 ngOnInit(): void {
    this.subscription = this.adminService.getCustomerList().subscribe(
      (data:Customer[]) => {
        this.customerList = data;
        console.log(this.customerList);
      }
    );
 }

 ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
 }

}
