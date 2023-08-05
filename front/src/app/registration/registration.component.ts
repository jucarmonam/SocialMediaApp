import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import User from '../types/User';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  fullName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  passwordMismatch = false;

  constructor(private http: HttpClient) {}

  registerUser() {
    if(this.password != this.confirmPassword){
     this.passwordMismatch = true; 
     return;
    }
    
    const user: User = {name: this.fullName, email: this.email, password: this.password}

    this.http.post<User>('http://localhost:3000/auth/register', user as User).subscribe(
      (response) => {
        // Handle successful registration
        console.log(response);
      },
      (error) => {
        // Handle registration error
        console.error(error);
      }
    );
  }
}
