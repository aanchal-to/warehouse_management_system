import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/shared/models/Login';

import { AuthenticationService } from 'src/shared/services/authentication.service';
import { AuthguardService } from 'src/shared/services/authguard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;


  constructor(private http: HttpClient, private router: Router,private authService: AuthguardService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required)

    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData = {
        userID: '',
        userName: this.loginForm.value.userName, // Corrected from 'username' to 'userName'
        password: this.loginForm.value.password,
        role: this.loginForm.value.role
      };
      this.http.post<string>('https://localhost:7056/api/Login', loginData).subscribe(
        (response: any) => {
          console.log(response);

          if (response.token) {
            // Store the token securely (e.g., in local storage)
            localStorage.setItem('token', response.token);
            localStorage.setItem('userID', response.userID);
            localStorage.setItem('role', response.role);
            console.log(response.token);
            console.log(response.userID);
            console.log(response.role);

            this.authService.setAuthenticated(true);


            const userRole = localStorage.getItem('role');
            switch (userRole) {
              case 'Admin':
                this.router.navigate(['/admin']);
                break;

              case 'Customer':
                this.router.navigate(['/customer']);
                break;

              case 'Inventory':

                this.router.navigate(['/inventory']);
                break;
              case 'Supplier':

                this.router.navigate(['/supplier']);
                break;

              default:
                console.error('Unknown role:', userRole);
                break;
            }
          } else {
            console.error('Authentication failed:', response);
          }
        },
        (error) => {
          console.error('An error occurred:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}





