import { Component, ElementRef, ViewChild } from '@angular/core';
import { Inventory } from 'src/shared/models/Inventory';
import { InventoryServicesService } from 'src/shared/services/inventory-services.service';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  @ViewChild('inventoryCanvas', { static: true }) inventoryCanvas: ElementRef;
 
 
  inventoryChart: any;
  supplierChart: any;
  orderChart: any;
 
   inventoryData: Inventory[] = [];
 
  
   constructor(private inventoryService: InventoryServicesService) {}
  
   ngOnInit() {
      this.inventoryService.getInventoryList().subscribe((data: Inventory[]) => {
        this.inventoryData = data;
        this.generateBarInventoryChart();
      });
 
      
   }
  
   generateBarInventoryChart() {
     const ctx = this.inventoryCanvas.nativeElement.getContext('2d');
  
     const labels = this.inventoryData.map(item => item.item);
     const quantity = this.inventoryData.map(item => item.quantity);
  
     this.inventoryChart = new Chart(ctx, {
       type: 'bar',
       data: {
         labels: labels,
         datasets: [{
           label: 'Quantity',
           data: quantity,
           backgroundColor: 'rgba(6, 5, 24, 0.8)', 
          borderColor: 'rgba(0, 0, 5, 1)', 
           borderWidth: 1
         }]
       },
       options: {
         scales: {
           y: {
             type:'linear',
             beginAtZero: true
           }
         }
       }
     });
  }
 
 
  

}
