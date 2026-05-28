import { Component } from '@angular/core';
import { EmployeeForm } from './employee-form/employee-form';
import { EmployeeList } from './employee-list/employee-list';
import { Employee } from './models/employee.model';

@Component({
  selector: 'app-root',
  imports: [EmployeeForm, EmployeeList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  selectedEmployee: Employee | null = null;

  editEmployee(emp: Employee) {
    this.selectedEmployee = emp;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  clearSelection() {
    this.selectedEmployee = null;
  }
}
