CREATE TABLE IF NOT EXISTS `EMPLOYMENT_RELATIONSHIP` (
	`id_employee_relationship` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
	`description` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
	PRIMARY KEY (`id_employee_relationship`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

INSERT INTO
	`EMPLOYMENT_RELATIONSHIP` (`name`, `description`)
VALUES
	('Relación de dependencia', 'Está con recibo de sueldo'),
	('Monotributista', 'No está con recibo de sueldo');

INSERT INTO
	`DB_CHANGES`
VALUES
	(
		039,
		'Create Table and Insert',
		'Tabla de relación laboral y dos registros cargados.'
	);