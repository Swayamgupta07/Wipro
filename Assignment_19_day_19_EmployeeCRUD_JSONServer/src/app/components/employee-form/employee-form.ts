import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  // We import 'ReactiveFormsModule' here so our HTML can bind using formGroup and formControlName
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './employee-form.html'
})
export class EmployeeForm implements OnInit {
  employeeForm!: FormGroup;
  isEditMode: boolean = false;
  employeeId: number | null = null;
  isLoading: boolean = false;
  isSaving: boolean = false;
  errorMessage: string = '';

  // Pre-defined departments for our dropdown selection
  departments: string[] = [
    'Engineering', 
    'HR', 
    'Product Management', 
    'Sales', 
    'Marketing', 
    'Finance', 
    'Operations'
  ];

  // Pre-defined genders for our radio buttons
  genders: string[] = ['Male', 'Female', 'Other'];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 1. Initialize the Form Group and set up validators for each control
    this.initForm();

    // 2. Check if there is an 'id' parameter in the active URL route
    // If '/edit/12' is active, snapshot.params['id'] will be '12', signaling we are in EDIT mode!
    const idParam = this.route.snapshot.params['id'];
    if (idParam) {
      this.isEditMode = true;
      this.employeeId = +idParam; // The '+' converts the string '12' into the number 12
      this.loadEmployeeForEdit(this.employeeId);
    }
  }

  // Initializes the Reactive Form structure
  private initForm(): void {
    this.employeeForm = this.fb.group({
      // FormControl: [DefaultValue, [Array of Validators]]
      employeeName: ['', [Validators.required, Validators.minLength(3)]],
      department: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      salary: [null, [Validators.required, Validators.min(1000)]],
      age: [null, [Validators.required, Validators.min(18), Validators.max(65)]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Matches exactly 10 digits, e.g. 9876543210
      profileImage: [''] // Optional URL
    });
  }

  // Fetches an employee's details and populates the form controls
  private loadEmployeeForEdit(id: number): void {
    this.isLoading = true;
    this.employeeService.getEmployee(id).subscribe({
      next: (emp) => {
        // 'patchValue' merges the employee object values into the form controls.
        // It matches the keys of the object to the names of our controls!
        this.employeeForm.patchValue(emp);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching employee details for edit:', err);
        this.errorMessage = 'Could not fetch employee details. The employee might not exist or the database server is offline.';
        this.isLoading = false;
      }
    });
  }

  // Helper method: Easily check if a form control is invalid and touched in our HTML
  isControlInvalid(controlName: string): boolean {
    const control = this.employeeForm.get(controlName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  // Triggered when the user submits the form
  onSubmit(): void {
    // If the form has validation errors, do not submit!
    if (this.employeeForm.invalid) {
      // 'markAllAsTouched' forces all fields to display their validation red borders instantly
      this.employeeForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';

    // Create the payload from our form's values
    const employeeData: Employee = this.employeeForm.value;

    if (this.isEditMode && this.employeeId !== null) {
      // In Edit Mode, append the ID so the database knows which record to overwrite
      employeeData.id = this.employeeId;

      this.employeeService.updateEmployee(employeeData).subscribe({
        next: () => {
          this.isSaving = false;
          this.router.navigate(['/']); // Redirect back to list
        },
        error: (err) => {
          console.error('Error updating employee:', err);
          this.errorMessage = 'Failed to update employee details. Please try again.';
          this.isSaving = false;
        }
      });
    } else {
      // In Create Mode, let the database generate a new ID
      this.employeeService.addEmployee(employeeData).subscribe({
        next: () => {
          this.isSaving = false;
          this.router.navigate(['/']); // Redirect back to list
        },
        error: (err) => {
          console.error('Error adding employee:', err);
          this.errorMessage = 'Failed to save new employee. Please try again.';
          this.isSaving = false;
        }
      });
    }
  }
}
