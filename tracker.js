//Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const { rootCertificates } = require("tls");
const { allowedNodeEnvironmentFlags } = require("process");

//Make the connection

let connection = mysql.createConnection({
  port: 3306,
  user: "root",
  password: "",
  database: "employees_db",
});

connection.connect(function (err) {
  if (err) throw err;
  userOptions();
});

//Initial prompt

function userOptions() {
  inquirer
    .prompt({
      name: "options",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View an employee, department or role",
        "Add an employee, department or role",
        "Update an employee, department or role",
        "Delete an employee, department or role",
      ],
    })
    .then(function (answer) {
      switch (answer.options) {
        case "View an employee, department or role":
          viewSearch();
          break;

        case "Add an employee, department or role":
          addFunction();
          break;

        case "Update an employee, department or role":
          updateFunction();
          break;

        case "Delete an employee, department or role":
          deleteFunction();
          break;
      }
    });
}

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
        "View a department",
      ],
    })
    .then(function (answer) {
      switch (answer.view) {
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

function addFunction() {
  inquirer
    .prompt({
      name: "add",
      type: "rawlist",
      message: "What would you like to add?",
      choices: ["Add a new employee", "Add a new department", "Add a new role"],
    })
    .then(function (answer) {
      switch (answer.add) {
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
      choices: ["Update an employee", "Update a department", "Update a role"],
    })
    .then(function (answer) {
      switch (answer.update) {
        case "Update an employee":
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

function deleteFunction() {
  inquirer
    .prompt({
      name: "delete",
      type: "rawlist",
      message: "What would you like to delete?",
      choices: ["Delete an employee", "Delete a department", "Delete a role"],
    })
    .then(function (answer) {
      switch (answer.delete) {
        case "Delete an employee":
          deleteEmployee();
          break;

        case "Delete adepartment":
          deleteDept();
          break;

        case "Delete a role":
          deleteRole();
          break;
      }
    });
}

//Functions to search

function employeeSearch() {
  inquirer
    .prompt({
      name: "employee",
      type: "confirm",
      message: "Would you like to view all employees?",
    })
    .then(function (answer) {
      var query =
        "SELECT id, first_name, last_name, role_id, manager_id FROM employee ";
      connection.query(
        query,
        { employee: answer.employee },
        function (err, res) {
          if (err) {
            console.log(err);
          }
          for (var i = 0; i < res.length; i++) {
            console.log(
              "ID: " +
                res[i].id +
                " || Employee: " +
                res[i].first_name +
                res[i].last_name +
                " || Role: " +
                res[i].role_id +
                " || Manager: " +
                res[i].manager_id
            );
          }
          userOptions();
        }
      );
    });
}

function roleSearch() {
  inquirer
    .prompt({
      name: "employeeRole",
      type: "rawlist",
      message: "Which employee role would you like to search for?",
      choices: ["Accountant", "Representative", "Salesman"],
    })
    .then(function (answer) {
      var query =
        "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id ";
      query += "FROM employee INNER JOIN role ON employee.role_id = role.id ";
      query += "WHERE (role.title = ?) ORDER BY employee.id";

      connection.query(query, [answer.employeeRole], function (err, res) {
        if (err) {
          console.log(err);
        }
        console.log(res.length + " matches found!");
        for (var i = 0; i < res.length; i++) {
          console.log(
            i +
              1 +
              ".) " +
              "ID: " +
              res[i].id +
              " Role ID: " +
              res[i].role_id +
              " || Employee: " +
              res[i].first_name +
              " " +
              res[i].last_name +
              " || Manager: " +
              res[i].manager_id
          );
        }

        userOptions();
      });
    });
}

function idSearch() {
  inquirer
    .prompt({
      name: "employeeId",
      type: "input",
      message: "Please enter the ID for the employee you would like to view.",
    })
    .then(function (answer) {
      var query =
        "SELECT id, first_name, last_name, role_id, manager_id FROM employee WHERE id = ?";
      connection.query(query, [answer.employeeId], function (err, res) {
        if (err) {
          console.log(err);
        }
        console.log(res.length + " matches found!");
        for (var i = 0; i < res.length; i++) {
          console.log(
            i +
              1 +
              ".) " +
              "ID: " +
              res[i].id +
              " Role ID: " +
              res[i].role_id +
              " || Employee: " +
              res[i].first_name +
              " " +
              res[i].last_name +
              " || Manager: " +
              res[i].manager_id
          );
        }
        userOptions();
      });
    });
}

function departmentSearch() {
  inquirer
    .prompt({
      name: "deptSearch",
      type: "rawlist",
      message: "Which department would you like to search for?",
      choices: ["Accounting", "Human Resources", "Sales"],
    })
    .then(function (answer) {
      var query =
        "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id ";
      query += "FROM employee INNER JOIN role ON employee.role_id = role.id ";
      query += "INNER JOIN department ON department.id = role.department_id ";
      query += "WHERE (department.name = ?) ORDER BY employee.id";

      connection.query(query, [answer.deptSearch], function (err, res) {
        if (err) {
          console.log(err);
        }
        console.log(res.length + " matches found!");
        for (var i = 0; i < res.length; i++) {
          console.log(
            i +
              1 +
              ".) " +
              "ID: " +
              res[i].id +
              " Role ID: " +
              res[i].role_id +
              " || Employee: " +
              res[i].first_name +
              " " +
              res[i].last_name +
              " || Manager: " +
              res[i].manager_id
          );
        }

        userOptions();
      });
    });
}

function allDepartmentSearch() {
  inquirer
    .prompt({
      name: "department",
      type: "confirm",
      message: "Would you like to view all departments?",
    })
    .then(function (answer) {
      var query = "SELECT id, name FROM department ";
      connection.query(
        query,
        { employee: answer.department },
        function (err, res) {
          if (err) {
            console.log(err);
          }
          for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].id + " || Department: " + res[i].name);
          }
          userOptions();
        }
      );
    });
}

//Add functions

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "employeeFirstName",
        type: "input",
        message:
          "Please enter the first name for the employee you would like to add.",
      },
      {
        name: "employeeLastName",
        type: "input",
        message:
          "Please enter the last name for the employee you would like to add.",
      },
      {
        name: "employeeRole",
        type: "input",
        message:
          "Please enter the role identification number for the employee.",
      },
      {
        name: "employeeManager",
        type: "input",
        message:
          "If the employee has a manager, please enter the manager's identification number.",
      },
    ])
    .then(function (answer) {
      console.log("Inserting a new employee...\n");
      var query = connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.employeeFirstName,
          last_name: answer.employeeLastName,
          role_id: answer.employeeRole,
          manager_id: answer.employeeManager,
        },
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " employee added!\n");
          userOptions();
        }
      );
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "departmentName",
        type: "input",
        message:
          "Please enter the name of the department you would like to add.",
      },
      {
        name: "departmentId",
        type: "input",
        message:
          "Please enter the identification number for the department you would like to add.",
      },
    ])
    .then(function (answer) {
      console.log("Inserting a new department...\n");
      var query = connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.departmentName,
          id: answer.departmentId,
        },
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " department added!\n");
          userOptions();
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        name: "roleTitle",
        type: "input",
        message: "Please enter the title for the role you would like to add.",
      },
      {
        name: "roleSalary",
        type: "input",
        message: "In integers, please enter the salary for the role.",
      },
      {
        name: "roleDept",
        type: "input",
        message:
          "Please enter the department idenfication number for the role.",
      },
    ])
    .then(function (answer) {
      console.log("Inserting a new role...\n");
      var query = connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.roleTitle,
          salary: answer.roleSalary,
          department_id: answer.roleDept,
        },
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " role added!\n");
          userOptions();
        }
      );
    });
}

