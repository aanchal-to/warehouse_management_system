import { Component, ElementRef, ViewChild } from '@angular/core';
import { Supplier } from 'src/shared/models/Supplier';
import { SupplierService } from 'src/shared/services/supplier.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  @ViewChild('inventoryCanvas', { static: true }) inventoryCanvas: ElementRef;
 @ViewChild('supplierCanvas', { static: true }) supplierCanvas: ElementRef;
 @ViewChild('orderCanvas', { static: true }) orderCanvas: ElementRef;

 inventoryChart: any;
 supplierChart: any;
 orderChart: any;

 
  supplierData:Supplier[]=[];
  


 
  constructor(private supplierService:SupplierService) {}
 
  ngOnInit() {
 

     this.supplierService.getSupplierList().subscribe((data: Supplier[]) => {
      this.supplierData = data;
      this.generateBarSupplierChart();
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


}
