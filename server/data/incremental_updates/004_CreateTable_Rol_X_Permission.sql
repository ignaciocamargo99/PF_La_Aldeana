CREATE TABLE IF NOT EXISTS `ROL_X_PERMISSION` (
  `id_rol` int(11) NOT NULL,
  `id_permission` int(11) NOT NULL,
  PRIMARY KEY (`id_rol`, `id_permission`),
  KEY `FK__PERMISSION` (`id_permission`),
  CONSTRAINT `FK__PERMISSION` FOREIGN KEY (`id_permission`) REFERENCES `PERMISSIONS` (`id_permission`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK__ROL` FOREIGN KEY (`id_rol`) REFERENCES `ROLES` (`id_rol`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

INSERT INTO
  `DB_CHANGES`
VALUES
  (
    004,
    'Create table',
    'Tabla de permisos por rol.'
  );