import { Component, OnInit, OnDestroy } from '@angular/core';
import { Supplier } from 'src/shared/models/Supplier';
import { SupplierService } from 'src/shared/services/supplier.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
 selector: 'app-list-supplier',
 templateUrl: './list-supplier.component.html',
 styleUrls: ['./list-supplier.component.scss']
})
export class ListSupplierComponent implements OnInit, OnDestroy {
 supplierList: Supplier[] = [];
 private subscription!: Subscription;
 supplierForm!: FormGroup;
 editingSupplierId: string | null = null;


 constructor(
    private supplierService: SupplierService,
    private router: Router,
    private fb: FormBuilder
 ) {
 
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
    this.subscription = this.supplierService.getSupplierList().subscribe(
      (data: Supplier[]) => {
        this.supplierList = data;
        console.log(this.supplierList);
      }
    );
 }

 ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
 }

 deleteSupplier(supplierId: string): void {
    this.supplierService.deleteSupplier(supplierId).subscribe(() => {
      this.ngOnInit();
    }, error => {
      console.error('Error deleting supplier item:', error);
    });
 }

 routeToAddSupplier(): void {
    this.router.navigateByUrl('supplier/add');
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

//  navigateToOrderList():void{
//   this.router.navigateByUrl('purchaseOrder/list');

// }

}
