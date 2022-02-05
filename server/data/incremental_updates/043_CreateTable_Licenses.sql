CREATE TABLE `LICENSES` (
	`id_license` INT(11) NOT NULL AUTO_INCREMENT,
	`date_init` DATE NOT NULL,
	`date_finish` DATE NOT NULL,
	`dni_employee` BIGINT(20) NOT NULL DEFAULT '0',
	`reason` VARCHAR(200) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`active` INT(11) NOT NULL DEFAULT '1',
	PRIMARY KEY (`id_license`) USING BTREE,
	INDEX `dni_employee` (`dni_employee`) USING BTREE,
	CONSTRAINT `LICENSES_ibfk_1` FOREIGN KEY (`dni_employee`) REFERENCES `EMPLOYEES` (`dni`) ON UPDATE RESTRICT ON DELETE RESTRICT,
	CONSTRAINT `CHK_dni_employee` CHECK (octet_length(`dni_employee`) = 8),
	CONSTRAINT `CHK_date_finish` CHECK (`date_finish` >= `date_init`)
) COLLATE = 'utf8mb4_unicode_ci' ENGINE = InnoDB AUTO_INCREMENT = 56;

INSERT INTO
	`DB_CHANGES`
VALUES
	(
		043,
		'Create table',
		'Tabla de licencias.'
	);