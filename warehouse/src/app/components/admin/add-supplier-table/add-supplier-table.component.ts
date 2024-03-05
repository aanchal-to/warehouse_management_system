import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Supplier } from 'src/shared/models/Supplier';
import { SupplierService } from 'src/shared/services/supplier.service';

@Component({
  selector: 'app-add-supplier-table',
  templateUrl: './add-supplier-table.component.html',
  styleUrls: ['./add-supplier-table.component.scss']
})
export class AddSupplierTableComponent  {

  supplierList: Supplier[] = [];

  supplierForm!: FormGroup;
 
  constructor(private supplierService:SupplierService){}
 
 
  ngOnInit(): void {
    this.supplierService.getSupplierList().subscribe(
     (data: Supplier[]) => {
       this.supplierList = data;
      
     });
 
   // Initialize the form with all required fields using FormControl and FormGroup
   this.supplierForm = new FormGroup({
     supplierId: new FormControl(''),
     name:new FormControl(''),
     contactPerson:new FormControl(''),
     item:new FormControl(''),
     quantity: new FormControl(''),
     status:new FormControl(false)
 
   });
 }
 
 
 onSubmit() {
   if (this.supplierForm.valid) {
     const newSuppliery: Supplier = this.supplierForm.value;
     this.supplierService.postSupplier(newSuppliery).subscribe(() => {
       
       console.log('Suppliery added successfully');
 
       this.ngOnInit();
     });
   }
 }
 
  
}
