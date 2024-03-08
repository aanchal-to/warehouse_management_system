import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/shared/models/Customer';
import { OrderDetails } from 'src/shared/models/OrderDetails';
import { CustomerService } from 'src/shared/services/customer.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  orderDetails:OrderDetails[];
  customerData: Customer[];
 
  constructor(private customerService:CustomerService, private router:Router) { }

  ngOnInit(): void {
  
    const customerId = localStorage.getItem('userID');
    this.customerService.getOrderHistory(customerId).subscribe(
      response => {
        this.customerData =response;
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
  this.customerService.getOrderDetailsList().subscribe(
     response => {
       this.orderDetails = response;
       console.log('Raw customer data:', this.orderDetails);
 
       // Filter customer data based on whether any supplier's item matches the customer's orderItems
       const filteredOrdersDetails = this.orderDetails.filter(orderDetails => 
         this.customerData.some(customerData => orderDetails.customerId === customerData.customerId)
       );
 
       this.orderDetails = filteredOrdersDetails; // Update the customerData with filtered data
       console.log('Filtered customer data:', this.orderDetails);
     },
     error => {
       console.error('Failed to fetch customer data:', error);
     }
  );
 }



}