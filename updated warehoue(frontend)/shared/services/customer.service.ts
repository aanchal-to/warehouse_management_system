import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from '../models/Supplier';
import { Customer } from '../models/Customer';
import { OrderDetails } from '../models/OrderDetails';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  private apiUrl = "https://localhost:7056/api/SupplierVendor";
  private ordersApiUrl = "https://localhost:7056/api/Order"; 
  private apiUrlOrderDetails = 'https://localhost:7056/api/OrderDetails';
  
  
  private getAuthToken(): string {
    return localStorage.getItem('token') || '';
 }

 getSupplierList(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.apiUrl);
 }



 getCustomerList(): Observable<Customer[]> {
   return this.http.get<Customer[]>(this.ordersApiUrl);
}

 getSupplierById(supplierId: string): Observable<Supplier> {
    let token = this.getAuthToken();
    return this.http.get<Supplier>(`${this.apiUrl}/${supplierId}`, { headers: { 'Authorization' : `Bearer ${token}` } });
 }

 placeOrder(orderData: Customer): Observable<any> {
   // Retrieve the userId from local storage
   const userId = localStorage.getItem('userID');

   // Create a new object that includes the userId as customerId
   const orderToPlace: Customer = {
       ...orderData,
       customerId: userId // Set customerId to userId
   };

   const token = this.getAuthToken();
   return this.http.post<any>(this.ordersApiUrl, orderToPlace, { headers: { 'Authorization' : `Bearer ${token}` } });
}


getOrderHistory(customerId: string): Observable<Customer[]> {
   const token = this.getAuthToken();
   return this.http.get<Customer[]>(`${this.ordersApiUrl}/customer/${customerId}`, { headers: { 'Authorization' : `Bearer ${token}` } });
}
  
deleteOrder(orderId: string): Observable<any> {
   let token = this.getAuthToken();
   return this.http.delete(`${this.ordersApiUrl}/${orderId}`, { headers: { 'Authorization' : `Bearer ${token}` } });
}

updateOrder(customer: Partial<Customer>): Observable<Customer> {
   let token = this.getAuthToken();
   return this.http.put<Customer>(`${this.ordersApiUrl}/${customer.orderId}`, customer, { headers: { 'Authorization' : `Bearer ${token}` } });
}


getOrderDetailsList(): Observable<OrderDetails[]> {
   let token = this.getAuthToken();
   return this.http.get<OrderDetails[]>(this.apiUrlOrderDetails, { headers: { 'Authorization' : `Bearer ${token}` } });
}
  

}
