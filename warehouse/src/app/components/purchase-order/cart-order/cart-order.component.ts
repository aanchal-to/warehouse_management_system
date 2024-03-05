import { Component,OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PurchaseOrderService } from 'src/shared/purchase-order.service';
import { PurchaseOrder } from 'src/shared/models/PurchaseOrder';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cart-order',
  templateUrl: './cart-order.component.html',
  styleUrls: ['./cart-order.component.scss']
})
export class CartOrderComponent implements OnInit {
  @Input() orderId!: string;
  orderDetails!: PurchaseOrder;
  updateForm!: FormGroup;
 
  constructor(
     private route: ActivatedRoute,
     private purchaseOrderService: PurchaseOrderService,
     private formBuilder: FormBuilder
  ) {}
 
  ngOnInit(): void {
     this.route.params.subscribe(params => {
       this.orderId = params['id'];
       this.getOrderDetails();
     });
 
     // Initialize the update form
     this.updateForm = this.formBuilder.group({
       item: [''],
       quantity: [''],
       orderDate: ['']
     });
  }
 
  getOrderDetails(): void {
     this.purchaseOrderService.getPurchaseOrderById(this.orderId).subscribe(
       (data: PurchaseOrder) => {
         this.orderDetails = data;
         // Update the form with the current order details
         this.updateForm.setValue({
           item: this.orderDetails.item,
           quantity: this.orderDetails.quantity,
           orderDate: this.orderDetails.orderDate
         });
       }
     );
  }
 
  onUpdateSubmit(): void {
     if (this.updateForm.valid) {
       const updatedOrder: Partial<PurchaseOrder> = this.updateForm.value;
       this.purchaseOrderService.updatePurchaseOrder({
         ...updatedOrder,
         purchaseOrderId: this.orderDetails.purchaseOrderId
       }).subscribe(() => {
         console.log('Order updated successfully');
         // Optionally, refresh the order details
         this.getOrderDetails();
       });
     }
  }
 
  deleteOrder(): void {
     this.purchaseOrderService.deletePurchaseOrder(this.orderDetails.purchaseOrderId).subscribe(() => {
       console.log('Order deleted successfully');
       // Optionally, navigate back to the list of orders or show a confirmation message
     });
  }
 }