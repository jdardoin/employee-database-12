DROP DATABASE IF EXISTS  employee_tracker_db;

-- To create the database

CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

-- creating tables 

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY(id),
    name VARCHAR(30) NOT NULL,
   
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL (10, 2),
    department_id INT foriegn key (department_id) references department(id),

)

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT

)