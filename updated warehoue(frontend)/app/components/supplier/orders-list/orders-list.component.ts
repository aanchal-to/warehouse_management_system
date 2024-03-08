import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Customer } from 'src/shared/models/Customer';
import { PurchaseOrder } from 'src/shared/models/PurchaseOrder';
import { Supplier } from 'src/shared/models/Supplier';
import { PurchaseOrderService } from 'src/shared/purchase-order.service';
import { SupplierService } from 'src/shared/services/supplier.service';
import { CustomerService } from 'src/shared/services/customer.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent  implements OnInit{
//   customers: Customer[] = []; // Assuming you have a list of customers
//  suppliers: Supplier[] = []; // Assuming you have a list of suppliers
//  matchedItems: any[] = [];
 //constructor(private supplierService: SupplierService) {}

//  ngOnInit(): void {
//     // Assuming you have methods to fetch customers and suppliers
//     this.supplierService.getCustomerList().subscribe(data => {
//       this.customers = data;
//       this.matchItems();
//     });

//     this.supplierService.getSupplierList().subscribe(data => {
//       this.suppliers = data;
//       this.matchItems();
//     });
//  }

//  matchItems(): void {
//   this.matchedItems = [];
//   this.customers.forEach(customer => {
//     this.suppliers.forEach(supplier => {
//       if (customer.orderItems === supplier.item && customer.quantity <= supplier.quantity) {
//         this.matchedItems.push({
//           customerOrderId: customer.orderId,
//           customerId: customer.customerId,
//           supplierId: supplier.supplierId,
//           item: customer.orderItems,
//           quantity: customer.quantity
//         });
//       }
//     });
//   });
// }
  purchaseOrderList: PurchaseOrder[] = [];
  private subscription!: Subscription;

 
  constructor(private purchaseOrderService:PurchaseOrderService, private router:Router) {}
 
  ngOnInit(): void {
     this.subscription = this.purchaseOrderService.getPurchaseOrderList().subscribe(
       (data: PurchaseOrder[]) => {
         this.purchaseOrderList = data;
         console.log(this.purchaseOrderList);
       });
 
     }
 
  ngOnDestroy(): void {
     if (this.subscription) {
       this.subscription.unsubscribe();
     }
  }



}
