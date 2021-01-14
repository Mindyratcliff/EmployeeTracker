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

function viewSearch {
    inquirer
    .prompt({
        name: "view",
        type: "rawlist",
        message: "What would you like to view?",
        choices: [
            "View all employees",
            "View all employees in a role",
            "View an employee by ID",
            "View all employees in a department",
            "View a department"
            
        ]

    })
    .then(function(answer){
        switch (answer.action) {
            case "View all employees":
                employeeSearch();
                break;
            
            case "View all employees in a role":
                roleSearch();
                break;

            case "View an employee by ID":
                idSearch();
                break;

            case "View all employees in a department":
                departmentSearch();
                break;

            case "View a department":
                allDepartmentSearch();
                break;
        }
    });
}

//Function to add 



//Function to update 

//Function to delete 


