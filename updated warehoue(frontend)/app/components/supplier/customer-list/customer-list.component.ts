import { Component, OnDestroy, OnInit } from '@angular/core';
import { Customer } from 'src/shared/models/Customer';
import { Supplier } from 'src/shared/models/Supplier';
import { SupplierService } from 'src/shared/services/supplier.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  supplier:Supplier[];
  customerData: Customer[];
 
  constructor(private supplierService:SupplierService, private router:Router) { }

  ngOnInit(): void {
  
    const supplierId = localStorage.getItem('userID');
    this.supplierService.getSupplierHistory(supplierId).subscribe(
      response => {
        this.supplier =response;
        // Handle success, e.g., display the order history
        this.fetchCustomerData(); 
      },
      error => {
        console.error('Failed to fetch order history:', error);
        // Handle error, e.g., show an error message
      }
    );
  }
  
fetchCustomerData(): void {
  this.supplierService.getCustomerList().subscribe(
     response => {
       this.customerData = response;
       console.log('Raw customer data:', this.customerData);
 
       // Filter customer data based on whether any supplier's item matches the customer's orderItems
       const filteredCustomerData = this.customerData.filter(customer => 
         this.supplier.some(supplier => customer.orderItems === supplier.item)
       );
 
       this.customerData = filteredCustomerData; // Update the customerData with filtered data
       console.log('Filtered customer data:', this.customerData);
     },
     error => {
       console.error('Failed to fetch customer data:', error);
     }
  );
 }
 details(orderId: string, customerId: string, orderItems: string, quantity: number): void {
  // Correctly navigate to the route with parameters
  this.router.navigate(['supplier/customer-list/add-order-details', orderId, customerId, orderItems, quantity]);
  console.log(`${orderId},${customerId},${orderItems},${quantity}`);
 }
 


}
