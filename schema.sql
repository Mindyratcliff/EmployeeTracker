CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
id INTEGER AUTO_INCREMENT,
name VARCHAR(30) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE role (
id INTEGER AUTO_INCREMENT,
title VARCHAR (30) NOT NULL,
salary DECIMAL (8, 2) NOT NULL,
department_id INTEGER,
PRIMARY KEY (id),
FOREIGN KEY (department_id) 
REFERENCES department (id)
);

CREATE TABLE employee (
id INTEGER AUTO_INCREMENT,
first_name VARCHAR (30) NOT NULL,
last_name VARCHAR (30) NOT NULL,
role_id INTEGER NOT NULL,
manager_id INTEGER,
PRIMARY KEY (id),
FOREIGN KEY (role_id)
REFERENCES role (id),
FOREIGN KEY (manager_id)
REFERENCES employee (id)
);