//Update Employee Functions

function updateEmployee() {
  inquirer
    .prompt([
      {
        name: "updateEmployee",
        type: "input",
        message: "Please enter id for the employee you would like to update.",
      },
      {
        name: "updateWhat",
        type: "rawlist",
        message: "Please select what you would like to update.",
        choices: ["First Name", "Last Name", "Role", "Manager"],
      },
    ])
    .then((data) => {
      if (data.updateWhat == "First Name") {
        askFirstName(data);
      }
      if (data.updateWhat == "Last Name") {
        askLastName(data);
      }
      if (data.updateWhat == "Role") {
        askRole(data);
      }
      if (data.updateWhat == "Manager") {
        askManager(data);
      }
    });
}

function askFirstName() {
  inquirer
    .prompt({
      name: "firstName",
      type: "input",
      message: "Please enter the new first name of the employee.",
    })
    .then(function (answer) {
      console.log("Updating employee first name...\n");
      var query = connection.query(
        "UPDATE employee SET ? WHERE ? ",
        [
          {
            first_name: answer.firstName,
          },
        ],
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " updated!\n");
          userOptions();
        }
      );
    });
}

function askLastName() {
  inquirer
    .prompt({
      name: "lastName",
      type: "input",
      message: "Please enter the new last name of the employee.",
    })
    .then(function (answer) {
      console.log("Updating employee last name...\n");
      var query = connection.query(
        "UPDATE employee SET ? WHERE ? ",
        [
          {
            last_name: answer.lastName,
          },
        ],
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " updated!\n");
          userOptions();
        }
      );
    });
}

