CREATE TABLE IF NOT EXISTS `CHARGES` (
	`id_charge` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
	`description` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
	PRIMARY KEY (`id_charge`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

INSERT INTO
	`CHARGES` (`name`, `description`)
VALUES
	('Cajera/o', 'Se encarga de realizar los cobros en efectivo y con tarjetas, además de atender al público'),
	('Dependiente de Mostrador', 'Se encarga de preparar los pedidos de los clientes'),
	('Delivery', 'Se encarga de llevar los pedidos de delivery'),
	('Producción', 'Se encarga de colaborar con la producción');

INSERT INTO
	`DB_CHANGES`
VALUES
	(
		038,
		'Create Table and Insert',
		'Tabla cargos y cuatro registros.'
	);