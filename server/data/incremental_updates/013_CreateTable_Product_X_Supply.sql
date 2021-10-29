CREATE TABLE IF NOT EXISTS `PRODUCT_X_SUPPLY` (
    `id_product` int(11) NOT NULL,
    `id_supply` int(11) NOT NULL,
    `number_supply` int(11) NOT NULL,
    PRIMARY KEY (`id_product`, `id_supply`),
    KEY `FK__SUPPLIES` (`id_supply`),
    CONSTRAINT `FK__PRODUCTS` FOREIGN KEY (`id_product`) REFERENCES `PRODUCTS` (`id_product`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `FK__SUPPLIES` FOREIGN KEY (`id_supply`) REFERENCES `SUPPLIES` (`id_supply`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

INSERT INTO
    `DB_CHANGES`
VALUES
    (
        013,
        'Create Table',
        'Tabla de insumos por producto.'
    );