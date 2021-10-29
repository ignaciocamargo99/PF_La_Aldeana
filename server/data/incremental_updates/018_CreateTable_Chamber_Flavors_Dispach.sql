CREATE TABLE IF NOT EXISTS `CHAMBER_FLAVORS_DISPATCH` (
    `id_chamber_flavors` int(11) NOT NULL AUTO_INCREMENT,
    `date_dispatch` date NOT NULL,
    `id_flavor` int(11) NOT NULL,
    `amount` int(11) NOT NULL,
    PRIMARY KEY (`id_chamber_flavors`) USING BTREE,
    KEY `id_product` (`id_flavor`),
    CONSTRAINT `fk_id_flavor` FOREIGN KEY (`id_flavor`) REFERENCES `FLAVORS` (`id_flavor`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

INSERT INTO
    `DB_CHANGES`
VALUES
    (
        018,
        'Create table',
        'Tabla de salida de sabores de cámara.'
    );