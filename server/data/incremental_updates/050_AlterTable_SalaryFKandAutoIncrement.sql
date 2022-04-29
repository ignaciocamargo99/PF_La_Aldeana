ALTER TABLE m6aacureuqp9xsmy.SALARIES MODIFY COLUMN id_salary int(11) auto_increment NOT NULL;
ALTER TABLE m6aacureuqp9xsmy.SALARIES ADD CONSTRAINT SALARIES_FK_1 FOREIGN KEY (id_state) REFERENCES m6aacureuqp9xsmy.SALARY_STATE(id_salary_state);


INSERT INTO
  `DB_CHANGES`
VALUES
  (
    050,
    'Alter table',
    'FK con Estados de Salario y autoincremento de pk.'
  );