CREATE TABLE `TURNS` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NOT NULL DEFAULT '' COLLATE 'utf8mb4_unicode_ci',
	`abbreviation` VARCHAR(3) NOT NULL DEFAULT '' COLLATE 'utf8mb4_unicode_ci',
	`init_time` TIME NOT NULL,
	`finish_time` TIME NOT NULL,
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_unicode_ci' ENGINE=InnoDB AUTO_INCREMENT=10 ;

INSERT INTO
  `DB_CHANGES`
VALUES
  (
    044,
    'Create table',
    'Tabla de turnos.'
  );
