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
		39823445,
		'Verónica Soledad',
		'Gutierrez',
		'2019-03-04',
		@ID_EMPLOYMENT_RELATIONSHIP_M,
		@ID_CHARGES_M
	),
	(
		39825149,
		'Yamila',
		'Camusso',
		'2018-10-02',
		@ID_EMPLOYMENT_RELATIONSHIP_M,
		@ID_CHARGES_M
	),
	(
		42768157,
		'Melani Estefania',
		'Gaetan',
		'2019-07-27',
		@ID_EMPLOYMENT_RELATIONSHIP_M,
		@ID_CHARGES_D
	),
	(
		35258250,
		'Jonathan David',
		'Olivera',
		'2018-11-14',
		@ID_EMPLOYMENT_RELATIONSHIP_M,
		@ID_CHARGES_P
	),
	(
		37439317,
		'Dalma Belén',
		'Pavón',
		'2020-02-07',
		@ID_EMPLOYMENT_RELATIONSHIP_M,
		@ID_CHARGES_M
	),
	(
		43369244,
		'Luz',
		'Gudiño',
		'2021-08-20',
		@ID_EMPLOYMENT_RELATIONSHIP_M,
		@ID_CHARGES_M
	),
	(
		42338879,
		'Sofía',
		'Bergonzo',
		'2021-08-28',
		@ID_EMPLOYMENT_RELATIONSHIP_M,
		@ID_CHARGES_M
	),
	(
		41483552,
		'Malena',
		'Sterren',
		'2021-10-29',
		@ID_EMPLOYMENT_RELATIONSHIP_M,
		@ID_CHARGES_M
	),
	(
		42442138,
		'Agustina',
		'Bassano',
		'2018-12-01',
		@ID_EMPLOYMENT_RELATIONSHIP_M,
		@ID_CHARGES_C
	);

INSERT INTO
	`DB_CHANGES`
VALUES
	(
		041,
		'Insert',
		'Registro de 9 empleados más.'
	);