import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InventoryServicesService } from 'src/shared/services/inventory-services.service';
import { Inventory } from 'src/shared/models/Inventory';
import { Chart } from 'chart.js';
import { Supplier } from 'src/shared/models/Supplier';
import { Customer } from 'src/shared/models/Customer';
import { SupplierService } from 'src/shared/services/supplier.service';
import { OrderDetails } from 'src/shared/models/OrderDetails';
import { OrderDetailsService } from 'src/shared/services/order-details.service';
 
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('inventoryCanvas', { static: true }) inventoryCanvas: ElementRef;
 @ViewChild('supplierCanvas', { static: true }) supplierCanvas: ElementRef;
 @ViewChild('orderCanvas', { static: true }) orderCanvas: ElementRef;

 inventoryChart: any;
 supplierChart: any;
 orderChart: any;

  inventoryData: Inventory[] = [];
  supplierData:Supplier[]=[];
  orderData:OrderDetails[]=[]
 
  constructor(private inventoryService: InventoryServicesService, private supplierService:SupplierService, private orderService:OrderDetailsService) {}
 
  ngOnInit() {
     this.inventoryService.getInventoryList().subscribe((data: Inventory[]) => {
       this.inventoryData = data;
       this.generateBarInventoryChart();
     });

     this.supplierService.getSupplierList().subscribe((data: Supplier[]) => {
      this.supplierData = data;
      this.generateBarSupplierChart();
    });

    this.orderService.getOrderDetailsList().subscribe((data: OrderDetails[])=> {
      this. orderData = data;
      this.generateBarOrderChart();
    });
  }
 
  generateBarInventoryChart() {
    const ctx = this.inventoryCanvas.nativeElement.getContext('2d');
 
    const labels = this.inventoryData.map(item => item.item);
    const quantity = this.inventoryData.map(item => item.quantity);
 
    this.inventoryChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Quantity',
          data: quantity,
         // backgroundColor: 'rgba(6, 5, 24, 0.8)', 
         borderColor:'rgb(192,192,192)',
          borderWidth: 1,
          //tension:0.1
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


 generateBarSupplierChart() {
  const ctx = this.supplierCanvas.nativeElement.getContext('2d');

  const labels = this.supplierData.map(item => item.item);
  const quantity = this.supplierData.map(item => item.quantity);

  this.supplierChart = new Chart(ctx, {
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

generateBarOrderChart() {
  const ctx = this.orderCanvas.nativeElement.getContext('2d');

  const labels = this.orderData.map(item => item.item);
  const quantity = this.orderData.map(item => item.quantity);

  this.orderChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Quantity',
        data: quantity,
        //backgroundColor: 'rgba(48, 48, 60, 0.8)', 
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
 