// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Inventory } from '../models/Inventory';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class InventoryServicesService {
//   private apiUrl = 'https://localhost:7056/api/Inventory';
  
//   constructor(private http: HttpClient) { }

//   getInventoryList(): Observable<Inventory[]> {
//     return this.http.get<Inventory[]>(this.apiUrl);
//   }

//   postInventory(inventory: Inventory): Observable<Inventory> {
//     return this.http.post<Inventory>(this.apiUrl, inventory);
//  }

//  deleteInventory(inventoryId: string): Observable<any> {
//   return this.http.delete(`${this.apiUrl}/${inventoryId}`);
// }

// getInventoryById(inventoryId: string): Observable<Inventory> {
//   return this.http.get<Inventory>(`${this.apiUrl}/${inventoryId}`);
// }

// updateInventory(inventory: Partial<Inventory>): Observable<Inventory> {
//   return this.http.put<Inventory>(`${this.apiUrl}/${inventory.inventoryId}`, inventory);
// }
  
// }


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inventory } from '../models/Inventory';
import { Observable } from 'rxjs';

@Injectable({
 providedIn: 'root'
})
export class InventoryServicesService {
 private apiUrl = 'https://localhost:7056/api/Inventory';
  
 constructor(private http: HttpClient) { }

 private getAuthToken(): string {
    return localStorage.getItem('token') || '';
 }

 getInventoryList(): Observable<Inventory[]> {
    let token = this.getAuthToken();
    return this.http.get<Inventory[]>(this.apiUrl, { headers: { 'Authorization' : `Bearer ${token}` } });
 }

 postInventory(inventory: Inventory): Observable<Inventory> {
    let token = this.getAuthToken();
    return this.http.post<Inventory>(this.apiUrl, inventory, { headers: { 'Authorization' : `Bearer ${token}` } });
 }

 deleteInventory(inventoryId: string): Observable<any> {
    let token = this.getAuthToken();
    return this.http.delete(`${this.apiUrl}/${inventoryId}`, { headers: { 'Authorization' : `Bearer ${token}` } });
 }

 getInventoryById(inventoryId: string): Observable<Inventory> {
    let token = this.getAuthToken();
    return this.http.get<Inventory>(`${this.apiUrl}/${inventoryId}`, { headers: { 'Authorization' : `Bearer ${token}` } });
 }

 updateInventory(inventory: Partial<Inventory>): Observable<Inventory> {
    let token = this.getAuthToken();
    return this.http.put<Inventory>(`${this.apiUrl}/${inventory.inventoryId}`, inventory, { headers: { 'Authorization' : `Bearer ${token}` } });
 }

 searchInventoryByAisle(aisle: string): Observable<Inventory[]> {
   let token = this.getAuthToken();
   return this.http.get<Inventory[]>(`${this.apiUrl}/aisle/${aisle}`, { headers: { 'Authorization' : `Bearer ${token}` } });
}
searchInventoryByShelf(shelf: string): Observable<Inventory[]> {
   let token = this.getAuthToken();
   return this.http.get<Inventory[]>(`${this.apiUrl}/shelf/${shelf}`, { headers: { 'Authorization' : `Bearer ${token}` } });
}
searchInventoryByRack(rack: string): Observable<Inventory[]> {
   let token = this.getAuthToken();
   return this.http.get<Inventory[]>(`${this.apiUrl}/rack/${rack}`, { headers: { 'Authorization' : `Bearer ${token}` } });
}


}
