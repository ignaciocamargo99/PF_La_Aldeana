CREATE TABLE IF NOT EXISTS `SUPPLIES` (
    `id_supply` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
    `description` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `id_supply_type` int(11) NOT NULL,
    `price_wholesale` int(11) DEFAULT NULL,
    `price_retail` int(11) DEFAULT NULL,
    `stock_lot` int(11) DEFAULT NULL,
    `stock_unit` int(11) DEFAULT NULL,
    `unit_x_lot` int(11) DEFAULT NULL,
    `active` tinyint(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (`id_supply`),
    KEY `FK_SUPPLIES_SUPPLY_TYPES` (`id_supply_type`),
    CONSTRAINT `FK_SUPPLIES_SUPPLY_TYPES` FOREIGN KEY (`id_supply_type`) REFERENCES `SUPPLY_TYPES` (`id_supply_type`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

INSERT INTO
    `DB_CHANGES`
VALUES
    (
        011,
        'Create Table',
        'Tabla de insumos.'
    );