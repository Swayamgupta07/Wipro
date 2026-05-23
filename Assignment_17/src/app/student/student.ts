import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
@Component({
  selector: 'app-student',
  imports: [FormsModule],
  templateUrl: './student.html',
  styleUrl: './student.css',
})
export class Student {
  name = "Swayam";
  age = 24;
  imageUrl = "https://plus.unsplash.com/premium_vector-1721637089626-4a94b07ec3d6?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  message = "";

  showMessage() {
    this.message = "Button Clicked!";
  }
}

