
INSERT INTO m6aacureuqp9xsmy.DB_CHANGES (id_change,change_type,description)
	VALUES (74,'Update','Actualización tipos viejos de relación de empleado');

UPDATE m6aacureuqp9xsmy.EMPLOYMENT_RELATIONSHIP
	SET name='Relación de dependencia 6 horas'
	WHERE id_employee_relationship=1;

