CREATE TABLE IF NOT EXISTS `SECTORS` (
  `id_sector` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_sector`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

INSERT INTO
  `SECTORS` (`id_sector`, `name`, `description`)
VALUES
  (
    1,
    'Heladería',
    'Comprende los productos de Heladería'
  ),
  (
    2,
    'Cafetería',
    'Comprende los productos de Cafetería'
  );

INSERT INTO
  `DB_CHANGES`
VALUES
  (
    006,
    'Create Table and Insert',
    'Tabla de rubros con rubros Heladería y Cafetería.'
  );