import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.css'],
})
export class SinginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  signIn() {
    const user = {
      email: this.email,
      password: this.password,
    };

    this.http.post('http://localhost:3000/auth/login', user).subscribe(
      (response) => {
        // Handle successful sign-in
        console.log(response);
        this.router.navigate(['/posts']);
      },
      (error) => {
        // Handle sign-in error
        console.error(error);
      }
    );
  }
}
