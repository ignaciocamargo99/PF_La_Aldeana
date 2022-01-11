CREATE TABLE `TURNS` (
	`id_turn` INT(11) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`abbreviation` VARCHAR(2) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`time_init` TIME NOT NULL,
	`time_finish` TIME NOT NULL,
	PRIMARY KEY (`id_turn`) USING BTREE,
	CONSTRAINT `CHK_abbreviation` CHECK (octet_length(`abbreviation`) = 2)
)COLLATE='utf8mb4_unicode_ci' ENGINE=InnoDB;

INSERT INTO
  `DB_CHANGES`
VALUES
  (
    044,
    'Create table',
    'Tabla de turnos.'
  );