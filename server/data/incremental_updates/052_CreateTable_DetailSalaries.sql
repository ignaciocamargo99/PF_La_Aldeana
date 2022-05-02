CREATE TABLE m6aacureuqp9xsmy.DETAIL_SALARIES (
	id_detail_salary INT auto_increment NOT NULL,
	id_salary INT NOT NULL,
	id_concept INT NOT NULL,
	amount BIGINT NOT NULL,
	positive INT DEFAULT 1 NOT NULL,
	CONSTRAINT DETAIL_SALARIES_PK PRIMARY KEY (id_detail_salary),
	CONSTRAINT DETAIL_SALARIES_FK FOREIGN KEY (id_salary) REFERENCES m6aacureuqp9xsmy.SALARIES(id_salary),
	CONSTRAINT DETAIL_SALARIES_FK_1 FOREIGN KEY (id_concept) REFERENCES m6aacureuqp9xsmy.CONCEPT(id_concept)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;


INSERT INTO
  `DB_CHANGES`
VALUES
  (
    052,
    'Create table',
    'Tabla de Detalle de Salarios.'
  );