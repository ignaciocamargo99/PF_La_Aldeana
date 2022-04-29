CREATE TABLE m6aacureuqp9xsmy.HS_TYPES (
	id_hs_type INT auto_increment NOT NULL,
	name varchar(100) NOT NULL,
	description varchar(100) NULL,
	amount BIGINT NOT NULL,
	CONSTRAINT HS_TYPES_PK PRIMARY KEY (id_hs_type)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;


INSERT INTO
  `DB_CHANGES`
VALUES
  (
    053,
    'Create table',
    'Tabla de Tipos de Horas.'
  );