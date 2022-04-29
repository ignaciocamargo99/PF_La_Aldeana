CREATE TABLE m6aacureuqp9xsmy.SALARIES (
	id_salary INT NOT NULL,
	dni_employee BIGINT NOT NULL,
	month_year DATE NOT NULL,
	id_state INT NOT NULL,
	salary_hs BIGINT NULL,
	subtotal BIGINT NOT NULL,
	total BIGINT NULL,
	CONSTRAINT SALARIES_PK PRIMARY KEY (id_salary),
	CONSTRAINT SALARIES_FK FOREIGN KEY (dni_employee) REFERENCES m6aacureuqp9xsmy.EMPLOYEES(dni)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;


INSERT INTO
  `DB_CHANGES`
VALUES
  (
    048,
    'Create table',
    'Tabla de Salarios.'
  );