require("console.table");
const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const mysql = require("mysql2");

// Connect to the database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "employee_tracker_db",
  },
  console.log(`employee_tracker_db connected`)
);

function Work() {
  const logoText = logo({ name: "Employee Tracker" }).render();
  console.log(logoText);
  inquirer
    .prompt([
      {
        type: "list",
        name: "work",
        message: "What would you like to do?",
        choices: [
          "View_All_Employees",
          "View_All_Employees_by_Department",
          "View_All_Employees_by_Manager",
          "Add_Employee",
          "Remove_Employee",
          "Update_Employee_Role",
          "Update_Employee_Manager",
          "View_All_Roles",
          "Add_Role",
          "Remove_Role",
          "View_All_Departments",
          "Add_Department",
          "Remove_Department",
          "Quit",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.work) {
        case "View_All_Employees":
          viewAllEmployees();
          break;
        case "View_All_Employees_by_Department":
          viewAllEmployeesByDepartment();
          break;
        case "View_All_Employees_by_Manager":
          viewAllEmployeesByManager();
          break;
        case "Add_Employee":
          addEmployee();
          break;
        case "Remove_Employee":
          removeEmployee();
          break;
        case "Update_Employee_Role":
          updateEmployeeRole();
          break;
        case "Update_Employee_Manager":
          updateEmployeeManager();
          break;
        case "View_All_Roles":
          viewAllRoles();
          break;
        case "Add_Role":
          addRole();
          break;
        case "Remove_Role":
          removeRole();
          break;
        case "View_All_Departments":
          viewAllDepartments();
          break;
        case "Add_Department":
          addDepartment();
          break;
        case "Remove_Department":
          removeDepartment();
          break;
        case "Quit":
          quit();
          break;
      }
    });
}

function viewAllEmployees() {
  db.query("SELECT * FROM employee", function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
  });
  Work();
}

function viewAllRoles() {
  db.query("SELECT * FROM role", function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
  });
  Work();
}

function viewAllDepartments() {
  db.query("SELECT * FROM department", function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
  });
  Work();
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What is the name of the department?",
      },
    ])
    .then((answer) => {
      db.query(
        "INSERT INTO department SET ?",
        {
          name: answer.department,
        },
        function (err, results) {
          if (err) {
            console.log(err);
          }
          viewAllDepartments();
        }
      );
    });
}



Work();
