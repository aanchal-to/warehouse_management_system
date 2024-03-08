import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/shared/models/Customer';
import { Supplier } from 'src/shared/models/Supplier';
import { CustomerService } from 'src/shared/services/customer.service';
import { SupplierService } from 'src/shared/services/supplier.service';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.scss']
})
export class AddListingComponent implements OnInit {
  orderForm: FormGroup;
  matchingSuppliers: Supplier[] = [];
  selectedSupplier: Supplier | null = null;
  showMsg:boolean=false;
 orderId: string | null = null;
  customerId: string | null = null;


  constructor(private http:HttpClient, private router:Router, private customerService:CustomerService,private supplierService:SupplierService,private cdr: ChangeDetectorRef ){}

  ngOnInit(): void {
    this.customerId = localStorage.getItem('userID');
    this.orderForm = new FormGroup({
      orderItems: new FormControl('', Validators.required),
      quantity: new FormControl('', [Validators.required, Validators.min(1)])
    });
  }

  onPlaceOrder(): void {
    if (this.orderForm.valid) {
      const orderData = this.orderForm.value;
      orderData.customerId = localStorage.getItem('userID');

      this.customerService.placeOrder(orderData).subscribe(
        response => {
          console.log('Order placed successfully:', response);

          this.showMsg=true;
          this.orderId = response.orderId;
       
          this.findSuppliers(orderData);
        },
        error => {
          console.error('Failed to place order:', error);
   
        }
      );
    } else {
      console.error('Form is invalid');
    }
 }

 findSuppliers(orderData: any): void {
  this.supplierService.getSupplierList().subscribe(
    (suppliers: Supplier[]) => {
      this.matchingSuppliers = suppliers.filter(supplier =>
        supplier.item === orderData.orderItems && supplier.quantity >= orderData.quantity
      );
      console.log('Matching suppliers:', this.matchingSuppliers);
    },
    error => {
      console.error('Failed to fetch suppliers:', error);
    }
  );
}




selectSupplier(supplier: Supplier): void {
  this.selectedSupplier = supplier;
  console.log('Selecting supplier:', supplier); 
  this.cdr.detectChanges();


  const orderDetails = {
    orderId: this.orderId,
    customerId: this.customerId,
    orderItems: this.orderForm.get('orderItems').value,
    quantity: this.orderForm.get('quantity').value
 };

 // Call the service method to send order details to the selected supplier
 this.supplierService.sendOrderToSupplier(orderDetails, supplier.supplierId).subscribe(
    response => {
      console.log('Order details sent successfully:', response);
      // Handle success, e.g., show a success message
    },
    error => {
      console.error('Failed to send order details:', error);
      // Handle error, e.g., show an error message
    }
 );

 this.cdr.detectChanges();

}
}


