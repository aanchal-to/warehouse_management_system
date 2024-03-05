// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { OrderDetails } from '../models/OrderDetails';

// @Injectable({
//   providedIn: 'root'
// })
// export class OrderDetailsService {

//   private apiUrl = 'https://localhost:7056/api/OrderDetails';
  
//   constructor(private http: HttpClient) { }

//   getOrderDetailsList(): Observable<OrderDetails[]> {
//     return this.http.get<OrderDetails[]>(this.apiUrl);
//   }

//   postOrderDetails(orderDetails: OrderDetails): Observable<OrderDetails> {
//     return this.http.post<OrderDetails>(this.apiUrl, orderDetails);
//  }

//  deleteOrderDetails(orderId: string): Observable<any> {
//   return this.http.delete(`${this.apiUrl}/${orderId}`);
// }

// getOrderDetailsById(orderId: string): Observable<OrderDetails> {
//   return this.http.get<OrderDetails>(`${this.apiUrl}/${orderId}`);
// }

// //updateOrderDetails(orderId: string, updatedOrderDetails: OrderDetails): Observable<OrderDetails> {
//   //return this.http.put<OrderDetails>(`${this.apiUrl}/${orderId}`, updatedOrderDetails);
//  //}
 

//  updateOrderDetails(orderDetails: Partial<OrderDetails>): Observable<OrderDetails> {
//   return this.http.put<OrderDetails>(`${this.apiUrl}/${orderDetails.orderId}`, orderDetails);
// }



 
// }


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetails } from '../models/OrderDetails';

@Injectable({
 providedIn: 'root'
})
export class OrderDetailsService {

 private apiUrl = 'https://localhost:7056/api/OrderDetails';
  
 constructor(private http: HttpClient) { }

 private getAuthToken(): string {
    return localStorage.getItem('token') || '';
 }

 getOrderDetailsList(): Observable<OrderDetails[]> {
    let token = this.getAuthToken();
    return this.http.get<OrderDetails[]>(this.apiUrl, { headers: { 'Authorization' : `Bearer ${token}` } });
 }

 postOrderDetails(orderDetails: OrderDetails): Observable<OrderDetails> {
    let token = this.getAuthToken();
    return this.http.post<OrderDetails>(this.apiUrl, orderDetails, { headers: { 'Authorization' : `Bearer ${token}` } });
 }

 deleteOrderDetails(orderId: string): Observable<any> {
    let token = this.getAuthToken();
    return this.http.delete(`${this.apiUrl}/${orderId}`, { headers: { 'Authorization' : `Bearer ${token}` } });
 }

 getOrderDetailsById(orderId: string): Observable<OrderDetails> {
    let token = this.getAuthToken();
    return this.http.get<OrderDetails>(`${this.apiUrl}/${orderId}`, { headers: { 'Authorization' : `Bearer ${token}` } });
 }

 updateOrderDetails(orderDetails: Partial<OrderDetails>): Observable<OrderDetails> {
    let token = this.getAuthToken();
    return this.http.put<OrderDetails>(`${this.apiUrl}/${orderDetails.orderId}`, orderDetails, { headers: { 'Authorization' : `Bearer ${token}` } });
 }
}
