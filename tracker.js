//Dependencies 
const mysql = require('mysql');
const inquirer = require('inquirer');
const { rootCertificates } = require('tls');
const { allowedNodeEnvironmentFlags } = require('process');

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

function viewSearch() {
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

function addFunction () {
    inquirer
    .prompt({
        name: "add",
        type: "rawlist",
        message: "What would you like to add?",
        choices: [
            "Add a new employee",
            "Add a new department",
            "Add a new role"
            

        ]
    })
    .then(function(answer){
        switch (answer.action) {
            case "Add a new employee":
                addEmployee();
                break;
            
            case "Add a new department":
                addDepartment();
                break;

            case "Add a new role":
                addRole();
                break;
        }
    });
    
}

//Function to update 

function updateFunction() {
    inquirer
    .prompt({
        name: "update",
        type: "rawlist",
        message: "What would you like to update?",
        choices: [
            "Update an employee",
            "Update a department",
            "Update a role"
        ]
    })
    .then(function(answer){
        switch(answer.action){
            case "Update a new employee":
                updateEmployee();
                break;

            case "Update a department":
                updateDept();
                break;

            case "Update a role":
                updateRole();
                break;
        }
    });
}

//Function to delete 


