import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { HighlightSalaryDirective } from '../../directives/highlight-salary.directive';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule, RouterModule, HighlightSalaryDirective],
  templateUrl: './employee-details.html'
})
export class EmployeeDetails implements OnInit {
  employee: Employee | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Extract the ID from the route path: /details/:id
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.loadEmployeeDetails(+id);
    } else {
      this.errorMessage = 'Invalid Employee Profile ID.';
      this.isLoading = false;
    }
  }

  loadEmployeeDetails(id: number): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.employeeService.getEmployee(id).subscribe({
      next: (emp) => {
        this.employee = emp;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching employee details:', err);
        this.errorMessage = 'Could not load employee details. The employee may have been deleted or the server is down.';
        this.isLoading = false;
      }
    });
  }

  onDelete(): void {
    if (!this.employee || !this.employee.id) return;

    if (confirm(`Are you absolutely sure you want to permanently delete the profile of ${this.employee.employeeName}?`)) {
      this.employeeService.deleteEmployee(this.employee.id).subscribe({
        next: () => {
          this.router.navigate(['/']); // Redirect to the main list dashboard
        },
        error: (err) => {
          console.error('Error deleting employee:', err);
          alert('Failed to delete employee profile. Please try again.');
        }
      });
    }
  }
}
