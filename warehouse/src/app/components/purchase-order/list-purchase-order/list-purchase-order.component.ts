import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PurchaseOrder } from 'src/shared/models/PurchaseOrder';
import { PurchaseOrderService } from 'src/shared/purchase-order.service';

@Component({
  selector: 'app-list-purchase-order',
  templateUrl: './list-purchase-order.component.html',
  styleUrls: ['./list-purchase-order.component.scss']
})
export class ListPurchaseOrderComponent {

  purchaseOrderList: PurchaseOrder[] = [];
  private subscription!: Subscription;

 
  constructor(private purchaseOrderService:PurchaseOrderService, private router:Router) {}
 
  ngOnInit(): void {
     this.subscription = this.purchaseOrderService.getPurchaseOrderList().subscribe(
       (data: PurchaseOrder[]) => {
         this.purchaseOrderList = data;
         console.log(this.purchaseOrderList);
       });
 
     }
 
  ngOnDestroy(): void {
     if (this.subscription) {
       this.subscription.unsubscribe();
     }
  }



}
