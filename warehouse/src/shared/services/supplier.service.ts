// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Supplier } from '../models/Supplier';
// import { Observable } from 'rxjs';
// @Injectable({
//   providedIn: 'root'
// })
// export class SupplierService {
//   private apiUrl="https://localhost:7056/api/SupplierVendor";

//   constructor(private http:HttpClient) { }

//   getSupplierList(): Observable<Supplier[]> {
//     return this.http.get<Supplier[]>(this.apiUrl);
//   }

//   postSupplier(supplier: Supplier): Observable<Supplier> {
//     let token = localStorage.getItem('token');
//     console.log(token);
    
//     return this.http.post<Supplier>(this.apiUrl, supplier, 
//       { headers: { 'Authorization' : `Bearer ${token}` } }
//       );
//  }

//  deleteSupplier(supplierId: string): Observable<any> {
//   return this.http.delete(`${this.apiUrl}/${supplierId}`);
// }

// getSupplierById(supplierId: string): Observable<Supplier> {
//   return this.http.get<Supplier>(`${this.apiUrl}/${supplierId}`);
// }

// updateSupplier(supplier: Partial<Supplier>): Observable<Supplier> {
//   return this.http.put<Supplier>(`${this.apiUrl}/${supplier.supplierId}`, supplier);
// }


// }


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Supplier } from '../models/Supplier';
import { Observable } from 'rxjs';
import { Customer } from '../models/Customer';

@Injectable({
 providedIn: 'root'
})
export class SupplierService {
 private apiUrl = "https://localhost:7056/api/SupplierVendor";
 private ordersApiUrl = "https://localhost:7056/api/Order"; 
  

 constructor(private http: HttpClient) { }

 private getAuthToken(): string {
    return localStorage.getItem('token') || '';
 }

 getSupplierList(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.apiUrl);
 }

 enterProduct(orderData: Supplier): Observable<any> {
   // Retrieve the userId from local storage
   const userId = localStorage.getItem('userID');

   // Create a new object that includes the userId as customerId
   const orderToPlace: Supplier = {
       ...orderData,
       supplierId: userId // Set customerId to userId
   };

   const token = this.getAuthToken();
   return this.http.post<any>(this.apiUrl, orderToPlace, { headers: { 'Authorization' : `Bearer ${token}` } });
}


getCustomerList(): Observable<Customer[]> {
  return this.http.get<Customer[]>(this.ordersApiUrl);
}


 postSupplier(supplier: Supplier): Observable<Supplier> {
    let token = this.getAuthToken();
    console.log(token);
    
    return this.http.post<Supplier>(this.apiUrl, supplier, 
      { headers: { 'Authorization' : `Bearer ${token}` } }
    );
 }

 deleteSupplier(supplierId: string): Observable<any> {
    let token = this.getAuthToken();
    return this.http.delete(`${this.apiUrl}/${supplierId}`, { headers: { 'Authorization' : `Bearer ${token}` } });
 }

 getSupplierById(supplierId: string): Observable<Supplier> {
    let token = this.getAuthToken();
    return this.http.get<Supplier>(`${this.apiUrl}/${supplierId}`, { headers: { 'Authorization' : `Bearer ${token}` } });
 }

 updateSupplier(supplier: Partial<Supplier>): Observable<Supplier> {
    let token = this.getAuthToken();
    return this.http.put<Supplier>(`${this.apiUrl}/${supplier.supplierId}`, supplier, { headers: { 'Authorization' : `Bearer ${token}` } });
 }


 getSupplierByItemAndQuantity(itemName: string, quantity: number): Observable<Supplier> {
   let token = this.getAuthToken();
   return this.http.get<Supplier>(`${this.apiUrl}/byItem/${itemName}/${quantity}`, { headers: { 'Authorization' : `Bearer ${token}` } });
}


getSupplierHistory(supplierId: string): Observable<Supplier[]> {
   const token = this.getAuthToken();
   return this.http.get<Supplier[]>(`${this.apiUrl}/supplier/${supplierId}`, { headers: { 'Authorization' : `Bearer ${token}` } });
}

// This is a hypothetical method. You'll need to implement the actual logic based on your backend.
getMatchingOrders(itemName: string, quantity: number): Observable<Customer[]> {
   let token = this.getAuthToken();
   return this.http.get<Customer[]>(`${this.ordersApiUrl}/customers/matching/${itemName}/${quantity}`, { headers: { 'Authorization' : `Bearer ${token}` } });
}

  
}
