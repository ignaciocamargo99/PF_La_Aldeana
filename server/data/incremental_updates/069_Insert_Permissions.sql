INSERT INTO PERMISSIONS VALUES (NULL, 'Usuarios', 'Módulo de usuarios');
INSERT INTO PERMISSIONS VALUES (NULL, 'Reportes Ventas', 'Módulo de reportes');
UPDATE PERMISSIONS SET name = 'Reportes Recursos Humanos', description = 'Módulo de reportes' WHERE id_permission = 1

INSERT INTO
`DB_CHANGES`
VALUES
    (
        069,
        'Insert table',
        'Nuevos registros de permisos.'
    );