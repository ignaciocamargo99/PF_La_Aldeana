CREATE TABLE m6aacureuqp9xsmy.CONCEPT (
	id_concept INT auto_increment NOT NULL,
	name varchar(100) NOT NULL,
	predictive INT DEFAULT 1 NOT NULL,
	CONSTRAINT CONCEPT_PK PRIMARY KEY (id_concept)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

INSERT INTO
  `DB_CHANGES`
VALUES
  (
    051,
    'Create table',
    'Tabla de Conceptos.'
  );