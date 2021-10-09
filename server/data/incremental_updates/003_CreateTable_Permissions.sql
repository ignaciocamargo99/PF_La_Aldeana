CREATE TABLE IF NOT EXISTS `PERMISSIONS` (
  `id_permission` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_permission`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

INSERT INTO
  `DB_CHANGES`
VALUES
  (
    003,
    'Create table',
    'Tabla de permisos.'
  );