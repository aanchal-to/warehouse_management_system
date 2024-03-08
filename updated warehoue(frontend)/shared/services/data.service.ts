import { Injectable } from '@angular/core';
import { Customer } from '../models/Customer';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private customerData: Customer[] = [];

 constructor() { }

 setCustomerData(data: Customer[]): void {
    this.customerData = data;
 }

 getCustomerData(): Customer[] {
    return this.customerData;
 }
}
