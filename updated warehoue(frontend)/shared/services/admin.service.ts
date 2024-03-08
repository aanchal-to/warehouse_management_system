import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from '../models/Supplier';
import { Customer } from '../models/Customer';
import { OrderDetails } from '../models/OrderDetails';
import { Inventory } from '../models/Inventory';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = "https://localhost:7056/api/SupplierVendor";
  private orderApiUrl="https://localhost:7056/api/OrderDetails";
  private customerApiUrl="https://localhost:7056/api/Order";
  private inventoryApiUrl='https://localhost:7056/api/Inventory';

  constructor(private http: HttpClient) {}


  private getAuthToken(): string {
    return localStorage.getItem('token') || '';
 }
 getSupplierList(): Observable<Supplier[]> {
  return this.http.get<Supplier[]>(this.apiUrl);
}
getCustomerList(): Observable<Customer[]> {
   return this.http.get<Customer[]>(this.customerApiUrl);
}
getOrderDetailsList(): Observable<OrderDetails[]> {
  let token = this.getAuthToken();
  return this.http.get<OrderDetails[]>(this.orderApiUrl, { headers: { 'Authorization' : `Bearer ${token}` } });
}
getInventoryList(): Observable<Inventory[]> {
  let token = this.getAuthToken();
  return this.http.get<Inventory[]>(this.inventoryApiUrl, { headers: { 'Authorization' : `Bearer ${token}` } });
}


}
