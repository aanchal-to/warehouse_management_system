import { Component, OnInit } from '@angular/core';
import { Supplier } from 'src/shared/models/Supplier';
import { SupplierService } from 'src/shared/services/supplier.service';
import { Customer } from 'src/shared/models/Customer'; 
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-one-supplier-list',
  templateUrl: './one-supplier-list.component.html',
  styleUrls: ['./one-supplier-list.component.scss']
})
export class OneSupplierListComponent implements OnInit {
 supplier:Supplier[];
 customerData: Customer[];
 private subscription!: Subscription;
 supplierForm!: FormGroup;
 editingSupplierId: string | null = null;

 constructor(private supplierService:SupplierService,private router: Router,private fb: FormBuilder) {
  this.supplierForm = this.fb.group({
    supplierId: [''],
    name: [''],
    contactPerson: [''],
    item: [''],
    quantity: [0],
    status: [false]
  });
  }

 ngOnInit(): void {
  
  const supplierId = localStorage.getItem('userID');
  this.supplierService.getSupplierHistory(supplierId).subscribe(
    response => {
      this.supplier =response;
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
  this.supplierService.getCustomerList().subscribe(
     response => {
       this.customerData = response;
       console.log('Raw customer data:', this.customerData);
 
       // Filter customer data based on whether any supplier's item matches the customer's orderItems
       const filteredCustomerData = this.customerData.filter(customer => 
         this.supplier.some(supplier => customer.orderItems === supplier.item)
       );
 
       this.customerData = filteredCustomerData; // Update the customerData with filtered data
       console.log('Filtered customer data:', this.customerData);
     },
     error => {
       console.error('Failed to fetch customer data:', error);
     }
  );
 }

 deleteSupplier(supplierId: string): void {
  this.supplierService.deleteSupplier(supplierId).subscribe(() => {
    this.ngOnInit();
  }, error => {
    console.error('Error deleting supplier item:', error);
  });
}

editSupplier(supplierId: string): void {
  this.editingSupplierId = supplierId;
  console.log('Edit button clicked for supplierId:', supplierId);
    this.supplierService.getSupplierById(supplierId).subscribe(supplier => {
      this.setupForm(supplier);
    });
 }

setupForm(supplier: Supplier): void {
  console.log('Setting up form with supplier data:', supplier);
    this.supplierForm = this.fb.group({
      supplierId: [supplier.supplierId],
      name: [supplier.name],
      contactPerson: [supplier.contactPerson],
      item: [supplier.item],
      quantity: [supplier.quantity],
      status: [supplier.status]
    });
 }

 onSubmit(): void {
    if (this.supplierForm.valid) {
      const updatedSupplier = this.supplierForm.value;
      this.supplierService.updateSupplier(updatedSupplier).subscribe(() => {
        this.ngOnInit();
      }, error => {
        console.error('Error updating supplier:', error);
      });
    }
 }

 cancelEdit(): void {
  this.editingSupplierId = null;
  // Optionally, reset the form
  this.supplierForm.reset();
 }



}
