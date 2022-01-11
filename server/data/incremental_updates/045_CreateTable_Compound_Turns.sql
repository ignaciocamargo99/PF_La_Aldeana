CREATE TABLE `COMPOUND_TURNS` (
	`id_compound_turn` INT(11) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`abbreviation` VARCHAR(2) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	PRIMARY KEY (`id_compound_turn`) USING BTREE,
	CONSTRAINT `CHK_abbreviation` CHECK (octet_length(`abbreviation`) = 2)
)COLLATE='utf8mb4_unicode_ci' ENGINE=InnoDB;

INSERT INTO
  `DB_CHANGES`
VALUES
  (
    045,
    'Create table',
    'Tabla de turnos compuestos.'
  );