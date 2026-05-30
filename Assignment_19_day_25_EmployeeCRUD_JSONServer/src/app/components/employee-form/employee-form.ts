import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './employee-form.html'
})
export class EmployeeForm implements OnInit {
  employeeForm!: FormGroup;
  isEditMode: boolean = false;
  employeeId: string | number | null = null;
  isLoading: boolean = false;
  isSaving: boolean = false;
  errorMessage: string = '';

  departments: string[] = [
    'Engineering',
    'HR',
    'Product Management',
    'Sales',
    'Marketing',
    'Finance',
    'Operations'
  ];

  genders: string[] = ['Male', 'Female'];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    try {
      this.initForm();

      const idParam = this.route.snapshot.params['id'];
      if (idParam) {
        this.isEditMode = true;
        this.employeeId = idParam;
        this.isLoading = true;
        this.loadEmployeeForEdit(idParam);
      }
    } catch (e: any) {
      console.error('Error in ngOnInit:', e);
      this.errorMessage = 'Initialization Error: ' + (e.message || e);
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }

  private initForm(): void {
    this.employeeForm = this.fb.group({
      employeeName: ['', [Validators.required, Validators.minLength(3)]],
      department: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      salary: [null, [Validators.required, Validators.min(1000)]],
      age: [null, [Validators.required, Validators.min(18), Validators.max(65)]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      profileImage: ['']
    });
  }

  private loadEmployeeForEdit(id: string | number): void {
    this.isLoading = true;
    this.employeeService.getEmployee(id).subscribe({
      next: (emp) => {
        try {
          this.employeeForm.patchValue(emp);
          this.isLoading = false;
          this.cdr.detectChanges();
        } catch (e: any) {
          console.error('Error during form patchValue:', e);
          this.errorMessage = 'Render Mapping Error: ' + (e.message || e);
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        console.error('Error fetching employee details for edit:', err);
        this.errorMessage = 'Could not fetch employee details. The employee might not exist or the database server is offline.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.employeeForm.get(controlName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';

    const employeeData: Employee = this.employeeForm.value;

    if (this.isEditMode && this.employeeId !== null) {
      employeeData.id = this.employeeId;

      this.employeeService.updateEmployee(employeeData).subscribe({
        next: () => {
          this.isSaving = false;
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error updating employee:', err);
          this.errorMessage = 'Failed to update employee details. Please try again.';
          this.isSaving = false;
        }
      });
    } else {
      this.employeeService.getEmployees().subscribe({
        next: (employees) => {
          let maxId = 0;
          employees.forEach(emp => {
            const numId = parseInt(emp.id as string, 10);
            if (!isNaN(numId) && numId > maxId) {
              maxId = numId;
            }
          });
          employeeData.id = (maxId + 1).toString();

          this.employeeService.addEmployee(employeeData).subscribe({
            next: () => {
              this.isSaving = false;
              this.router.navigate(['/']);
            },
            error: (err) => {
              console.error('Error adding employee:', err);
              this.errorMessage = 'Failed to save new employee. Please try again.';
              this.isSaving = false;
            }
          });
        },
        error: (err) => {

          this.employeeService.addEmployee(employeeData).subscribe({
            next: () => {
              this.isSaving = false;
              this.router.navigate(['/']);
            },
            error: (err2) => {
              console.error('Error adding employee:', err2);
              this.errorMessage = 'Failed to save new employee. Please try again.';
              this.isSaving = false;
            }
          });
        }
      });
    }
  }
}
