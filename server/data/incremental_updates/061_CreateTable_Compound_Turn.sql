CREATE TABLE `COMPOUND_TURNS` (
	`id` INT(11) NOT NULL,
	`name` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci',
	`abbreviation` VARCHAR(2) NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_unicode_ci' ENGINE=InnoDB;

INSERT INTO
  `DB_CHANGES`
VALUES
  (
    061,
    'Create table',
    'Tabla de turnos compuestos.'
  );
