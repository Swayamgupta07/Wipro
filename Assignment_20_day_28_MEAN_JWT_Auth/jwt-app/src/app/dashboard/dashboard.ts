import { Component, OnInit } from '@angular/core';
import { Auth } from '../auth';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html'
})
export class Dashboard implements OnInit {
  profileData: any = null;
  error = '';

  constructor(private authService: Auth) {}

  ngOnInit() {
    this.authService.getProfile().subscribe({
      next: (res) => {
        this.profileData = res;
      },
      error: (err) => {
        this.error = 'Failed to load profile data. Please login again.';
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
