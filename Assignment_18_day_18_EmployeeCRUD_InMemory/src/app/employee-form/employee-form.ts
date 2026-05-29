import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../services/employee';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css'
})
export class EmployeeForm implements OnChanges {

  // @Input acts as a 'Door' to receive data from the parent component (app.ts).
  // It only accepts data that matches the 'Employee' interface structure, or 'null' when the form is cleared.
  @Input() employeeToEdit: Employee | null = null;

  // @Output acts as a 'Loudspeaker'. It sends a signal/event UP to the parent component (app.ts).
  // We emit 'formCleared' so the parent knows the user is done editing and should clear its selected employee.
  @Output() formCleared = new EventEmitter<void>();

  // This is our local variable that binds to the HTML form using Two-way Data Binding [(ngModel)].
  employee: Employee = {
    id: 0,
    name: '',
    department: '',
    salary: 0,
    email: ''
  };

  // A simple switch. If true, the HTML button will say "Update". If false, it will say "Add".
  isEditMode = false;

  // The constructor injects (brings in) the EmployeeService so we can use its database methods like addEmployee.
  constructor(private employeeService: EmployeeService) {}

  // ngOnChanges is an alarm that triggers automatically EVERY TIME the @Input() data changes from the outside.
  ngOnChanges() {
    // Check if the parent actually sent an employee to edit
    if (this.employeeToEdit) {

      // { ... } is the Spread Operator. It creates a "Photocopy" (Clone) of the incoming data.
      // We do this so that typing in the form doesn't instantly change the table data before clicking "Update".
      this.employee = { ...this.employeeToEdit };

      this.isEditMode = true; // Turn the switch ON for editing
    } else {
      this.resetForm(); // If null came in, clear the form for adding a new employee
    }
  }

  // This function runs when the user clicks the "Add Employee" or "Update Employee" button.
  saveEmployee() {
    if (this.isEditMode) {
      // If we are editing, send the updated data to the service to replace the old data.
      this.employeeService.updateEmployee(this.employee);
    } else {
      // If we are adding a completely NEW employee, they need a unique ID.
      // Since we don't have a real SQL database, we generate a random number between 200 and 1200.
      this.employee.id = Math.floor(Math.random() * 1000) + 200;

      // We send a Photocopy '{ ...this.employee }' to the service to save.
      // We do this because on the very next line, we clear the form.
      // If we sent the original, it would get cleared from the database too!
      this.employeeService.addEmployee({ ...this.employee });
    }

    this.resetForm(); // Empty the text boxes after saving
  }

  // Clears all form fields, turns off edit mode, and tells the Parent component to forget the selected employee.
  resetForm() {
    this.employee = { id: 0, name: '', department: '', salary: 0, email: '' };
    this.isEditMode = false;
    this.formCleared.emit(); // Shouting through the @Output loudspeaker
  }
}
