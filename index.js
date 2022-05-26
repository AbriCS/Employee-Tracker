const inquirer = require("inquirer");
const mysql = require("mysql2");
const express = require("express");
const fs = require("fs");

const PORT = process.env.PORT || 3003;
const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "employee_db",
}, console.log ("connected to employee db")
);

app.listen(PORT, ()=> {
    console.log(`Server running on Port${PORT}`);
});

let Questions = [{
    prefix: "What is the task?",
    type: "list",
    name: "Options",
    choices:[
        "View all departments",
        "View all roles",
        "View employees",
        "View budget",
        "Add a department",
        "Add an employee",
        "Add a role",
        "Update Manager",
        "Update an employee",
        "Delete",
        "Quit",
    ],
},
{
    type:"list",
    name: "viewEmployees",
    message: "What would you like to see?",
    choices: ["View all", "View by department", "View by manager"],
    when: (answers) => answers.menuOption === "View employee",
},

{
    type:"list",
    name: "deleteData",
    message: "What would you like to delete?",
    choices: ["Delete role", "Delete department", "Delete employee"],
    when: (answers) => answers.menuOption === "Remove",
},
];

let addDepartment = [{
    type: "input",
    name: "addDept",
    message: "Add a department"
},
];

Questions();
async function Questions () {
    const menuOption = await inquirer.prompt(Questions);
    switch (menuOption.Options){
        case "View all departments": viewAllDepartments();
        break;
        case "View roles":
            viewAllRoles();
        break;
case "View employees":
        switch (menuOption.viewEmployees){    
        case "View all":
            viewAllEmployees();
        break;
        case "View by manager":
            viewAllByManager();
        break;
        case "View by department":
            viewAllByDepartment();
        break;
        default:
            console.log ("retry")
    }
    break;
    case "View budget":
            viewBudget();
    break;
    case "Add a Department":
            addDepartment();
    break;
    case "Add a role":
            addRole();
    break;
    case "Add a employee":
            addEmployee();
    break;
    case "Update a role":
            ChangeRole();
    break;
    case "Update a manager":
            ChangeManager();
    break;
    case "Exit":
            process.exit();
    break;

    case "Remove":      
    switch (menuOption.viewEmployees) {
       
        case "Delete a Department":
                deleteDepartment();
        break;
        case "Delete a role":
                deleteRole();
        break;
        case "Delete an employee":
                deleteEmployee(); 
        break;
        default:
            console.log("OOPs!! error");  
    }
  }
}
async function viewAllDepartments(){
    db.query("SELECT * FROM department", (err, results) => {
        if (err){
            console.log(err);
        }
        console.table(results);
        askQuestions();
    });
}

async function viewAllRoles() {
    db.query(
        "SELECT role.title, role.id, role.salary, department.department_name
FROM role INNER JOIN department ON role.department_id = department.id,
(err, results) => {
    if (err) {
        console.log(err);
    }
    console.table(results);
    askQuestions();
}
);
}

async function viewAllEmployees() {
    let viewEmployeesQuery = fs.readFileSync(
        "./db/viewEmployeesQuery.sql", "utf8"
    );
    db.query(viewEmployeesQuery, (err, results) => {
        if (err) {
            console.log(err);
        } console.table(results);
        askQuestions();
    });
}

async function viewEmployeesByManager() {
    let viewEmployeesQuery = fs.readFileSync(
        "./db/viewEmployeeMgrQuery.sql", "utf8"
    );
    db.query(viewEmployeesQuery, (err, results) => {
        if (err) {
            console.log(err);
        } console.table(results);
        askQuestions();
    });
}

async function viewEmployeesByDepartment() {
    let viewByDeptQuery = fs.readFileSync(
        "./db/viewByDepartment.sql", "utf8"
    );
    db.query(viewByDeptQuery, (err, results) => {
        if (err) {
            console.log(err);
        } console.table(results);
        askQuestions();
    });
}

async function viewBudget(){
    console.log("view budget function");
}

