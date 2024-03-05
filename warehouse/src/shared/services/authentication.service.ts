// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { RegisterRequest } from '../models/RegisterRequest';
// import { RoleRequest } from '../models/Roles';
// import { LoginRequest } from '../models/LoginRequest';
// import { HttpClient } from '@angular/common/http';
// import { RegisterResponse } from '../models/RegisterResponse';
// import { LoginResponse } from '../models/LoginResponse';


// @Injectable({
//   providedIn: 'root'
// })
// export class AuthenticationService {

//   private apiUrl = 'https://localhost:7056/api/Authentication';

//   constructor(private http: HttpClient) { }
 
//   // Method for adding a role
//   addRole(role: RoleRequest): Observable<any> {
//      return this.http.post(`${this.apiUrl}/roles/add`, role);
//   }
 
//   // Method for user registration
//   register(userData: RegisterRequest): Observable<any> { // Adjust the return type as necessary
//      return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, userData);
//   }
 
//   // Method for user login
//   login(loginData: LoginRequest): Observable<LoginResponse> { // Use the updated interface
//      return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginData);
//   }
// }

import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { register } from '../models/Register';

@Injectable({
 providedIn: 'root'
})
export class AuthenticationService {

 private apiUrl = 'https://localhost:7056/api/Users';

 constructor(private http: HttpClient) { }
 registerUser(userData:register): Observable<any> {
  return this.http.post(`${this.apiUrl}`, userData);
}
 
}

