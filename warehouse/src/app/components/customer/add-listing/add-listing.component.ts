import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/shared/models/Customer';
import { CustomerService } from 'src/shared/services/customer.service';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.scss']
})
export class AddListingComponent implements OnInit {
  orderForm: FormGroup;
  constructor(private http:HttpClient, private router:Router, private customerService:CustomerService){}

  ngOnInit(): void {
    this.orderForm = new FormGroup({
      orderItems: new FormControl('', Validators.required),
      quantity: new FormControl('', [Validators.required, Validators.min(1)])
    });
  }

  onPlaceOrder(): void {
    if (this.orderForm.valid) {
      const orderData = this.orderForm.value;
      orderData.customerId = localStorage.getItem('userID');

      this.customerService.placeOrder(orderData).subscribe(
        response => {
          console.log('Order placed successfully:', response);
          this.ngOnInit();
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
