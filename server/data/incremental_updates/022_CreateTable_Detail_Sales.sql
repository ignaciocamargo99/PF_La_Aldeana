CREATE TABLE IF NOT EXISTS `DETAIL_SALES` (
    `id_detail_sale` int(11) NOT NULL,
    `id_sale` int(11) NOT NULL,
    `id_product` int(11) NOT NULL,
    `quantity` int(11) NOT NULL,
    `subtotal` int(11) NOT NULL,
    PRIMARY KEY (`id_detail_sale`, `id_sale`) USING BTREE,
    KEY `FK_DETAIL_SALES_PRODUCTS` (`id_product`),
    KEY `FK_DETAIL_SALES_SALES` (`id_sale`),
    CONSTRAINT `FK_DETAIL_SALES_PRODUCTS` FOREIGN KEY (`id_product`) REFERENCES `PRODUCTS` (`id_product`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `FK_DETAIL_SALES_SALES` FOREIGN KEY (`id_sale`) REFERENCES `SALES` (`id_sale`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

INSERT INTO
    `DB_CHANGES`
VALUES
    (
        022,
        'Create table',
        'Tabla de detalles de ventas.'
    );