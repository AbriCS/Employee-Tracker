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
 (1, "Nurse", 30000, 2),
 (2, "Doctor", 60000, 2),
 (3, "Scientist", 40000, 4),
 (4, "Porter", 20000, 1),
 (5, "Receptionist", 15000, 1),
 (6, "Security", 10000, 1),
 (7, "Nurse", 35000, 5),
 (8, "Caterer", 16400, 1),
 (9, "Lecturer", 70000, 6),
 (10, "Clincal Manager", 100000, 3),
 (11, "Operational Manager", 100000, 3),
 (12, "Radiographer", 40000, 4),

 INSERT INTO
 employee (employee_id, first_name, last_name, role_id, manager_id)

 VALUES
 (1, "Lucy", "Lui", 1, 10),
 (2, "Janet", "Jackson", 2, 10),
 (3, "Susan", "Stanhope", 3, 2),
 (4, "Michael", "Jordan", 4, 11),
 (5, "Mary", "Yram", 5, 7),
 (6, "Sidney", "Klein", 6, 11),
 (7, "Joseph", "Constable", 7, 1),
 (8, "Heather", "Smith", 8, 11),
 (9, "Fern", "Cantor", 9, 1),
 (10, "Lee", "Smith", 10, NULL),
 (11, "Helen", "Oxford", 11, 10),
 (12, "Mary", "Smith", 12, 2),


 