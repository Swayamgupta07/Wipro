import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  // 'private': Ensures that no outside component can directly modify or delete this list.
  // 'employees: Employee[]': Tells TypeScript that this array will strictly contain 'Employee' objects, nothing else.
  //Employee[] is taken from the model
  private employees: Employee[] = [
    { id: 101, name: 'Swayam', department: 'Engineering', salary: 75000, email: 'swayam@example.com' },
    { id: 102, name: 'Aniket', department: 'HR', salary: 60000, email: 'aniket@example.com' }
  ];

  // 'constructor': Runs automatically when the service starts.
  // Left empty '{}' because we don't need any special logic to run on startup.
  constructor() {}

  // Returns the entire list of employees
  getEmployees(): Employee[] {
    return this.employees;
  }

  // 'employee: Employee': Confirms that the incoming input strictly matches the Employee model structure.
  addEmployee(employee: Employee): void {
    this.employees.push(employee);
  }

  updateEmployee(updatedEmployee: Employee): void {
    const index = this.employees.findIndex(e => e.id === updatedEmployee.id);
    if (index !== -1) {
      this.employees[index] = updatedEmployee;
    }
  }

  deleteEmployee(id: number): void {
    this.employees = this.employees.filter(e => e.id !== id);
  }
}
