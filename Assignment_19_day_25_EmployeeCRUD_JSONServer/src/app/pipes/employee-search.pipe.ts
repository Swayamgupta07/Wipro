import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../models/employee.model';

@Pipe({
  name: 'employeeSearch',
  standalone: true // Standalone pipe so it can be imported directly into our components!
})
export class EmployeeSearchPipe implements PipeTransform {

  /**
   * Transforms the input list of employees by filtering it based on the search query.
   * 
   * @param employees The array of all employees
   * @param query The search keyword entered by the user
   * @returns A filtered array of employees
   */
  transform(employees: Employee[], query: string): Employee[] {
    // If the list is empty, return an empty array
    if (!employees) return [];
    
    // If no search query was entered, return the complete unfiltered list
    if (!query || query.trim() === '') return employees;

    // Convert the search query to lowercase to ensure our search is case-insensitive
    const lowerQuery = query.toLowerCase().trim();

    return employees.filter(emp => {
      // Check if the query matches Name, Department, or Designation
      const matchesName = emp.employeeName ? emp.employeeName.toLowerCase().includes(lowerQuery) : false;
      const matchesDept = emp.department ? emp.department.toLowerCase().includes(lowerQuery) : false;
      const matchesDesg = emp.designation ? emp.designation.toLowerCase().includes(lowerQuery) : false;

      return matchesName || matchesDept || matchesDesg;
    });
  }
}
