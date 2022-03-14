ALTER TABLE ROL_X_PERMISSION ADD id_access INT(11) NOT NULL;
UPDATE ROL_X_PERMISSION SET id_access = 1;
ALTER TABLE ROL_X_PERMISSION ADD CONSTRAINT `FK_ROL_X_PERMISSION_ACCESSES` FOREIGN KEY (`id_access`) REFERENCES `ACCESSES` (`id_access`) ON UPDATE NO ACTION ON DELETE NO ACTION;

-- INSERT INTO
-- `DB_CHANGES`
-- VALUES
--     (
--         068,
--         'Alter table',
--         'Nueva columna active para borrado lógico y actualización en registros.'
--     );