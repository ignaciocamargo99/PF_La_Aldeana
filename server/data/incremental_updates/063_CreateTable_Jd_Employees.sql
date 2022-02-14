CREATE TABLE `JD_EMPLOYEES` (
	`date` DATE NOT NULL,
	`employee_dni` BIGINT(20) NOT NULL,
	`id_compound_turn` INT(11) NOT NULL,
	PRIMARY KEY (`date`, `employee_dni`) USING BTREE,
	INDEX `FK_Id_turn` (`id_compound_turn`) USING BTREE,
	INDEX `FK_JD_EMPLOYEES_EMPLOYEE_DNI` (`employee_dni`) USING BTREE,
	CONSTRAINT `FK_JD_EMPLOYEES_COMPOUND_TURNS` FOREIGN KEY (`id_compound_turn`) REFERENCES `m6aacureuqp9xsmy`.`COMPOUND_TURNS` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `FK_JD_EMPLOYEES_EMPLOYEE_DNI` FOREIGN KEY (`employee_dni`) REFERENCES `m6aacureuqp9xsmy`.`EMPLOYEES` (`dni`) ON UPDATE NO ACTION ON DELETE NO ACTION
)COLLATE='utf8mb4_unicode_ci' ENGINE=InnoDB;

INSERT INTO
  `DB_CHANGES`
VALUES
  (
    063,
    'Create table',
    'Tabla de dia trabajado de empleado.'
  );