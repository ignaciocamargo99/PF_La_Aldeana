CREATE TABLE IF NOT EXISTS `PRODUCTIONS_X_FLAVORS` (
    `id_production` int(11) NOT NULL,
    `id_flavor` int(11) NOT NULL,
    `quantity` int(11) NOT NULL,
    PRIMARY KEY (`id_production`, `id_flavor`),
    KEY `FK_FLAVORS` (`id_flavor`),
    CONSTRAINT `FK_PRODUCTIONS_` FOREIGN KEY (`id_production`) REFERENCES `PRODUCTIONS` (`id_production`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `FK_FLAVORS` FOREIGN KEY (`id_flavor`) REFERENCES `FLAVORS` (`id_flavor`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

INSERT INTO
    `DB_CHANGES`
VALUES
    (
        059,
        'Create table',
        'Tabla de intermedia de producciones por sabores.'
    );
    
    
    