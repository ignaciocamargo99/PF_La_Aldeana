CREATE TABLE IF NOT EXISTS `PURCHASES_SUPPLIES` (
  `purchase_number` int(11) NOT NULL AUTO_INCREMENT,
  `purchase_date` date NOT NULL,
  `supplier` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`purchase_number`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

INSERT INTO
  `DB_CHANGES`
VALUES
  (
    009,
    'Create table',
    'Tabla de compras de insumos.'
  );