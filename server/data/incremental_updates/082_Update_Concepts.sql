UPDATE CONCEPTS
	SET predictive=1
	WHERE id_concept=6;
UPDATE CONCEPTS
	SET name='SAC 1*cta 2021 monotributista'
	WHERE id_concept=12;
UPDATE CONCEPTS
	SET name='Adelantos'
	WHERE id_concept=8;
UPDATE CONCEPTS
	SET name='Anticipos'
	WHERE id_concept=37;
UPDATE CONCEPTS
	SET predictive=0
	WHERE id_concept=6;
INSERT INTO CONCEPTS (id_concept,name,predictive)
	VALUES (14,'Otro',1);

INSERT INTO
    `DB_CHANGES`
VALUES
    (
        082,
        'update',
        'Correción de elementos de tabla Conceptos'
    );