CREATE TABLE IF NOT EXISTS `EMPLOYEES` (
	`dni` bigint(20) NOT NULL,
	`name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
	`last_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
	`date_admission` date NOT NULL,
	`employment_relationship` int(11) NOT NULL,
	`charge` int(11) NOT NULL,
	`active` int(11) NOT NULL DEFAULT 1,
	PRIMARY KEY (`dni`),
	KEY `FK__EMPLOYEES__CHARGES` (`charge`),
	KEY `FK__EMPLOYEES__EMPLOYMENT_RELATIONSHIP` (`employment_relationship`),
	CONSTRAINT `FK__EMPLOYEES__CHARGES` FOREIGN KEY (`charge`) REFERENCES `CHARGES` (`id_charge`) ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT `FK__EMPLOYEES__EMPLOYMENT_RELATIONSHIP` FOREIGN KEY (`employment_relationship`) REFERENCES `EMPLOYMENT_RELATIONSHIP` (`id_employee_relationship`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

SET @ID_EMPLOYMENT_RELATIONSHIP_RD = (SELECT id_employee_relationship FROM EMPLOYMENT_RELATIONSHIP WHERE NAME = 'Relación de dependencia');
SET @ID_EMPLOYMENT_RELATIONSHIP_M = (SELECT id_employee_relationship FROM EMPLOYMENT_RELATIONSHIP WHERE NAME = 'Monotributista');

SET @ID_CHARGES_C = (SELECT id_charge FROM CHARGES WHERE NAME = 'Cajera/o');
SET @ID_CHARGES_M = (SELECT id_charge FROM CHARGES WHERE NAME = 'Dependiente de Mostrador');
SET @ID_CHARGES_D = (SELECT id_charge FROM CHARGES WHERE NAME = 'Delivery');
SET @ID_CHARGES_P = (SELECT id_charge FROM CHARGES WHERE NAME = 'Producción');

INSERT INTO
	`EMPLOYEES` (
		`dni`,
		`name`,
		`last_name`,
		`date_admission`,
		`employment_relationship`,
		`charge`	
	)
VALUES
	(
		25042675,
		'María Jose',
		'Gómez',
		'2003-02-01',
		@ID_EMPLOYMENT_RELATIONSHIP_RD,
		@ID_CHARGES_C
	),
	(
		27174159,
		'Silvana Soledad',
		'Carnero',
		'2005-03-01',
		@ID_EMPLOYMENT_RELATIONSHIP_RD,
		@ID_CHARGES_C
	),
	(
		27521097,
		'Liliana M.',
		'Quiroga',
		'2009-09-20',
		@ID_EMPLOYMENT_RELATIONSHIP_RD,
		@ID_CHARGES_C
	),
	(
		36185966,
		'Milena Noemi',
		'Capdevilla',
		'2010-10-16',
		@ID_EMPLOYMENT_RELATIONSHIP_RD,
		@ID_CHARGES_C
	),
	(
		35655281,
		'Cintia Noemi',
		'Olmos',
		'2012-09-10',
		@ID_EMPLOYMENT_RELATIONSHIP_RD,
		@ID_CHARGES_M
	),
	(
		37321201,
		'María Eugenia',
		'Olmos',
		'2012-11-20',
		@ID_EMPLOYMENT_RELATIONSHIP_RD,
		@ID_CHARGES_M
	),
	(
		35655142,
		'Sonia',
		'Mugna',
		'2015-08-20',
		@ID_EMPLOYMENT_RELATIONSHIP_M,
		@ID_CHARGES_M
	),
	(
		39472758,
		'Karen Alejandra',
		'Toledo',
		'2016-08-20',
		@ID_EMPLOYMENT_RELATIONSHIP_M,
		@ID_CHARGES_M
	),
	(
		39612391,
		'Betiana Magalí',
		'Gaetan',
		'2015-08-28',
		@ID_EMPLOYMENT_RELATIONSHIP_M,
		@ID_CHARGES_D
	),
	(
		36173515,
		'Adrián Marcelo',
		'Algarbe',
		'2020-11-28',
		@ID_EMPLOYMENT_RELATIONSHIP_M,
		@ID_CHARGES_P
	);

INSERT INTO
	`DB_CHANGES`
VALUES
	(
		040,
		'Create Table and Insert',
		'Tabla de empleados con 10 empleados cargados.'
	);