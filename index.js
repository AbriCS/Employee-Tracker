const inquirer = require("inquirer");
const db = require ("./db/connection.js")
require("console.table")

async function askQuestions () {
   inquirer.prompt([{
       type:"list",
       name: "options",
       message: "what would you like to do?",
       choices: ["View all departments", "View all roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an employee role", "Exit"]
   }   
   ])

   .then ((answer)=>{
       switch(answer.options){
        case "View all departments": 
        viewAllDepartments();
        break;
         
        case "View all roles":
            viewAllRoles();
        break;

        case "View All Employees":
            viewAllEmployees();
        break;
        case "Add a Department":
            addDepartment();
    break;
        case "Add a Role":
            addRole();
    break;
    case "Add a employee":
            addEmployee();
    break;
    case "Update an employee role":
            ChangeRole();
    break;
    default:
        db.end()
       }

   })
}
askQuestions ()

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
        "SELECT * FROM roles LEFT JOIN department ON roles.department_id = department.id",
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
    
    db.query(`SELECT * FROM employee LEFT JOIN roles ON employee.role_id = roles.id`, (err, results) => {
        if (err) {
            console.log(err);
        } console.table(results);
        askQuestions();
    });
}
async function addDepartment() { 
    inquirer.prompt([{
       type:"input",
       name: "addDepartment",
       message: "what is the department you would like to add?"
    }]).then ((answer)=>{
    const query =`INSERT INTO department(name) VALUES (?)`
    db.query(
        query, answer.addDepartment,
        (err, results) => {
            if (err) {
                console.log(err);
            }
            console.log(`${answer.addDepartment} new department added!`);
            viewAllDepartments();
        }
    );
    })
    
    
    
}

async function addRole() {
    db.query("SELECT * FROM department", (err, results) => {
        if (err){
            console.log(err);
        }
    let departmentArray = results.map((dpts) => ({
      name:dpts.name,
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
        "INSERT INTO roles SET ?",
        {
            title: answers.newRoleName,
            salary: answers.newRoleSalary,
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

async function addEmployee() {
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