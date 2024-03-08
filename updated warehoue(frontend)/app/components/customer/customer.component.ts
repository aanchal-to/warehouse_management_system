import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  listingForm!:FormGroup;


  ngOnInit(): void {
      this.initializeForm;
  }

  initializeForm() {
    const userID = localStorage.getItem('userID'); // Retrieve user ID from local storage
   
    this.listingForm = new FormGroup({
      userID: new FormControl(userID), // Assign the retrieved user ID to the form control
      // Other form controls for the listing
    });
  }
}
