use assignment;
CREATE TABLE Batch (
    Batch_Code INT PRIMARY KEY AUTO_INCREMENT,
    Batch_Name VARCHAR(30) NOT NULL,
    Duration VARCHAR(20),
    Description VARCHAR(100)
);

CREATE TABLE Trainer (
    Trainer_ID INT PRIMARY KEY AUTO_INCREMENT,
    Trainer_Name VARCHAR(30) NOT NULL,
    Address VARCHAR(50),
    Qualification VARCHAR(30),
    Experience INT,
    Domain VARCHAR(30),
    Batch_Code INT,
    
    FOREIGN KEY (Batch_Code)
    REFERENCES Batch(Batch_Code)
);

CREATE TABLE Student (
    Rn INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(30) NOT NULL,
    Address VARCHAR(50),
    Marks INT,
    DOB DATE,
    Batch_Code INT,
    
    FOREIGN KEY (Batch_Code)
    REFERENCES Batch(Batch_Code)
);

CREATE TABLE Fees (
    Fees_ID INT PRIMARY KEY AUTO_INCREMENT,
    Rn INT,
    Fees_Paid INT,
    Date_Paid DATE,
    
    FOREIGN KEY (Rn)
    REFERENCES Student(Rn)
);
INSERT INTO Batch
(Batch_Name, Duration, Description)
VALUES
('Java Full Stack','6 Months','Java + React'),
('DotNet','5 Months','ASP.NET Core Training');

INSERT INTO Trainer
(Trainer_Name, Address, Qualification, Experience, Domain, Batch_Code)
VALUES
('Rohit Sharma','Delhi','MCA',5,'Java',1),
('Ankit Verma','Noida','B.Tech',7,'.NET',2);

INSERT INTO Student
(Name, Address, Marks, DOB, Batch_Code)
VALUES
('Swayam','Kanpur',85,'2003-05-10',1),
('Aman','Lucknow',90,'2002-08-15',2);

INSERT INTO Fees
(Rn, Fees_Paid, Date_Paid)
VALUES
(1,25000,'2025-01-10'),
(2,30000,'2025-02-15');

SELECT
s.Name AS Student_Name,
s.Address,
b.Batch_Code,
b.Batch_Name,
t.Trainer_Name AS Faculty_Name,
b.Duration
FROM Student s
JOIN Batch b
ON s.Batch_Code = b.Batch_Code
JOIN Trainer t
ON b.Batch_Code = t.Batch_Code;

SELECT
s.Name AS Student_Name,
f.Fees_Paid,
f.Date_Paid
FROM Student s
JOIN Fees f
ON s.Rn = f.Rn;

SELECT
b.Batch_Code,
b.Batch_Name,
t.Trainer_ID,
t.Trainer_Name,
t.Address,
t.Qualification,
t.Experience,
t.Domain
FROM Batch b
JOIN Trainer t
ON b.Batch_Code = t.Batch_Code;