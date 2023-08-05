import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl : './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showRegistration: boolean = false;

  toggleRegistration() {
    this.showRegistration = !this.showRegistration;
  }
}
