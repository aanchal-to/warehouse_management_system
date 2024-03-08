// import { Component } from '@angular/core';
// import { FormControl, FormGroup } from '@angular/forms';
// import { Router } from '@angular/router';
// import { OrderDetails } from 'src/shared/models/OrderDetails';
// import { OrderDetailsService } from 'src/shared/services/order-details.service';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-add-order-details',
//   templateUrl: './add-order-details.component.html',
//   styleUrls: ['./add-order-details.component.scss']
// })
// export class AddOrderDetailsComponent {

//   orderDetailsList: OrderDetails[] = [];
//   orderDetailsForm!: FormGroup;
//   orderId: string;
//   customerId: string;
//   supplierId: string;
//   item: string;
//   quantity: number;
 
//   constructor(private orderDetailsService: OrderDetailsService, private router:Router, private route:ActivatedRoute) {}
 
//   ngOnInit(): void {
//     this.orderId = this.route.snapshot.paramMap.get('orderId') || '';
//     this.customerId = this.route.snapshot.paramMap.get('customerId') || '';
//     this.supplierId = this.route.snapshot.paramMap.get('supplierId') || '';
//     this.item = this.route.snapshot.paramMap.get('item') || '';
//     this.quantity = +(this.route.snapshot.paramMap.get('quantity') || '0');


// console.log(this.customerId);

//      this.orderDetailsService.getOrderDetailsList().subscribe(
//        (data: OrderDetails[]) => {
//          this.orderDetailsList = data;
//        }
//      );
 
//      this.orderDetailsForm = new FormGroup({
//        orderId: new FormControl(''),
//        customerId: new FormControl(''),
//        supplierId: new FormControl(''),
//        inventoryId: new FormControl(''),
//        item: new FormControl(''),
//        quantity: new FormControl(''),
//        status: new FormControl('')
//      });
//   }
 
//   onSubmit() {
//      if (this.orderDetailsForm.valid) {
//        const newOrderDetails: OrderDetails = this.orderDetailsForm.value;
//        this.orderDetailsService.postOrderDetails(newOrderDetails).subscribe(() => {
//          console.log('Order details added successfully');
//          this.ngOnInit();
//          this.router.navigateByUrl('orderDetails/list')
//        });
 
//      }
//   }
 
//   backToList():void{
//    this.router.navigateByUrl('orderDetails/list'); }
 

// }

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderDetails } from 'src/shared/models/OrderDetails';
import { OrderDetailsService } from 'src/shared/services/order-details.service';
import { ActivatedRoute } from '@angular/router';

@Component({
 selector: 'app-add-order-details',
 templateUrl: './add-order-details.component.html',
 styleUrls: ['./add-order-details.component.scss']
})
export class AddOrderDetailsComponent implements OnInit {

 orderDetailsList: OrderDetails[] = [];
 orderDetailsForm!: FormGroup;
 orderId: string;
 customerId: string;
 supplierId: string;
 item: string;
 quantity: number;

 constructor(private orderDetailsService: OrderDetailsService, private router: Router, private route: ActivatedRoute) {}

 ngOnInit(): void {
    console.log('Before form initialization');
    this.orderDetailsForm = new FormGroup({
      orderId: new FormControl(''),
      customerId: new FormControl(''),
      supplierId: new FormControl(''),
      inventoryId: new FormControl(''),
      item: new FormControl(''),
      quantity: new FormControl(''),
      status: new FormControl('')
    });
    console.log('After form initialization');

    // Retrieve route parameters
    this.supplierId = localStorage.getItem('userID');
    this.orderId = this.route.snapshot.paramMap.get('orderId') || '';
    this.customerId = this.route.snapshot.paramMap.get('customerId') || '';
   // this.supplierId = this.route.snapshot.paramMap.get('supplierId') || '';
    this.item = this.route.snapshot.paramMap.get('orderItems') || '';
    this.quantity = +(this.route.snapshot.paramMap.get('quantity') || '0');

    console.log('Route parameters:', {
      orderId: this.orderId,
      customerId: this.customerId,
      supplierId: this.supplierId,
      item: this.item,
      quantity: this.quantity
    });

    console.log('Before patchValue');
    this.orderDetailsForm.patchValue({
      orderId: this.orderId,
      customerId: this.customerId,
      supplierId: this.supplierId,
      item: this.item,
      quantity: this.quantity
    });
    console.log('After patchValue');

    this.orderDetailsService.getOrderDetailsList().subscribe(
      (data: OrderDetails[]) => {
        this.orderDetailsList = data;
      }
    );
 }

 onSubmit() {
    if (this.orderDetailsForm.valid) {
      const newOrderDetails: OrderDetails = this.orderDetailsForm.value;
      this.orderDetailsService.postOrderDetails(newOrderDetails).subscribe(() => {
        console.log('Order details added successfully');
        this.ngOnInit();
        this.router.navigateByUrl('supplier/list-order-details')
      });
    }
 }

 backToList(): void {
    this.router.navigateByUrl('supplier/list-order-details');
 }
}
