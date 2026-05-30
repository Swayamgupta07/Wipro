import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../models/employee.model';

@Pipe({
  name: 'employeeSearch',
  standalone: true
})
export class EmployeeSearchPipe implements PipeTransform {

  transform(employees: Employee[], query: string): Employee[] {
    if (!employees) return [];

    if (!query || query.trim() === '') return employees;

    const lowerQuery = query.toLowerCase().trim();

    return employees.filter(emp => {
      const matchesName = emp.employeeName ? emp.employeeName.toLowerCase().includes(lowerQuery) : false;
      const matchesDept = emp.department ? emp.department.toLowerCase().includes(lowerQuery) : false;
      const matchesDesg = emp.designation ? emp.designation.toLowerCase().includes(lowerQuery) : false;
      return matchesName || matchesDept || matchesDesg;
    });
  }
}
