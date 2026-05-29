import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeSearchPipe } from '../../pipes/employee-search.pipe';
import { HighlightSalaryDirective } from '../../directives/highlight-salary.directive';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  // We import everything this component needs inside this list:
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule, 
    EmployeeSearchPipe, 
    HighlightSalaryDirective
  ],
  templateUrl: './employee-list.html'
})
export class EmployeeList implements OnInit {
  employees: Employee[] = [];
  searchQuery: string = '';
  isLoading: boolean = true;
  errorMessage: string = '';
  
  // Custom interactive features:
  viewMode: 'grid' | 'table' = 'grid'; // Lets the user toggle between Card Grid and Spreadsheet Table view!
  
  // Real-time statistics:
  totalEmployees: number = 0;
  averageSalary: number = 0;
  engineeringCount: number = 0;

  constructor(private employeeService: EmployeeService) {}

  // Run automatically when the component is rendered
  ngOnInit(): void {
    this.loadAllEmployees();
  }

  loadAllEmployees(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    // Subscribe to the Observable returned by our Service
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.isLoading = false;
        this.calculateStats(); // Calculate dynamic dashboard statistics
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
        this.errorMessage = 'Could not load employees from the server. Please make sure the JSON Server is running!';
        this.isLoading = false;
      }
    });
  }

  // Calculates key dashboard stats in real-time
  calculateStats(): void {
    this.totalEmployees = this.employees.length;
    
    if (this.totalEmployees === 0) {
      this.averageSalary = 0;
      this.engineeringCount = 0;
      return;
    }

    // Average Salary: Sum of all salaries divided by total employees
    const totalSalary = this.employees.reduce((sum, emp) => sum + (emp.salary || 0), 0);
    this.averageSalary = Math.round(totalSalary / this.totalEmployees);

    // Count how many are in the 'Engineering' department
    this.engineeringCount = this.employees.filter(
      emp => emp.department?.toLowerCase() === 'engineering'
    ).length;
  }

  // Deletes an employee with confirmation
  onDelete(id: number | undefined, name: string): void {
    if (!id) return;
    
    // Using a friendly browser confirmation dialog
    if (confirm(`Are you sure you want to remove ${name} from the records?`)) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          // Successfully deleted! Let's update our client-side array without hitting the server again.
          this.employees = this.employees.filter(emp => emp.id !== id);
          this.calculateStats();
        },
        error: (err) => {
          console.error('Error deleting employee:', err);
          alert('Failed to delete employee. Please try again.');
        }
      });
    }
  }

  // Toggles the list view between grid and table
  setViewMode(mode: 'grid' | 'table'): void {
    this.viewMode = mode;
  }
}
