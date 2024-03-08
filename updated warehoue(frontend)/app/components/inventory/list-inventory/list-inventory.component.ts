import { Component, OnInit, OnDestroy } from '@angular/core';
import { Inventory } from 'src/shared/models/Inventory';
import { InventoryServicesService } from 'src/shared/services/inventory-services.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
 selector: 'app-list-inventory',
 templateUrl: './list-inventory.component.html',
 styleUrls: ['./list-inventory.component.scss']
})
export class ListInventoryComponent implements OnInit, OnDestroy {
 inventoryList: Inventory[] = [];
 private subscription!: Subscription;
 inventoryForm!: FormGroup;
 searchForm!: FormGroup;
 editingInventoryId: string | null = null;

 constructor(private inventoryService: InventoryServicesService, private router: Router, private fb: FormBuilder) {
    this.inventoryForm = this.fb.group({
      inventoryId: [''],
      item: [''],
      sku:[''],
      quantity: [0],
      locationDetails: this.fb.group({
        aisle: [''],
        shelf: [''],
        rack: ['']
      }),
      batch: [0]
    });

    this.searchForm = this.fb.group({
      itemName: [''],
      location: ['']
    });
 }

 ngOnInit(): void {
    this.subscription = this.inventoryService.getInventoryList().subscribe(
      (data: Inventory[]) => {
        this.inventoryList = data;
        console.log(this.inventoryList);
        //create a separate method
        //so we can refer it again n again
        //remove console.log too
      });
 }

 ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
 }

 deleteInventory(inventoryId: string): void {
    this.inventoryService.deleteInventory(inventoryId).subscribe(() => {
      this.ngOnInit();
    }, error => {
      console.error('Error deleting inventory item:', error);
    });
 }


 editInventory(inventoryId: string): void {
    this.editingInventoryId = inventoryId;
    console.log('Edit button clicked for inventoryId:', inventoryId);
    this.inventoryService.getInventoryById(inventoryId).subscribe(inventory => {
      this.setupForm(inventory);
    });
 }

 setupForm(inventory: Inventory): void {
    console.log('Setting up form with inventory data:', inventory);
    this.inventoryForm = this.fb.group({
      inventoryId: [inventory.inventoryId],
      item: [inventory.item],
      sku:[inventory.sku],
      quantity: [inventory.quantity],
      locationDetails: this.fb.group({
        aisle: [inventory.locationDetails.aisle],
        shelf: [inventory.locationDetails.shelf],
        rack: [inventory.locationDetails.rack]
      }),
      batch: [inventory.batch]
    });
 }

 onSubmit(): void {
    if (this.inventoryForm.valid) {
      const updatedInventory = this.inventoryForm.value;
      this.inventoryService.updateInventory(updatedInventory).subscribe(() => {
        this.ngOnInit();
      }, error => {
        console.error('Error updating inventory:', error);
      });
    }
 }

 cancelEdit(): void {
    this.editingInventoryId = null;
    // Optionally, reset the form
    this.inventoryForm.reset();
 }


}
