import { Component } from '@angular/core';
import { Customer } from 'src/shared/models/Customer';
import { Supplier } from 'src/shared/models/Supplier';
import { SupplierService } from 'src/shared/services/supplier.service';

@Component({
  selector: 'app-one-supplier-orders-list',
  templateUrl: './one-supplier-orders-list.component.html',
  styleUrls: ['./one-supplier-orders-list.component.scss']
})
export class OneSupplierOrdersListComponent {

  supplier: Supplier;
 matchingOrders: Customer[];

 constructor(private supplierService: SupplierService) { }

 ngOnInit(): void {
  // const supplierId = localStorage.getItem('userID');
  // this.supplierService.getSupplierById(supplierId).subscribe(
  //    response => {
  //      this.supplier = response;
  //      // Fetch all orders
  //      this.supplierService.getCustomerList().subscribe(
  //        orders => {
  //          // Filter orders based on the supplier's item and quantity
  //          this.matchingOrders = orders.filter(order => 
  //            order.orderItems === this.supplier.item && order.quantity <= this.supplier.quantity
  //          );
  //        },
  //        error => {
  //          console.error('Failed to fetch orders:', error);
  //        }
  //      );
  //    },
  //    error => {
  //      console.error('Failed to fetch supplier details:', error);
  //    }
  // );
 }
 

//  getMatchingOrders(itemName: string, quantity: number): void {
//     this.supplierService.getMatchingOrders(itemName, quantity).subscribe(
//       response => {
//         this.matchingOrders = response;
//         // Handle success, e.g., display the matching orders
//       },
//       error => {
//         console.error('Failed to fetch matching orders:', error);
//       }
//     );
//  }

}
