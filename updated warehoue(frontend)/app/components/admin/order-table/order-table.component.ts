import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderDetails } from 'src/shared/models/OrderDetails';
import { AdminService } from 'src/shared/services/admin.service';
import { OrderDetailsService } from 'src/shared/services/order-details.service';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss']
})
export class OrderTableComponent implements OnInit, OnDestroy {
  orderDetailsList: OrderDetails[] = [];
  private subscription!: Subscription;
  orderDetailsForm!: FormGroup;
  editingOrderId: string | null = null;
 
 
  constructor(private orderService: OrderDetailsService, private router: Router,private fb: FormBuilder) 
  {
  
   this.orderDetailsForm = this.fb.group({
     orderId:[''],
     customerId:[''],
     supplierId: [''],
     inventoryId:[''],
     item: [''],
     quantity: [''],
     status: ['']
   });
 }
 
  ngOnInit(): void {
     this.subscription = this.orderService.getOrderDetailsList().subscribe(
       (data: OrderDetails[]) => {
         this.orderDetailsList = data;
         console.log(this.orderDetailsList);
         
       });
  }
 
  ngOnDestroy(): void {
     if (this.subscription) {
       this.subscription.unsubscribe();
     }
  }
 
  deleteOrderDetails(orderId: string): void {
     this.orderService.deleteOrderDetails(orderId).subscribe(() => {
       this.ngOnInit();
     }, error => {
       console.error('Error deleting order details:', error);
     });
  }
 
  routeToAddOrderDetails(): void {
     this.router.navigateByUrl('/admin/order/add');
  }
 
 
  editOrderDetails(orderId: string): void {
   this.editingOrderId = orderId;
   console.log('Edit button clicked for OrderId:',orderId);
     this.orderService.getOrderDetailsById(orderId).subscribe(orderDetails => {
       this.setupForm(orderDetails);
     });
  }
 
  setupForm(order: OrderDetails): void {
   console.log('Setting up form with Order data:', order);
     this.orderDetailsForm = this.fb.group({
       orderId: [order.orderId],
       customerId:[order.customerId],
       supplierId:[order.supplierId],
       inventoryId:[order.inventoryId],
       item: [order.item],
       quantity: [order.quantity],
       status: [order.status]
     });
  }
 
  onSubmit(): void {
     if (this.orderDetailsForm.valid) {
       const updatedOrderDetails = this.orderDetailsForm.value;
       this.orderService.updateOrderDetails(updatedOrderDetails).subscribe(() => {
         this.ngOnInit();
       }, error => {
         console.error('Error updating order Details:', error);
       });
     }
  }
 
  cancelEdit(): void {
   this.editingOrderId = null;
   // Optionally, reset the form
   this.orderDetailsForm.reset();
  }
 
}