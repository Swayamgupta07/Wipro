import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../auth';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html'
})
export class Register {
  user = { name: '', email: '', password: '' };
  message = '';

  constructor(private authService: Auth, private router: Router) {}

  onSubmit() {
    this.authService.register(this.user).subscribe({
      next: (res) => {
        this.message = 'Registration successful! You can now login.';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.message = err.error.message || 'Registration failed.';
      }
    });
  }
}
