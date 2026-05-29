import { Routes } from '@angular/router';
import { EmployeeList } from './components/employee-list/employee-list';
import { EmployeeForm } from './components/employee-form/employee-form';
import { EmployeeDetails } from './components/employee-details/employee-details';

export const routes: Routes = [
  // 1. Root route: Display the central employee list
  { path: '', component: EmployeeList },
  
  // 2. Add route: Render the form to register a new employee
  { path: 'add', component: EmployeeForm },
  
  // 3. Edit route: Render the form populated with existing data using the employee ID
  { path: 'edit/:id', component: EmployeeForm },
  
  // 4. Details route: Display a detailed visual card of the employee profile
  { path: 'details/:id', component: EmployeeDetails },
  
  // 5. Wildcard fallback: Redirect any invalid/broken URLs back to the root dashboard
  { path: '**', redirectTo: '' }
];
