CREATE TABLE IF NOT EXISTS `PRODUCTIONS` (
    `date_production` date NOT NULL,
    `id_flavor` int(11) NOT NULL,
    `quantity` int(11) NOT NULL,
    PRIMARY KEY (`date_production`, `id_flavor`),
    KEY `FK_PRODUCTIONS_FLAVORS` (`id_flavor`),
    CONSTRAINT `FK_PRODUCTIONS_FLAVORS` FOREIGN KEY (`id_flavor`) REFERENCES `FLAVORS` (`id_flavor`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

INSERT INTO
    `DB_CHANGES`
VALUES
    (
        017,
        'Create table',
        'Tabla de producciones.'
    );