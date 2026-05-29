import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root' // Makes this service available globally in our entire application.
})
export class EmployeeService {
  
  // The URL of our mock backend database server (provided by json-server)
  private apiUrl = 'http://127.0.0.1:3000/employees';

  // We 'inject' Angular's HttpClient inside the constructor.
  // The 'private http: HttpClient' does two things at once:
  // 1. It declares a private class property named 'http'.
  // 2. It injects the HttpClient service into it so we can use it.
  constructor(private http: HttpClient) {}

  /**
   * CREATE: Adds a new employee to the database
   * Sends a HTTP POST request.
   * @param employee The new employee data object
   * @returns An Observable containing the saved employee (now with a generated ID from the server)
   */
  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  /**
   * READ (ALL): Fetches the complete list of employees
   * Sends a HTTP GET request.
   * @returns An Observable containing an array of Employees
   */
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  /**
   * READ (ONE): Fetches details of a single employee by their ID
   * Sends a HTTP GET request to /employees/:id
   * @param id The unique ID of the employee
   * @returns An Observable containing the Employee object
   */
  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  /**
   * UPDATE: Saves updates to an existing employee
   * Sends a HTTP PUT request to /employees/:id
   * @param employee The updated employee object (must contain an ID)
   * @returns An Observable containing the updated Employee
   */
  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${employee.id}`, employee);
  }

  /**
   * DELETE: Removes an employee from the database by their ID
   * Sends a HTTP DELETE request to /employees/:id
   * @param id The ID of the employee to delete
   * @returns An Observable that completes when the deletion is finished
   */
  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
