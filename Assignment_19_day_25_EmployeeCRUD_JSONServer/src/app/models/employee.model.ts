/**
 * Blueprint for the Employee Entity
 * This interface defines the exact structure and types of an Employee.
 * In TypeScript, this acts as a 'contract' to prevent spelling mistakes or wrong data types.
 */
export interface Employee {
  // 'id' is optional (?) because new employees don't have an ID until they are saved to the backend database.
  id?: number; 
  
  employeeName: string;
  department: string;
  designation: string;
  salary: number;
  age: number;
  gender: string;
  email: string;
  phone: string;
  profileImage: string;
}
