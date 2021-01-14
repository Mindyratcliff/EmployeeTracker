//Dependencies 
const mysql = require('mysql');
const inquirer = require('inquirer');
const { rootCertificates } = require('tls');

//Make the connection

let connection = mysql.createConnection({
    port: 3306,
    user: root,
    password: "",
    database: "employees_db"
});

connection.connect(function(err){
    if (err) throw err;
});

//Function to view 

//Function to add 

//Function to update 

//Function to delete 


