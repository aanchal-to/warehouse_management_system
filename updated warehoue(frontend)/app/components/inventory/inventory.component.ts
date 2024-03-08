
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Inventory } from 'src/shared/models/Inventory';
import { InventoryServicesService } from 'src/shared/services/inventory-services.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
 selector: 'app-inventory',
 templateUrl: './inventory.component.html',
 styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit, OnDestroy {
    inventoryList: Inventory[] = [];
 filteredInventoryList: Inventory[] = [];
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
        aisle: [''],
        shelf: [''],
        rack: ['']
     });


    }
   
    ngOnInit(): void {
        this.subscription = this.inventoryService.getInventoryList().subscribe(
          (data: Inventory[]) => {
            this.inventoryList = data;
            this.filteredInventoryList = data; // Initialize filtered list with all items
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
   
    routeToAddInventory(): void {
       this.router.navigateByUrl('inventory/add');
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

    onSearch(): void {
        const itemName = this.searchForm.get('itemName')?.value;
        const aisle = this.searchForm.get('aisle')?.value;
        const shelf = this.searchForm.get('shelf')?.value;
        const rack = this.searchForm.get('rack')?.value;
       
        this.filteredInventoryList = this.inventoryList.filter(inventory => {
           const itemMatches = !itemName || inventory.item.toLowerCase().includes(itemName.toLowerCase());
           const aisleMatches = !aisle || inventory.locationDetails.aisle.toLowerCase().includes(aisle.toLowerCase());
           const shelfMatches = !shelf || inventory.locationDetails.shelf.toLowerCase().includes(shelf.toLowerCase());
           const rackMatches = !rack || inventory.locationDetails.rack.toLowerCase().includes(rack.toLowerCase());
       
           return itemMatches || aisleMatches || shelfMatches || rackMatches;
        });
       }
       
    }


   