import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupplierService } from 'src/shared/services/supplier.service';

@Component({
  selector: 'app-one-supplier',
  templateUrl: './one-supplier.component.html',
  styleUrls: ['./one-supplier.component.scss']
})
export class OneSupplierComponent implements OnInit {
  orderForm: FormGroup;
  constructor(private http:HttpClient, private router:Router, private supplerService:SupplierService){}

  ngOnInit(): void {
    this.orderForm = new FormGroup({
      name:new FormControl(''),
      contactPerson:new FormControl(''),
      item:new FormControl(''),
      quantity: new FormControl('', [Validators.required, Validators.min(1)]),
      status:new FormControl(false)
    });
  }

  onEnteringProduct(): void {
    if (this.orderForm.valid) {
      const orderData = this.orderForm.value;
      orderData.supplierId = localStorage.getItem('userID');

      this.supplerService.enterProduct(orderData).subscribe(
        response => {
          console.log('Product entered successfully:', response);
          // Handle success, e.g., show a success message
        },
        error => {
          console.error('Failed to place order:', error);
          // Handle error, e.g., show an error message
        }
      );
    } else {
      console.error('Form is invalid');
    }
 }
}