CREATE TABLE m6aacureuqp9xsmy.SALARY_STATE (
	id_salary_state INT auto_increment NOT NULL,
	name varchar(100) NOT NULL,
	description varchar(100) NULL,
	CONSTRAINT SALARY_STATE_PK PRIMARY KEY (id_salary_state)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;


INSERT INTO
  `DB_CHANGES`
VALUES
  (
    049,
    'Create table',
    'Tabla de Estados de Salario.'
  );