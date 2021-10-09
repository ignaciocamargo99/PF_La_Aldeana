CREATE TABLE IF NOT EXISTS `ROLES` (
  `id_rol` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

INSERT INTO
  `DB_CHANGES`
VALUES
  (
    002,
    'Create table',
    'Tabla de roles.'
  );