CREATE TABLE IF NOT EXISTS `SALES` (
    `id_sale` int(11) NOT NULL AUTO_INCREMENT,
    `date_hour` datetime NOT NULL,
    `total_amount` bigint(20) unsigned NOT NULL,
    `id_pay_type` int(11) NOT NULL,
    `cellphone_client` bigint(20) DEFAULT NULL,
    PRIMARY KEY (`id_sale`),
    KEY `FK_SALES_PAY_TYPES` (`id_pay_type`) USING BTREE,
    KEY `cellphone_client` (`cellphone_client`),
    CONSTRAINT `FK_SALES_PAY_TYPES` FOREIGN KEY (`id_pay_type`) REFERENCES `PAY_TYPES` (`id_pay_type`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `SALES_ibfk_1` FOREIGN KEY (`cellphone_client`) REFERENCES `CLIENTS` (`cellphone`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

INSERT INTO
    `DB_CHANGES`
VALUES
    (
        021,
        'Create table',
        'Tabla de ventas.'
    );