function askRole() {
  inquirer
    .prompt({
      name: "role",
      type: "input",
      message: "Please enter the new role of the employee.",
    })
    .then(function (answer) {
      console.log("Updating employee role...\n");
      var query = connection.query(
        "UPDATE employee SET ? WHERE ? ",
        [
          {
            role_id: answer.role,
          },
        ],
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " updated!\n");
          userOptions();
        }
      );
    });
}

function askManager() {
  inquirer
    .prompt({
      name: "manager",
      type: "input",
      message: "Please enter the new manager of the employee.",
    })
    .then(function (answer) {
      console.log("Updating employee manager...\n");
      var query = connection.query(
        "UPDATE employee SET ? WHERE ? ",
        [
          {
            manager_id: answer.manager,
          },
        ],
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " updated!\n");
          userOptions();
        }
      );
    });
}

//Update Department Functions


function updateDept() {
    inquirer
      .prompt([
        {
          name: "updateDepartment",
          type: "input",
          message: "Please enter the name of the department you would like to update.",
        },
        {
          name: "updateWhat",
          type: "rawlist",
          message: "Please select what you would like to update.",
          choices: ["Name", "Id"],
        },
      ])
      .then((data) => {
        if (data.updateWhat == "Name") {
          departmentName(data);
        }
        if (data.updateWhat == "Id") {
          departmentId(data);
        }
      });
  }


function departmentName() {
    inquirer
      .prompt({
        name: "departmentName",
        type: "input",
        message: "Please enter the new name of the department.",
      })
      .then(function (answer) {
        console.log("Updating department name...\n");
        var query = connection.query(
          "UPDATE department SET ? WHERE ? ",
          [
            {
              name: answer.departmentName,
            },
          ],
          function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " updated!\n");
            userOptions();
          }
        );
      });
  }
  
  function departmentId() {
    inquirer
      .prompt({
        name: "departmentId",
        type: "input",
        message: "Please enter the ID of the department.",
      })
      .then(function (answer) {
        console.log("Updating department ID...\n");
        var query = connection.query(
          "UPDATE department SET ? WHERE ? ",
          [
            {
              id: answer.departmentId,
            },
          ],
          function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " updated!\n");
            userOptions();
          }
        );
      });
  }

  //Update Role Functions


function updateRole() {
    inquirer
      .prompt([
        {
          name: "updateRole",
          type: "input",
          message: "Please enter the role you would like to update.",
        },
        {
          name: "updateWhat",
          type: "rawlist",
          message: "Please select what you would like to update.",
          choices: ["ID", "Title", "Salary", "Department"],
        },
      ])
      .then((data) => {
        if (data.updateWhat == "ID") {
          askRoleId(data);
        }
        if (data.updateWhat == "Title") {
          askRoleTitle(data);
        }
        if (data.updateWhat == "Salary") {
          askRoleSalary(data);
        }
        if (data.updateWhat == "Department") {
          askRoleDepartment(data);
        }
      });
  }
  
  function askRoleId() {
    inquirer
      .prompt({
        name: "roleId",
        type: "input",
        message: "Please enter the ID for the role.",
      })
      .then(function (answer) {
        console.log("Updating role ID...\n");
        var query = connection.query(
          "UPDATE role SET ? WHERE ? ",
          [
            {
              id: answer.roleId,
            },
          ],
          function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " updated!\n");
            userOptions();
          }
        );
      });
  }
  
  function askRoleTitle() {
    inquirer
      .prompt({
        name: "roleTitle",
        type: "input",
        message: "Please enter the title of the role.",
      })
      .then(function (answer) {
        console.log("Updating role title...\n");
        var query = connection.query(
          "UPDATE role SET ? WHERE ? ",
          [
            {
              title: answer.roleTitle,
            },
          ],
          function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " updated!\n");
            userOptions();
          }
        );
      });
  }
  
  function askRoleSalary() {
    inquirer
      .prompt({
        name: "roleSalary",
        type: "input",
        message: "Please enter the new salary for the role.",
      })
      .then(function (answer) {
          if(answer == NaN) {
              console.log("Please enter a numeric value for the salary.")
          }
        console.log("Updating role salary...\n");
        var query = connection.query(
          "UPDATE role SET ? WHERE ? ",
          [
            {
              salary: answer.roleSalary,
            },
          ],
          function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " updated!\n");
            userOptions();
          }
        );
      });
  }
  
  function askRoleDepartment() {
    inquirer
      .prompt({
        name: "roleDept",
        type: "input",
        message: "Please enter the new department for the role.",
      })
      .then(function (answer) {
        console.log("Updating role department...\n");
        var query = connection.query(
          "UPDATE role SET ? WHERE ? ",
          [
            {
              department_id: answer.roleDept,
            },
          ],
          function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " updated!\n");
            userOptions();
          }
        );
      });
  }