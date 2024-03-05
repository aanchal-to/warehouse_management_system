import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Customer } from 'src/shared/models/Customer';
import { CustomerService } from 'src/shared/services/customer.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {


 customer:Customer[];
 private subscription!: Subscription;
 orderForm!: FormGroup;
 editingOrderId: string | null = null;


 constructor(private customerService: CustomerService,private router: Router,private fb: FormBuilder) { 
  this.orderForm = this.fb.group({
    orderId: [''],
    orderItems: [''],
    quantity: [0],
  
  });
 }

 ngOnInit(): void {
    const customerId = localStorage.getItem('userID');
    this.customerService.getOrderHistory(customerId).subscribe(
      response => {
        this.customer = response;
        // Handle success, e.g., display the order history
      },
      error => {
        console.error('Failed to fetch order history:', error);
        // Handle error, e.g., show an error message
      }
    );
 }

 deleteOrderHistory(orderId:string): void {
 
  this.customerService.deleteOrder(orderId).subscribe(
    response => {
      console.log('Order history deleted successfully:', response);
    
      this.ngOnInit(); 
    },
    error => {
      console.error('Failed to delete order history:', error);
   
    }
  );
}


// editCustomer(orderId: string): void {
//   this.editingOrderId = orderId;
//   console.log('Edit button clicked for orderId:', orderId);
//     this.customerService.getOrderHistory(orderId).subscribe(orderItems=> {
//       this.setupForm(orderItems);
//     });
//  }

editCustomer(orderId: string): void {
  this.editingOrderId = orderId;
  console.log('Edit button clicked for orderId:', orderId);
  // Assuming getOrderHistory returns an array of Customer objects
  // and you want to find the specific order by its orderId
  const orderToEdit = this.customer.find(order => order.orderId === orderId);
  if (orderToEdit) {
     this.setupForm(orderToEdit);
  } else {
     console.error('Order not found:', orderId);
     // Handle the case where the order is not found, e.g., show an error message
  }
 }
 

 setupForm(order:Customer): void {
  console.log('Setting up form with supplier data:', order);
    this.orderForm = this.fb.group({
      orderId: [order.orderId],
    
      item: [order.orderItems],
      quantity: [order.quantity],
 
    });
 }

 onSubmit(): void {
    if (this.orderForm.valid) {
      const updatedOrder = this.orderForm.value;
      this.customerService.updateOrder(updatedOrder).subscribe(() => {
        this.ngOnInit();
      }, error => {
        console.error('Error updating Order:', error);
      });
    }
 }

 cancelEdit(): void {
  this.editingOrderId = null;
  // Optionally, reset the form
  this.orderForm.reset();
 }




}
