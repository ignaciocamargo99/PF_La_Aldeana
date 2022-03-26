INSERT INTO
    ROL_X_PERMISSION
VALUES
    -- Administrador tiene accesos a todo...
    (1, 1, 1, 1),
    (1, 1, 2, 1),
    (1, 1, 3, 1),
    (1, 1, 4, 1),

    (1, 2, 1, 1),
    (1, 2, 2, 1),
    (1, 2, 3, 1),
    (1, 2, 4, 1),

    (1, 3, 1, 1),
    (1, 3, 2, 1),
    (1, 3, 3, 1),
    (1, 3, 4, 1),

    (1, 4, 1, 1),
    (1, 4, 2, 1),
    (1, 4, 3, 1),
    (1, 4, 4, 1),

    (1, 5, 1, 1),
    (1, 5, 2, 1),
    (1, 5, 3, 1),
    (1, 5, 4, 1),

    (1, 6, 1, 1),
    (1, 6, 2, 1),
    (1, 6, 3, 1),
    (1, 6, 4, 1),

    (1, 7, 1, 1),
    (1, 7, 2, 1),
    (1, 7, 3, 1),
    (1, 7, 4, 1),
    
    (1, 8, 1, 1),
    (1, 8, 2, 1),
    (1, 8, 3, 1),
    (1, 8, 4, 1),

    -- Empleados...
    (2, 1, 1, 0),
    (2, 1, 2, 0),
    (2, 1, 3, 0),
    (2, 1, 4, 0),

    (2, 2, 1, 0),
    (2, 2, 2, 0),
    (2, 2, 3, 0),
    (2, 2, 4, 0),

    (2, 3, 1, 0),
    (2, 3, 2, 1),
    (2, 3, 3, 0),
    (2, 3, 4, 0),

    (2, 4, 1, 0),
    (2, 4, 2, 1),
    (2, 4, 3, 0),
    (2, 4, 4, 0),

    (2, 5, 1, 0),
    (2, 5, 2, 1),
    (2, 5, 3, 0),
    (2, 5, 4, 0),

    (2, 6, 1, 0),
    (2, 6, 2, 0),
    (2, 6, 3, 0),
    (2, 6, 4, 0),

    (2, 7, 1, 0),
    (2, 7, 2, 1),
    (2, 7, 3, 0),
    (2, 7, 4, 0),

    (2, 8, 1, 0),
    (2, 8, 2, 0),
    (2, 8, 3, 0),
    (2, 8, 4, 0);


INSERT INTO
`DB_CHANGES`
VALUES
    (
        070,
        'Insert table',
        'Permisos por rol.'
    );