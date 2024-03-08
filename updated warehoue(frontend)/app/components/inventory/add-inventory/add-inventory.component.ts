import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Inventory } from 'src/shared/models/Inventory';
import { InventoryServicesService } from 'src/shared/services/inventory-services.service';


@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.scss']
})
export class AddInventoryComponent {

  inventoryList: Inventory[] = [];

  inventoryForm!: FormGroup;

  constructor(private inventoryService: InventoryServicesService, private router: Router) { }


  ngOnInit(): void {
    this.inventoryService.getInventoryList().subscribe(
      (data: Inventory[]) => {
        this.inventoryList = data;

      });

    // Initialize the form with all required fields using FormControl and FormGroup
    this.inventoryForm = new FormGroup({
      inventoryId: new FormControl(''),
      item: new FormControl(''),
      sku: new FormControl(''),
      quantity: new FormControl(''),

      locationDetails: new FormGroup({
        aisle: new FormControl(''),
        shelf: new FormControl(''),
        rack: new FormControl('')
      }),
      batch: new FormControl('')

    });
  }


  onSubmit(event: FormGroup) {
    if (this.inventoryForm.valid) {
      const newInventory: Inventory = this.inventoryForm.value;
      this.inventoryService.postInventory(newInventory).subscribe(
        () => {
          console.log('Inventory added successfully');
          event.reset();
        },
        error => {
          console.error('Error submitting inventory:', error);
        }
      );
    }
  }

  routeToListInventory(): void {
    this.router.navigateByUrl('inventory/list');
  }


}
