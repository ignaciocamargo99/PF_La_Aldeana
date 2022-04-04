CREATE TABLE IF NOT EXISTS `ACCESSES` (
    `id_access` int(11) NOT NULL AUTO_INCREMENT,
    `name_access` VARCHAR(200) NOT NULL,
    `description` VARCHAR(200),
    PRIMARY KEY (`id_access`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

INSERT INTO
    `DB_CHANGES`
VALUES
    (
        066,
        'Create table',
        'Tabla de accesos de lectura, escritura, edición y eliminación.'
    );
    
    
    