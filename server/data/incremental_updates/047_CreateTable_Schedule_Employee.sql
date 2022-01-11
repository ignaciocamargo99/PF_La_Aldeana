CREATE TABLE `DJ_EMPLOYEE` (
	`date` DATE NOT NULL,
	`employee_dni` BIGINT(20) NOT NULL DEFAULT '0',
	`id_compound_turn` INT(11) NOT NULL,
	PRIMARY KEY (`date`, `employee_dni`) USING BTREE,
	INDEX `FK_Dni_Employee` (`employee_dni`) USING BTREE,
	INDEX `FK_Comp_Turn` (`id_compound_turn`) USING BTREE,
	CONSTRAINT `FK_Comp_Turn` FOREIGN KEY (`id_compound_turn`) REFERENCES `m6aacureuqp9xsmy`.`COMPOUND_TURNS` (`id_compound_turn`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `FK_Dni_Employee` FOREIGN KEY (`employee_dni`) REFERENCES `m6aacureuqp9xsmy`.`EMPLOYEES` (`dni`) ON UPDATE NO ACTION ON DELETE NO ACTION
)COLLATE='utf8mb4_unicode_ci' ENGINE=InnoDB;

INSERT INTO
  `DB_CHANGES`
VALUES
  (
    047,
    'Create table',
    'Tabla de dia de trabajo de empleado.'
  );