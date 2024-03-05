import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Customer } from 'src/shared/models/Customer';
import { CustomerService } from 'src/shared/services/customer.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  customerList: Customer[] = [];
 private subscription!: Subscription;
//  supplierForm!: FormGroup;
 

 constructor(
    private customerService: CustomerService,
    private router: Router,
    private fb: FormBuilder
 ) {
 
//   this.supplierForm = this.fb.group({
//     supplierId: [''],
//     name: [''],
//     contactPerson: [''],
//     item: [''],
//     quantity: [0],
//     status: [false]
//   });
 }

 ngOnInit(): void {
    this.subscription = this.customerService.getCustomerList().subscribe(
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
