import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OrderDetailsService } from 'src/shared/services/order-details.service';
import { OrderDetails } from 'src/shared/models/OrderDetails';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-order-details',
  templateUrl: './add-order-details.component.html',
  styleUrls: ['./add-order-details.component.scss']
})
export class AddOrderDetailsComponent {
  orderDetailsList: OrderDetails[] = [];
 orderDetailsForm!: FormGroup;

 constructor(private orderDetailsService: OrderDetailsService, private router:Router) {}

 ngOnInit(): void {
    this.orderDetailsService.getOrderDetailsList().subscribe(
      (data: OrderDetails[]) => {
        this.orderDetailsList = data;
      }
    );

    this.orderDetailsForm = new FormGroup({
      orderId: new FormControl(''),
      customerId: new FormControl(''),
      supplierId: new FormControl(''),
      inventoryId: new FormControl(''),
      item: new FormControl(''),
      quantity: new FormControl(''),
      status: new FormControl('')
    });
 }

 onSubmit() {
    if (this.orderDetailsForm.valid) {
      const newOrderDetails: OrderDetails = this.orderDetailsForm.value;
      this.orderDetailsService.postOrderDetails(newOrderDetails).subscribe(() => {
        console.log('Order details added successfully');
        this.ngOnInit();
        this.router.navigateByUrl('orderDetails/list')
      });

    }
 }

 backToList():void{
  this.router.navigateByUrl('orderDetails/list'); }

}
