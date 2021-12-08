CREATE TABLE IF NOT EXISTS `SUPPLY_TYPES` (
  `id_supply_type` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_supply_type`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

INSERT INTO
  `SUPPLY_TYPES` (`id_supply_type`, `name`, `description`)
VALUES
  (1, 'Descuento por Unidad', NULL),
  (2, 'Descuento por Lotes', NULL),
  (3, 'Sin Descuento', NULL);

INSERT INTO
  `DB_CHANGES`
VALUES
  (
    010,
    'Create table and insert',
    'Tabla de tipos de insumos con 3 tipos cargados.'
  );