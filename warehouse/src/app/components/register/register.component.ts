import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { register } from 'src/shared/models/Register';
import { AuthenticationService } from 'src/shared/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  signupForm: FormGroup;
 
 constructor(private authService: AuthenticationService,private router:Router) { }
 
 
 
 ngOnInit() {
  this.signupForm = new FormGroup({
    userName: new FormControl(''),
    email: new FormControl(''),
    passwordHash: new FormControl(''),
    roles:new FormControl('')
  });
}
 
signup() {
  if (this.signupForm.valid) {
    const user = this.signupForm.value;
    this.authService.registerUser(user).subscribe(
      data => {
        console.log('Success', data);
        // Handle success, e.g., redirect to the login page
        this.router.navigateByUrl('/login');
      },
      error => {
        console.log('Error', error);
        // Handle error
      }
    );
  }
}
 
}