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

function addRole() {
  db.query("Select * FROM department", function (err, results) {
    if (err) {
      console.log(err);
    }
    let departmentArray = results.map((department) => {
      return {
        name: department.name,
        value: department.id,
      };
    });
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the name of the role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary of the role?",
        },
        {
          type: "list",
          name: "department",
          message: "What department does the role belong to?",
          choices: departmentArray,
        },
      ])
      .then((answer) => {
        db.query(
          "INSERT INTO role SET ?",
          {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.department,
          },
          function (err, results) {
            if (err) {
              console.log(err);
            }
            viewAllRoles();
          }
        );
      });
  });
}

function addEmployee() {
  db.query("Select * FROM role", function (err, results) {
    if (err) {
      console.log(err);
    }
    let roleArray = results.map((role) => {
      return {
        name: role.title,
        value: role.id,
      };
    });
    inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "What is the employee's first name?",
        },
        {
          type: "input",
          name: "last_name",
          message: "What is the employee's last name?",
        },
        {
          type: "list",
          name: "role",
          message: "What is the employee's role?",
          choices: roleArray,
        },
      ])
      .then((answer) => {
        db.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: answer.role,
          },
          function (err, results) {
            if (err) {
              console.log(err);
            }
            viewAllEmployees();
          }
        );
      });
  });
}

function updateEmployeeRole() {
  db.query("Select * FROM employee", function (err, results) {
    if (err) {
      console.log(err);
    }
    let employeeArray = results.map((employee) => {
      return {
        name: employee.first_name + " " + employee.last_name,
        value: employee.id,
      };
    });
    inquirer
      .prompt([
        {
          type: "list",
          name: "employee",
          message: "Which employee's role would you like to update?",
          choices: employeeArray,
        },
      ])
      .then((answer) => {
        db.query("Select * FROM role", function (err, results) {
          if (err) {
            console.log(err);
          }
          let roleArray = results.map((role) => {
            return {
              name: role.title,
              value: role.id,
            };
          });
          inquirer
            .prompt([
              {
                type: "list",
                name: "role",
                message: "What is the employee's new role?",
                choices: roleArray,
              },
            ])
            .then((answer2) => {
              db.query(
                "UPDATE employee SET role_id = ? WHERE id = ?",
                [answer2.role, answer.employee],
                function (err, results) {
                  if (err) {
                    console.log(err);
                  }
                  viewAllEmployees();
                }
              );
            });
        });
      });
  });
}

Work();