async function addDepartment() {
    const newDepartment = await inquirer.prompt(addDepartmentQuery);
    console.log(newDepartment.addDept);
    dbquery(
        `INSERT INTO department (department_name) VALUES ("${newDepartment.addDept}")`,
        (err, results) => {
            if (err) {
                console.log(err);
            }
            console.log(`${newDepartment.addDept} new department added!`);
        }
    );
    viewAllDepartments();
}

async function newRoleQuery() {
    db.query("SELECT * FROM department", (err, results) => {
        if (err){
            console.log(err);
        }
    let departmentArray = results.map((dpts) => ({
      name:dpts.department_name,
      value: dpts.id,  
    }));
    inquirer.prompt ([{
      type:"input",
      name:"newRoleName",
      message: "Add a new role here", 
    },
    {
      type:"input",
      name:"newRoleSalary",
      message: "Add a new role salary here",

    },

    {
        type:"list",
        name:"newRoleDept",
        message: "Add a new role Department here",
        choices: departmentArray,
    },
])
.then((answers) => {
    db.query(
        "INSERT INTO role SET ?",
        {
            title: answers.newRoleName,
            salary: answere.newRoleSalary,
            department_id: answers.newRoleDept,
        },
    (err, results) => {
        if (err){
            console.log(err);
        }
        console.log(`${answers.newRoleName} was added`);
        askQuestions();
    }  
   );
  });
});
}

sync function addEmployee() {
    let addNewQuery = 
    "SELECT role.title, CONCAT(m.first_name, SPACE(1), m.last_name) AS Manager, express.role_id, e.manager_id FROM employee e INNER JOIN role ON role.id = e.role_id LEFT JOIN employee m ON m.employee_id = e.manager_id";
    db.query(addNewQuery, (err, results)=> {
        if (err) {
            console.log(err);
        }
    let roleArray = results.map((roleList) => ({
        name: roleList.title,
        value: roleList.role_id,
    }));
    let managerArray = results.map((managerList) => ({
        name: managerList.Manager,
        value: managerList.manager_id,
    }));

    inquirer.prompt([
      { type: "input",
        name: "addFirstName",
        message: "Add a first name here", 
      },
      {
        type:"input",
        name:"addLastName",
        message: "Add a last name here",
  
      },
  
      {
          type:"list",
          name:"newRole",
          message: "Add a new role here",
          choices: roleArray,
      },
      {
        type:"list",
        name:"newMgr",
        message: "Add a new Manager here",
        choices: managerArray,
    },
    ])
    
    .then((answers) => {
        db.query(
        "INSERT INTO employee SET ?",
       {
           first_name: answers.addFirstName,
           last_name: answers.addLastName,
           role_id: answers.addNewEmpRole,
           manager_id: answers.addNewEmpMan,
       }, 
       (err, results) => {
           if (err) {
               console.log(err);
           }
           console.log(`${answers.addFirstName} was added `);
           askQuestions();
       }
    );
    });
    });
}
function updateRole() {
    db.query("SELECT * FROM role", (err, results)=> {
        if (err) {
            console.log(err);
        }
        let roleArray = results.map((roleList)=> ({
            name: roleList.title,
            value:roleList.id,
        }));
    db.query("SELECT * FROM employee", (err, results)=> {
        if (err) {
            console.log(err);
        }
        let empArray = results.map((empList)=> ({
            name: empList.first_name + "" + empList.last_name,
            value:empList.employee_id,
    }));
    console.log(empArray);
    inquirer.prompt([
        {
            type:"list",
            name:"employeeName",
            message: "Which record would you like to edit",
            choices: empArray,
        },
        {
          type:"list",
          name:"newRole",
          message: "Add a new role here",
          choices: roleArray,
      }, 
    ])
    .then((answers) => {
        db.query(
            "UPDATE employee SET ? WHERE ?",
            [
                {employee_id:answers.employeeName},
                {role_id: answers.newRole},

            ],
            (err, results)=> {
                if (err) {
                    console.log(err);
                }
                console.log("Employee updated");
                askQuestions();
            }
        );
    });
});
    });
}

async function deleteDepartment() {
    console.log("delete department done")
}

async function deleteRole() {
    console.log("delete Role done")
}

async function deleteEmployee() {
    console.log("delete Employee done")
}