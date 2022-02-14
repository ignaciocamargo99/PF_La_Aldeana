CREATE TABLE `COMPOUND_TURNS_X_TURNS` (
	`id_compound_turn` INT(11) NOT NULL,
	`id_turn` INT(11) NOT NULL,
	PRIMARY KEY (`id_compound_turn`, `id_turn`) USING BTREE,
	INDEX `FK_COMPOUND_TURNS_X_TURNS_TURN` (`id_turn`) USING BTREE,
	CONSTRAINT `FK_COMPOUND_TURNS_X_TURNS_COMPOUND_TURN` FOREIGN KEY (`id_compound_turn`) REFERENCES `m6aacureuqp9xsmy`.`COMPOUND_TURNS` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `FK_COMPOUND_TURNS_X_TURNS_TURN` FOREIGN KEY (`id_turn`) REFERENCES `m6aacureuqp9xsmy`.`TURNS` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
) COLLATE='utf8mb4_unicode_ci' ENGINE=InnoDB ;

INSERT INTO
  `DB_CHANGES`
VALUES
  (
    062,
    'Create table',
    'Tabla de relacion de turnos compuestos con los simples.'
  );