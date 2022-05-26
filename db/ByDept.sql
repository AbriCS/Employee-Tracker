SELECT department.department_name AS department, role.title, employee.employee_id, employee.first_name, employee.last_name
FROM employee
LEFT JOIN  role ON (role.id = employee.role_id)
LEFT JOIN department ON (department.id = role.department_id)