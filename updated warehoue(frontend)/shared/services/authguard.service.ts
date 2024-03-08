// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthguardService {
//   isAuthenticated = false;
//   role: string;

//   constructor() {
//     this.role = localStorage.getItem('role');
//   }

//   // registerUser() {
//   //   this.isAuthenticated = true;
//   // }

//   login() {
//     this.isAuthenticated = true;
//   }

//   setAuthenticated(isAuthenticated: boolean): void {
//     this.isAuthenticated = isAuthenticated;
//   }
// }
import { Injectable } from '@angular/core';

@Injectable({
 providedIn: 'root',
})
export class AuthguardService {
 isAuthenticated: boolean;
 role: string;

 constructor() {
 
    this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    this.role = localStorage.getItem('role');
 }

login() {
    this.isAuthenticated = true;
    
    localStorage.setItem('isAuthenticated', 'true');
 }



 setAuthenticated(isAuthenticated: boolean): void {
    this.isAuthenticated = isAuthenticated;

    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
 }
}
