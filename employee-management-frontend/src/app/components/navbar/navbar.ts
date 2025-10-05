import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router,RouterLink,RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token'); 
    this.router.navigate(['/login']);
  }
}
