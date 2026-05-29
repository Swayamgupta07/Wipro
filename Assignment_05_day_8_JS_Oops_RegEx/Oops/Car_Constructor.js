class Car{
    constructor(brand,model,price){
        this.brand = brand;
        this.model = model;
        this.price = price;
    }
    displayDetails(){
        console.log("Brand is " + this.brand);
        console.log("Model is " + this.model);
        console.log("Price is " + this.price);
    }
}
const car1 = new Car("Toyota", "Camry", 30000);
const car2 = new Car("Honda", "Civic", 25000);
const car3 = new Car("Ford", "Mustang", 35000);
const car4 = new Car("Tesla", "Model 3", 40000);
const car5 = new Car("BMW", "X5", 50000);

car1.displayDetails();
car2.displayDetails();
car3.displayDetails();
car4.displayDetails();
car5.displayDetails();