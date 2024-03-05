import { Component } from '@angular/core';
import { Inventory } from 'src/shared/models/Inventory';
import { InventoryServicesService } from 'src/shared/services/inventory-services.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  inventories: Inventory[] = [];
  constructor(private inventoryService:InventoryServicesService){}
  searchInventoryByRack(rack: string): void {
    this.inventoryService.searchInventoryByRack(rack).subscribe(inventories => {
      this.inventories = inventories; 
    });
 }

 searchInventoryByAisle(aisle: string): void {
  this.inventoryService.searchInventoryByAisle(aisle).subscribe(inventories => {
    this.inventories = inventories; 
    
  });
}

searchInventoryByShelf(shelf: string): void {
  this.inventoryService.searchInventoryByShelf(shelf).subscribe(inventories => {
    this.inventories = inventories; 
  });
}

}
