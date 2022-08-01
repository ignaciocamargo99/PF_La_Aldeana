ALTER TABLE DETAIL_SALARIES ADD name varchar(100) NULL;

INSERT INTO
  `DB_CHANGES`
VALUES
  (
    083,
    'Alter table',
    'Nuevo campo nombre en tabla de Detalle de Salarios.'
  );