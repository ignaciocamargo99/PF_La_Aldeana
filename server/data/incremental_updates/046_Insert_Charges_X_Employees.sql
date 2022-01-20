SET
    @ID_CHARGES_C = (
        SELECT
            id_charge
        FROM
            CHARGES
        WHERE
            NAME = 'Cajera/o'
    );

SET
    @ID_CHARGES_M = (
        SELECT
            id_charge
        FROM
            CHARGES
        WHERE
            NAME = 'Dependiente de Mostrador'
    );

SET
    @ID_CHARGES_D = (
        SELECT
            id_charge
        FROM
            CHARGES
        WHERE
            NAME = 'Delivery'
    );

SET
    @ID_CHARGES_P = (
        SELECT
            id_charge
        FROM
            CHARGES
        WHERE
            NAME = 'Producción'
    );

INSERT
    IGNORE INTO `CHARGES_X_EMPLOYEES` (`dni_employee`, `id_charge`)
VALUES
    (25042675, 1),
    (27174159, 1),
    (27521097, 1),
    (35258250, 3),
    (35258250, 4),
    (35655142, 2),
    (35655281, 2),
    (36173515, 3),
    (36173515, 4),
    (36185966, 1),
    (37321201, 2),
    (37439317, 2),
    (39472758, 2),
    (39612391, 2),
    (39612391, 3),
    (39823445, 2),
    (39825149, 2),
    (41483552, 2),
    (42338879, 2),
    (42442138, 1),
    (42768157, 2),
    (42768157, 3),
    (43369244, 2);

INSERT INTO
    `DB_CHANGES`
VALUES
    (
        046,
        'Insert',
        'Cargos por empleados.'
    );