import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PurchaseOrder } from 'src/shared/models/PurchaseOrder';
import { PurchaseOrderService } from 'src/shared/purchase-order.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent {
  purchaseOrderList: PurchaseOrder[];

  purchaseOrderForm!: FormGroup;
 
  constructor(private purchaseOrderService:PurchaseOrderService, private router:Router){}
 
 
  ngOnInit(): void {
    this.purchaseOrderService.getPurchaseOrderList().subscribe(
     (data: PurchaseOrder[]) => {
       this.purchaseOrderList = data;
      
     });
 
   // Initialize the form with all required fields using FormControl and FormGroup
   this.purchaseOrderForm = new FormGroup({
     purchaseOrderId: new FormControl(''),
     item:new FormControl(''),
     quantity: new FormControl(''),
     orderDate: new FormControl(''),
   
   });
 }
 
 
//  onSubmit() {
//   if (this.purchaseOrderForm.valid) {
//      const newPurchaseOrder: PurchaseOrder = this.purchaseOrderForm.value;
//      this.purchaseOrderService.postPurchaseOrder(newPurchaseOrder).subscribe((createdOrder) => {
//        console.log('PurchaseOrder added successfully');
//        // Assuming the backend returns the created order with its ID
//        // Redirect to /cart with the ID of the newly created order
//        //this.router.navigate(['/cart']);
//       });
//   }
  
  onSubmit() {
    if (this.purchaseOrderForm.valid) {
       const newPurchaseOrder: PurchaseOrder = this.purchaseOrderForm.value;
       this.purchaseOrderService.postPurchaseOrder(newPurchaseOrder).subscribe((createdOrder: PurchaseOrder) => {
         console.log('PurchaseOrder added successfully');
         // Navigate to the order details page using template literals
         this.router.navigate([`/order-details/${createdOrder.purchaseOrderId}`]);
       });
    }
   }
   
//  cartorder(id:string):void{
//   this.router.navigateByUrl(['purchase-order/cart-order/',id]);
//  }


 
 
 
 
 
}
