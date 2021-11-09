CREATE TABLE IF NOT EXISTS `PRODUCT_TYPES` (
  `id_product_type` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `id_sector` int(11) NOT NULL,
  PRIMARY KEY (`id_product_type`),
  KEY `FK__PRODUCT_TYPES__SECTORS` (`id_sector`),
  CONSTRAINT `FK__PRODUCT_TYPES__SECTORS` FOREIGN KEY (`id_sector`) REFERENCES `SECTORS` (`id_sector`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

INSERT INTO
  `DB_CHANGES`
VALUES
  (
    007,
    'Create Table',
    'Tabla de tipos de producto.'
  );