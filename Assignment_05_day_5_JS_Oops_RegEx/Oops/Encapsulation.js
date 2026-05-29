class BankAccount{
    #balance;
    constructor(balance){
        this.#balance = balance;
    }
    get Balance(){
        return this.#balance;
    }
    set Balance(amount){
        if(amount>=0){
            this.#balance = amount;
        }
        else{
            console.log("Invalid amount");
        }
    }
    deposit(amount){
        if(amount>0){
            this.#balance += amount;
            console.log("Amount deposited successfully");
        }
        else{
            console.log("Invalid amount");
        }
    }
    withdraw(amount){
        if(amount>0 && amount<=this.#balance){
            this.#balance -= amount;
            console.log("Amount withdrawn successfully");
        }
        else if (amount <= 0) {
            console.log("Invalid withdraw amount");
        }
        else {
            this.#balance -= amount;
            console.log(amount + " withdrawn successfully");
        }
    }
}
const account1 = new BankAccount(1000);
console.log("Current Balance:", account1.Balance);
account1.deposit(2000);
console.log("Updated Balance:", account1.Balance);
account1.Balance = 10000;
console.log("New Balance:", account1.Balance);
account1.withdraw(3000);
console.log("Final Balance:", account1.Balance);