// import { Injectable } from '@angular/core';
// import { PurchaseOrder } from './models/PurchaseOrder';
// import { Observable } from 'rxjs';
// import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
// export class PurchaseOrderService {

//  private apiUrl="https://localhost:7056/api/PurchaseOrder";

//   constructor(private http:HttpClient) { }

//   getPurchaseOrderList(): Observable<PurchaseOrder[]> {
//     return this.http.get<PurchaseOrder[]>(this.apiUrl);
//   }

//   postPurchaseOrder(purchaseOrder: PurchaseOrder): Observable<PurchaseOrder> {
//     return this.http.post<PurchaseOrder>(this.apiUrl, purchaseOrder);
//  }

//  deletePurchaseOrder(purchaseOrderId: string): Observable<any> {
//   return this.http.delete(`${this.apiUrl}/${purchaseOrderId}`);
// }

// getPurchaseOrderById(purchaseOrderId: string): Observable<PurchaseOrder> {
//   return this.http.get<PurchaseOrder>(`${this.apiUrl}/${purchaseOrderId}`);
// }

// updatePurchaseOrder(purchaseOrder: Partial<PurchaseOrder>): Observable<PurchaseOrder> {
//   return this.http.put<PurchaseOrder>(`${this.apiUrl}/${purchaseOrder.purchaseOrderId}`, purchaseOrder);
// }
// }


import { Injectable } from '@angular/core';
import { PurchaseOrder } from './models/PurchaseOrder';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
 providedIn: 'root'
})
export class PurchaseOrderService {

 private apiUrl = "https://localhost:7056/api/PurchaseOrder";

 constructor(private http: HttpClient) { }

 private getAuthToken(): string {
    return localStorage.getItem('token') || '';
 }

 getPurchaseOrderList(): Observable<PurchaseOrder[]> {
    let token = this.getAuthToken();
    return this.http.get<PurchaseOrder[]>(this.apiUrl, { headers: { 'Authorization' : `Bearer ${token}` } });
 }

 postPurchaseOrder(purchaseOrder: PurchaseOrder): Observable<PurchaseOrder> {
    let token = this.getAuthToken();
    return this.http.post<PurchaseOrder>(this.apiUrl, purchaseOrder, { headers: { 'Authorization' : `Bearer ${token}` } });
 }

 deletePurchaseOrder(purchaseOrderId: string): Observable<any> {
    let token = this.getAuthToken();
    return this.http.delete(`${this.apiUrl}/${purchaseOrderId}`, { headers: { 'Authorization' : `Bearer ${token}` } });
 }

 getPurchaseOrderById(purchaseOrderId: string): Observable<PurchaseOrder> {
    let token = this.getAuthToken();
    return this.http.get<PurchaseOrder>(`${this.apiUrl}/${purchaseOrderId}`, { headers: { 'Authorization' : `Bearer ${token}` } });
 }

 updatePurchaseOrder(purchaseOrder: Partial<PurchaseOrder>): Observable<PurchaseOrder> {
    let token = this.getAuthToken();
    return this.http.put<PurchaseOrder>(`${this.apiUrl}/${purchaseOrder.purchaseOrderId}`, purchaseOrder, { headers: { 'Authorization' : `Bearer ${token}` } });
 }
}
