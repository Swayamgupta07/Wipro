import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../models/employee.model';

@Pipe({
  name: 'departmentFilter',
})
export class DepartmentFilterPipe implements PipeTransform {
  transform(employees: Employee[], department: string): Employee[] {
    if (!employees || !department || department === 'All') {
      return employees;
    }
    return employees.filter(emp => emp.department.toLowerCase() === department.toLowerCase());
  }
}
