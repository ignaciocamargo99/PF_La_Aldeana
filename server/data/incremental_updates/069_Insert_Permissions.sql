INSERT INTO PERMISSIONS VALUES (NULL, 'Usuarios', 'Módulo de usuarios');
UPDATE PERMISSIONS SET name = 'Reportes Recursos Humanos', description = 'Módulo de reportes' WHERE id_permission = 1;
UPDATE PERMISSIONS SET name = 'Reportes Ventas', description = 'Módulo de reportes' WHERE id_permission = 6;

INSERT INTO
`DB_CHANGES`
VALUES
    (
        069,
        'Insert table',
        'Nuevos registros de permisos.'
    );