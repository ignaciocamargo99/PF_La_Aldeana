UPDATE CONCEPTS
	SET predictive=1
	WHERE id_concept=6;

INSERT INTO
    `DB_CHANGES`
VALUES
    (
        082,
        'update',
        'Correción de elementos de tabla Conceptos'
    );