import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Inventory } from 'src/shared/models/Inventory';
import { InventoryServicesService } from 'src/shared/services/inventory-services.service';

@Component({
  selector: 'app-add-inventory-table',
  templateUrl: './add-inventory-table.component.html',
  styleUrls: ['./add-inventory-table.component.scss']
})
export class AddInventoryTableComponent {

  inventoryList: Inventory[] = [];

 inventoryForm!: FormGroup;

 constructor(private inventoryService:InventoryServicesService, private router:Router){}


 ngOnInit(): void {
   this.inventoryService.getInventoryList().subscribe(
    (data: Inventory[]) => {
      this.inventoryList = data;
     
    });

  // Initialize the form with all required fields using FormControl and FormGroup
  this.inventoryForm = new FormGroup({
    inventoryId: new FormControl(''),
    item:new FormControl(''),
    sku: new FormControl(''),
    quantity: new FormControl(''),
    
    locationDetails: new FormGroup({
      aisle: new FormControl(''),
      shelf: new FormControl(''),
      rack: new FormControl('')
    }),
    batch:new FormControl('')

  });
}


onSubmit() {
  if (this.inventoryForm.valid) {
    const newInventory: Inventory = this.inventoryForm.value;
    this.inventoryService.postInventory(newInventory).subscribe(() => {
      console.log('Inventory added successfully');
      // Optionally, refresh the list of inventories
      this.router.navigateByUrl('/admin/inventory-table')

      this.ngOnInit();
    });
  }
}

}
