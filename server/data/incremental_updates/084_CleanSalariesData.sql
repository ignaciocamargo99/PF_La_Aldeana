DELETE FROM HS_WORKED WHERE id_hs_worked > 0;
DELETE FROM DETAIL_SALARIES WHERE id_detail_salary > 0;
DELETE FROM SALARIES WHERE id_salary > 0;
UPDATE INSTALLMENTS
	SET pay=0
	WHERE nroDNI>0;
UPDATE ADVANCES
	SET pay=0
	WHERE nroDNI>0;

INSERT INTO
  `DB_CHANGES`
VALUES
  (
    084,
    'Delete',
    'Limpieza de todos los datos de salarios de Salarios.'
  );