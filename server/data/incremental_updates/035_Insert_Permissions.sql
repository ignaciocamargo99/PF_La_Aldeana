INSERT INTO
    `PERMISSIONS` (`name`, `description`)
VALUES
    ('Ventas', 'Módulo de ventas'),
    ('Compras', 'Módulo de compras'),
    ('Productos', 'Módulo de productos'),
    ('Producciones', 'Módulo de producción'),
    ('Franquicias', 'Módulo de franquicias'),
    ('Reportes', 'Módulo de reportes'),
    ('Empleados', 'Módulo de empleados');

INSERT INTO
    `DB_CHANGES`
VALUES
    (
        035,
        'Insert',
        'Varios registros de permisos existentes al momento.'
    );