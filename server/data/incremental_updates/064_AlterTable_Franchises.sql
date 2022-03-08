ALTER TABLE FRANCHISES ADD active BIT NOT NULL;
UPDATE FRANCHISES SET active = 1;

INSERT INTO
`DB_CHANGES`
VALUES
    (
        064,
        'Alter table',
        'Nueva columna active para borrado lógico y actualización en registros.'
    );