SELECT e.employee_id AS "Employee ID, e.first_name AS "First name", e.last_name AS "Last Name", role.title AS "Job Title", department.department_name AS "Department Name", role.salary AS " Salary", CONCAT(m.first_name, SPACE(1), m.last_name) AS Manager
FROM employee e
INNER JOIN role ON role.id = e.role_id
INNER JOIN employee m ON
m.employee_id = e.manager_id