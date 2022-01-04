CREATE TABLE IF NOT EXISTS `DETAIL_PURCHASE_SUPPLIES` (
    `detail_number` int(11) NOT NULL,
    `purchase_number` int(11) NOT NULL,
    `id_supply` int(11) NOT NULL,
    `quantity` int(11) NOT NULL,
    `subtotal` int(11) NOT NULL,
    PRIMARY KEY (`detail_number`, `purchase_number`),
    KEY `FK_SUPPLY` (`id_supply`),
    KEY `FK_PURCHASE_NUMBER` (`purchase_number`),
    CONSTRAINT `FK_PURCHASE_NUMBER` FOREIGN KEY (`purchase_number`) REFERENCES `PURCHASES_SUPPLIES` (`purchase_number`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `FK_SUPPLY` FOREIGN KEY (`id_supply`) REFERENCES `SUPPLIES` (`id_supply`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

INSERT INTO
    `DB_CHANGES`
VALUES
    (
        012,
        'Create Table',
        'Tabla de detalle de compra de insumos.'
    );