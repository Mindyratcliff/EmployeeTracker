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
salary DECIMAL (7, 3) NOT NULL,
department_id INTEGER,
PRIMARY KEY (id)
);

CREATE TABLE employee (
id INTEGER AUTO_INCREMENT,
first_name VARCHAR (30) NOT NULL,
last_name VARCHAR (30) NOT NULL,
role_id INTEGER NOT NULL,
manager_id INTEGER,
PRIMARY KEY (id)
);