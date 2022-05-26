SELECT CONCAT(m.first_name, SPACE(1), m.last_name)  AS Manager, CONCAT(e.first_name, SPACE(1), e.last_name) AS EmployeeName, role.title AS "Job Title"
FROM employee e
INNER JOIN role ON role.id = e.role_id
INNER JOIN employee m ON
m.employee_id = e.manager_id