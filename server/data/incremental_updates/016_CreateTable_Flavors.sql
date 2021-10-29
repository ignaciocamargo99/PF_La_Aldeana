CREATE TABLE IF NOT EXISTS `FLAVORS` (
    `id_flavor` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
    `description` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `type_flavor` int(11) NOT NULL,
    `family_flavor` int(11) NOT NULL,
    `stock` int(11) NOT NULL,
    `reorder_stock` int(11) DEFAULT NULL,
    `price` int(11) NOT NULL,
    `active` tinyint(4) NOT NULL DEFAULT 1,
    PRIMARY KEY (`id_flavor`),
    KEY `FK_FLAVOR_FAMILY_FLAVOR` (`family_flavor`),
    KEY `FK_FLAVOR_TYPES` (`type_flavor`),
    CONSTRAINT `FK__FLAVORS__FLAVOR_FAMILIES` FOREIGN KEY (`family_flavor`) REFERENCES `FLAVOR_FAMILIES` (`id_family_flavor`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `FK__FLAVORS__FLAVOR_TYPES` FOREIGN KEY (`type_flavor`) REFERENCES `FLAVOR_TYPES` (`id_type_flavor`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

INSERT INTO
    `DB_CHANGES`
VALUES
    (
        016,
        'Create table',
        'Tabla de sabores.'
    );