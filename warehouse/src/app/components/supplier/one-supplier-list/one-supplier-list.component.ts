import { Component, OnInit } from '@angular/core';
import { Supplier } from 'src/shared/models/Supplier';
import { SupplierService } from 'src/shared/services/supplier.service';

@Component({
  selector: 'app-one-supplier-list',
  templateUrl: './one-supplier-list.component.html',
  styleUrls: ['./one-supplier-list.component.scss']
})
export class OneSupplierListComponent implements OnInit {
 supplier:Supplier[];
 constructor(private supplierService:SupplierService) { }

 ngOnInit(): void {
    const supplierId = localStorage.getItem('userID');
    this.supplierService.getSupplierHistory(supplierId).subscribe(
      response => {
        this.supplier =response;
        // Handle success, e.g., display the order history
      },
      error => {
        console.error('Failed to fetch order history:', error);
        // Handle error, e.g., show an error message
      }
    );
 }

}
