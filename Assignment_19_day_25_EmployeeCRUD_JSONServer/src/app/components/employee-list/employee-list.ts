import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

  viewMode: 'grid' | 'table' = 'grid';

  totalEmployees: number = 0;
  averageSalary: number = 0;
  engineeringCount: number = 0;

  constructor(
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadAllEmployees();
  }

  loadAllEmployees(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.isLoading = false;
        this.calculateStats();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
        this.errorMessage = 'Could not load employees from the server. Please make sure the JSON Server is running!';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  calculateStats(): void {
    this.totalEmployees = this.employees.length;

    if (this.totalEmployees === 0) {
      this.averageSalary = 0;
      this.engineeringCount = 0;
      return;
    }

    const totalSalary = this.employees.reduce((sum, emp) => sum + (emp.salary || 0), 0);
    this.averageSalary = Math.round(totalSalary / this.totalEmployees);

    this.engineeringCount = this.employees.filter(
      emp => emp.department?.toLowerCase() === 'engineering'
    ).length;
  }

  onDelete(id: string | number | undefined, name: string): void {
    if (!id) return;

    if (confirm(`Are you sure you want to remove ${name} from the records?`)) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.employees = this.employees.filter(emp => emp.id !== id);
          this.calculateStats();
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error deleting employee:', err);
          alert('Failed to delete employee. Please try again.');
          this.cdr.detectChanges();
        }
      });
    }
  }

  setViewMode(mode: 'grid' | 'table'): void {
    this.viewMode = mode;
  }
}
