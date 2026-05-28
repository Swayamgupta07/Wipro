import { Component, EventEmitter, Output, DoCheck, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../services/employee';
import { Employee } from '../models/employee.model';
import { DepartmentFilterPipe } from '../pipes/department-filter-pipe';

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule, FormsModule, DepartmentFilterPipe],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css'
})
export class EmployeeList implements OnInit, DoCheck {
  employees: Employee[] = [];
  selectedDepartment: string = 'All';

  @Output() editRequest = new EventEmitter<Employee>();

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employees = this.employeeService.getEmployees();
  }
  ngDoCheck() {
    this.employees = this.employeeService.getEmployees();
  }

  onEdit(emp: Employee) {
    this.editRequest.emit(emp);
  }

  onDelete(id: number) {
    if(confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id);
    }
  }
}
