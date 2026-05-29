class Employee{
    constructor(empId,empName,salary){
        this.empId = empId;
        this.empName = empName;
        this.salary = salary;
    }
    displayEmployee(){
        console.log("Employee Id is " + this.empId);
        console.log("Employee Name is " + this.empName);
        console.log("Employee Salary is " + this.salary);
    }
}
class Manager extends Employee{
    constructor(empId,empName,salary,department){
        super(empId,empName,salary);
        this.department = department;
    }
    displayManager(){
        super.displayEmployee();
        console.log("Department is " + this.department);
    }
}
const manager1 = new Manager(101, "Ajay", 50000, "IT");
manager1.displayManager();
