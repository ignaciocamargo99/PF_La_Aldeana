RENAME TABLE m6aacureuqp9xsmy.CONCEPT TO m6aacureuqp9xsmy.CONCEPTS;

INSERT INTO m6aacureuqp9xsmy.CONCEPTS (name,predictive) VALUES
	 ('Hs Lunes a Viernes',0),
	 ('Hs Sabado y Domingo',0),
	 ('Hs Feriados Lunes a Viernes',0),
	 ('Hs Feriados Sabado y Domingo',0),
	 ('Hs Franco Trabajado',0),
	 ('Recibo',0),
	 ('Descuentos',0),
	 ('Anticipos',0),
	 ('Vacaciones 2020 según recibo',1),
	 ('Vacaciones 2020 trabajadas',1);
INSERT INTO m6aacureuqp9xsmy.CONCEPTS (name,predictive) VALUES
	 ('SAC 1*cta 2021 según recibo',1),
	 ('SAC 1*cta 2021 Negro',0),
	 ('Adicional x Temporada',1);

INSERT INTO
  `DB_CHANGES`
VALUES
  (
    056,
    'Insert',
    'Varios registros de Conceptos y pasar a plural nombre de tabla.'
  );