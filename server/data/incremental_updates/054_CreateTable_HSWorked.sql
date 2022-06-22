CREATE TABLE m6aacureuqp9xsmy.HS_WORKED (
	id_hs_worked INT auto_increment NOT NULL,
	dni_employee BIGINT NOT NULL,
	month_year DATE NOT NULL,
	id_hs_type INT NOT NULL,
	hs_number INT NOT NULL,
	CONSTRAINT HS_WORKED_PK PRIMARY KEY (id_hs_worked),
	CONSTRAINT HS_WORKED_FK FOREIGN KEY (dni_employee) REFERENCES m6aacureuqp9xsmy.EMPLOYEES(dni),
	CONSTRAINT HS_WORKED_FK_1 FOREIGN KEY (id_hs_type) REFERENCES m6aacureuqp9xsmy.HS_TYPES(id_hs_type)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;


INSERT INTO
  `DB_CHANGES`
VALUES
  (
    054,
    'Create table',
    'Tabla de Horas Trabajadas.'
  );