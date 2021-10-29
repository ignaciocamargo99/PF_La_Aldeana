INSERT INTO
  `FLAVORS` (
    `name`,
    `description`,
    `type_flavor`,
    `family_flavor`,
    `stock`,
    `price`
  )
VALUES
  (
    'Ananá',
    'Es una base de agua con saborizante de ananá y sembrado con trozos de ananá',
    (SELECT id_type_flavor FROM FLAVOR_TYPES WHERE NAME = 'Agua'),
    (SELECT id_family_flavor FROM FLAVOR_FAMILIES WHERE NAME = 'Agua'),
    '50',
    '100'
  ),
  (
    'Naranja',
    'Es una base de agua con saborizante de naranja',
    (SELECT id_type_flavor FROM FLAVOR_TYPES WHERE NAME = 'Agua'),
    (SELECT id_family_flavor FROM FLAVOR_FAMILIES WHERE NAME = 'Agua'),
    '50',
    '100'
  ),
  (
    'Frutilla',
    'Es crema helada con sabor a frutilla sembrado con frutillas en almíbar',
    (SELECT id_type_flavor FROM FLAVOR_TYPES WHERE NAME = 'Surtidos'),
    (SELECT id_family_flavor FROM FLAVOR_FAMILIES WHERE NAME = 'Cremas frutales'),
    '50',
    '100'
  ),
  (
    'Maracuyá',
    'Es crema helada con sabor a maracuyá sembrado con variegatto de la misma fruta',
    (SELECT id_type_flavor FROM FLAVOR_TYPES WHERE NAME = 'Surtidos'),
    (SELECT id_family_flavor FROM FLAVOR_FAMILIES WHERE NAME = 'Cremas frutales'),
    '50',
    '100'
  ),
  (
    'Americana',
    'Es una crema helada estilo chantilly',
    (SELECT id_type_flavor FROM FLAVOR_TYPES WHERE NAME = 'Surtidos'),
    (SELECT id_family_flavor FROM FLAVOR_FAMILIES WHERE NAME = 'Cremas heladas'),
    '50',
    '100'
  ),
  (
    'Arco Iris',
    'Es una crema helada estilo chantilly sembrado con rocklets',
    (SELECT id_type_flavor FROM FLAVOR_TYPES WHERE NAME = 'Surtidos'),
    (SELECT id_family_flavor FROM FLAVOR_FAMILIES WHERE NAME = 'Cremas heladas'),
    '50',
    '100'
  ),
  (
    'Aldeana',
    'Es una crema helada estilo chantilly sembrado con dulce de leche repostero',
    (SELECT id_type_flavor FROM FLAVOR_TYPES WHERE NAME = 'Surtidos'),
    (SELECT id_family_flavor FROM FLAVOR_FAMILIES WHERE NAME = 'Cremas heladas'),
    '50',
    '100'
  ),
  (
    'Dulce de Leche',
    'Es una crema helada con sabor a dulce de leche',
    (SELECT id_type_flavor FROM FLAVOR_TYPES WHERE NAME = 'Surtidos'),
    (SELECT id_family_flavor FROM FLAVOR_FAMILIES WHERE NAME = 'Dulce de Leche'),
    '50',
    '100'
  ),
  (
    'Dulce de Leche Aldeana',
    'Es una crema helada con sabor a dulce de leche sembrado con trozos de merengue seco y dulce de leche repostero',
    (SELECT id_type_flavor FROM FLAVOR_TYPES WHERE NAME = 'Surtidos'),
    (SELECT id_family_flavor FROM FLAVOR_FAMILIES WHERE NAME = 'Dulce de Leche'),
    '50',
    '100'
  ),
  (
    'Chocolate Suizo',
    'Es una crema helada con base de chocolate sembrado con chocolate rayado blanco y negro',
    (SELECT id_type_flavor FROM FLAVOR_TYPES WHERE NAME = 'Surtidos'),
    (SELECT id_family_flavor FROM FLAVOR_FAMILIES WHERE NAME = 'Chocolates'),
    '50',
    '100'
  ),
  (
    'Chocolate Bariloche',
    'Es una crema helada con base de chocolate y whisky, sembrado con un mix de almendras, nueces, pasas de uva y crocante de maní caramelizado',
    (SELECT id_type_flavor FROM FLAVOR_TYPES WHERE NAME = 'Surtidos'),
    (SELECT id_family_flavor FROM FLAVOR_FAMILIES WHERE NAME = 'Chocolates'),
    '50',
    '100'
  );

INSERT INTO
  `DB_CHANGES`
VALUES
  (
    025,
    'Insert',
    'Varios registros de sabores con stock y precios base.'
  );