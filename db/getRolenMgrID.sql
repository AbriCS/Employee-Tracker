SELECT role.title, CONCAT(m.first_name, SPACE(1), m.last_name) AS Manager, e.role_id
FROM employee e
INNER JOIN role ON role.id = e.role_id
LEFT JOIN employee m ON
m.employee_id = e.manager_id
