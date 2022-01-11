CREATE TABLE `COMPOUND_TURNS_X_TURNS` (
	`id_compound_turn` INT(11) NOT NULL,
	`id_turn` INT(11) NOT NULL,
	PRIMARY KEY (`id_compound_turn`, `id_turn`) USING BTREE,
	INDEX `FK_Turn` (`id_turn`) USING BTREE,
	INDEX `FK_Compound_Turn` (`id_compound_turn`) USING BTREE,
	CONSTRAINT `FK_Compound_Turn` FOREIGN KEY (`id_compound_turn`) REFERENCES `m6aacureuqp9xsmy`.`COMPOUND_TURNS` (`id_compound_turn`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `FK_Turn` FOREIGN KEY (`id_turn`) REFERENCES `m6aacureuqp9xsmy`.`TURNS` (`id_turn`) ON UPDATE NO ACTION ON DELETE NO ACTION
)COLLATE='utf8mb4_unicode_ci' ENGINE=InnoDB;

INSERT INTO
  `DB_CHANGES`
VALUES
  (
    046,
    'Create table',
    'Tabla de turnos compuestos x turnos.'
  );