INSERT INTO department(id, name)

VALUES 
(1, "Ops"),
(2, "Clinical")
(3, "Management")
(4, "Laboratories")
(5, "Research")
(6, "Education")

--6 department 12 roles, 12 employees
INSERT INTO
 role (id, title, salary, department_id,)

 VALUES
 (110, "Nurse", 30000, 2),
 (120, "Doctor", 60000, 2),
 (130, "Scientist", 40000, 4),
 (140, "Porter", 20000, 1),
 (150, "Receptionist", 15000, 1),
 (160, "Security", 10000, 1),
 (170, "Nurse", 35000, 5),
 (180, "Caterer", 16400, 1),
 (190, "Lecturer", 70000, 6),
 (201, "Clincal Manager", 100000, 3),
 (202, "Operational Manager", 100000, 3),

 INSERT INTO
 employee (employee_id, first_name, last_name, role_id, manager_id)

 VALUES
 (1001, "Lucy, Lui, 110, 201")
 (2001, "Janet, Jackson, 120, 110")
 (3001, "Susan, Stanhope, 130, 120")
 (4001, "Michael, Jordan, 140, 120")
 (5001, "Mary, Yram, 150, 190")
 (6001, "Sidney, Klein, 160, 190")
 (7001, "Joseph, Constable, 170, 110")
 (8001, "Heather, Smith, 180, 170")
 (9001, "Fern, Cantor, 202, NULL")
 (1011, "Lee, Smith, 201, 9001")
 (2011, "Helen, Oxford, 110, 1011")
 (3011, "Mary, Smith, 190, 1011")


 