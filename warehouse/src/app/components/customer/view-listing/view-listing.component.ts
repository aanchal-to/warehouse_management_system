import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Supplier } from 'src/shared/models/Supplier';
import { CustomerService } from 'src/shared/services/customer.service';


@Component({
  selector: 'app-view-listing',
  templateUrl: './view-listing.component.html',
  styleUrls: ['./view-listing.component.scss']
})
export class ViewListingComponent implements OnInit {
  supplierList: Supplier[] = [];
  private subscription!: Subscription;
 
  constructor(private customerService: CustomerService){} 
 
  ngOnInit(): void {
     this.subscription = this. customerService.getSupplierList().subscribe(
       (data: Supplier[]) => {
         this.supplierList = data;
         console.log(this.supplierList);
       }
     );
  }
 
  ngOnDestroy(): void {
     if (this.subscription) {
       this.subscription.unsubscribe();
     }
  }
 
}
