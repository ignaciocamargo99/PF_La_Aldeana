INSERT INTO
    `ACCESSES` (`name_access`, `description`)
VALUES
    ('Ver', 'Los usuarios pueden ver/consultar las funcionalidades'),
    ('Ver/Registrar', 'Los usuarios pueden ver y registrar las funcionalidades'),
    ('Todos', 'Los usuarios pueden ver, registrar, editar y eliminar las funcionalidades');

INSERT INTO
    `DB_CHANGES`
VALUES
    (
        067,
        'Insert',
        'Accesos registrar, ver, editar y eliminar.'
    );