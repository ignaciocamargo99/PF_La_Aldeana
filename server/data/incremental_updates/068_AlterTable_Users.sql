ALTER TABLE
    USERS DROP FOREIGN KEY IF EXISTS FK_USERS_ROLES;

ALTER TABLE
    USERS DROP INDEX IF EXISTS FK_USERS_ROLES;

ALTER TABLE
    USERS DROP COLUMN IF EXISTS id_rol;


INSERT INTO
`DB_CHANGES`
VALUES
    (
        068,
        'Alter table',
        'Columna rol eliminada.'
    );