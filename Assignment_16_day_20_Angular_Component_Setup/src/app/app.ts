import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { Student } from './student/student';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Student],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Assignment_16');
}
