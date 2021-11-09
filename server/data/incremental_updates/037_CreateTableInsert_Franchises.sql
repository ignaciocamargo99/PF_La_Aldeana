CREATE TABLE IF NOT EXISTS `FRANCHISES` (
	`id_franchise` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
	`city` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
	`address` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
	`address_number` int(11) NOT NULL,
	`province` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
	`name_manager` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
	`last_name_manager` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
	`dni_manager` int(11) NOT NULL,
	`start_date` date NOT NULL,
	PRIMARY KEY (`id_franchise`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

INSERT INTO
	`FRANCHISES` (
		`name`,
		`city`,
		`address`,
		`address_number`,
		`province`,
		`name_manager`,
		`last_name_manager`,
		`dni_manager`,
		`start_date`
	)
VALUES
	(
		'Helados La Aldeana La Tordilla',
		'La Tordilla',
		'Av. Libertador',
		1281,
		'Córdoba',
		'Mauricio Emanuel',
		'Carnero',
		35676669,
		'2021-10-01'
	),
	(
		'Helados La Aldeana Santa Rosa de Río Primero',
		'Santa Rosa de Río Primero',
		'Congreso esq. I. L. R. García',
		1,
		'Córdoba',
		'Celeste Ailen',
		'Simonelli',
		43133827,
		'2021-10-01'
	);

INSERT INTO
	`DB_CHANGES`
VALUES
	(
		037,
		'Create Table and Insert',
		'Tabla franquicias y dos registros.'
	);