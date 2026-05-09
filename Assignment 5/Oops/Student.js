class Student{
    constructor(name,rollno,marks){
        this.name = name;
        this.rollno = rollno;
        this.marks = marks;
    }
    DisplayDetails(){
        console.log("Name is " + this.name);
        console.log("Roll No is " + this.rollno);
        console.log("Marks is " + this.marks);
    }
    checkResults(){
        if(this.marks >= 40){
            console.log("Pass");
        }
        else{
            console.log("Fail");
        }
    }
}
const student1 = new Student("Ajay", 1, 85);
student1.DisplayDetails();
student1.checkResults();

let name = prompt("Enter your name");

console.log(name);