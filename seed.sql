DELETE FROM `employees_db`.`department`;
INSERT INTO `employees_db`.`department` (`id`, `name`) VALUES ('1', 'Sales');
INSERT INTO `employees_db`.`department` (`id`, `name`) VALUES ('2', 'Human Resources');
INSERT INTO `employees_db`.`department` (`id`, `name`) VALUES ('3', 'Accounting');

DELETE FROM `employees_db`.`role`;
INSERT INTO `employees_db`.`role` (`id`, `title`, `salary`, `department_id`) VALUES ('1','Accountant', '60000', '3');
INSERT INTO `employees_db`.`role` (`id`, `title`, `salary`, `department_id`) VALUES ('2', 'Salesman', '70000', '1');
INSERT INTO `employees_db`.`role` (`id`, `title`, `salary`, `department_id`) VALUES ('3', 'Representative', '40000', '2');


DELETE FROM `employees_db`.`employee`;
INSERT INTO `employees_db`.`employee` (`id`, `first_name`, `last_name`, `role_id`) VALUES ('12', 'Dwight', 'Schrute', '2');
INSERT INTO `employees_db`.`employee` (`id`, `first_name`, `last_name`, `role_id`) VALUES ('13', 'Oscar', 'Martinez', '1');
INSERT INTO `employees_db`.`employee` (`id`, `first_name`, `last_name`, `role_id`) VALUES ('14', 'Toby', 'Flenderson', '3');