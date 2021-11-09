CREATE TABLE IF NOT EXISTS `PRODUCTS` (
    `id_product` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
    `description` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `image` longblob DEFAULT NULL,
    `price` int(11) NOT NULL,
    `id_sector` int(11) NOT NULL,
    `id_product_type` int(11) NOT NULL,
    `active` tinyint(1) NOT NULL DEFAULT 1,
    `quantity_flavor` int(11) DEFAULT NULL,
    PRIMARY KEY (`id_product`),
    KEY `FK__SECTORS` (`id_sector`),
    KEY `FK__PRODUCT_TYPES` (`id_product_type`),
    CONSTRAINT `FK__PRODUCT_TYPES` FOREIGN KEY (`id_product_type`) REFERENCES `PRODUCT_TYPES` (`id_product_type`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `FK__SECTORS` FOREIGN KEY (`id_sector`) REFERENCES `SECTORS` (`id_sector`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

INSERT INTO
    `DB_CHANGES`
VALUES
    (
        008,
        'Create Table',
        'Tabla de productos.'
    );