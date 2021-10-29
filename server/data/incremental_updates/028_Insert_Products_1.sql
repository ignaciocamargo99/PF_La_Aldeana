INSERT INTO
  `PRODUCTS` (
    `name`,
    `description`,
    `price`,
    `id_sector`,
    `id_product_type`,
    `quantity_flavor`
  )
VALUES
  (
    'Vasito de una bocha',
    'Vaso de pasta con una bocha de helado',
    50,
    (SELECT id_sector FROM SECTORS WHERE NAME = 'Heladería'),
    (SELECT id_product_type FROM PRODUCT_TYPES WHERE NAME = 'Por bocha'),
    NULL
  ),
  (
    'Vasito de dos bochas',
    'Vaso de pasta con dos bochas de helado',
    70,
    (SELECT id_sector FROM SECTORS WHERE NAME = 'Heladería'),
    (SELECT id_product_type FROM PRODUCT_TYPES WHERE NAME = 'Por bocha'),
    NULL
  ),
  (
    'Conservadora 1 Kg',
    'Envase térmico de 1 kilogramo con un máximo de 5 sabores',
    300,
    (SELECT id_sector FROM SECTORS WHERE NAME = 'Heladería'),
    (SELECT id_product_type FROM PRODUCT_TYPES WHERE NAME = 'Por kilo'),
    NULL
  ),
  (
    'Conservadora 1/2 Kg',
    'Envase térmico de 1/2 kilogramo con un máximo de 4 sabores',
    180,
    (SELECT id_sector FROM SECTORS WHERE NAME = 'Heladería'),
    (SELECT id_product_type FROM PRODUCT_TYPES WHERE NAME = 'Por kilo'),
    NULL
  ),
  (
    'Palito Bombón de Americana',
    'Palito de crema americana bañado en chocolate negro',
    100,
    (SELECT id_sector FROM SECTORS WHERE NAME = 'Heladería'),
    (SELECT id_product_type FROM PRODUCT_TYPES WHERE NAME = 'Helados individuales'),
    NULL
  ),
  (
    'Palito de Agua de Naranja',
    'Palito de agua sabor naranja',
    80,
    (SELECT id_sector FROM SECTORS WHERE NAME = 'Heladería'),
    (SELECT id_product_type FROM PRODUCT_TYPES WHERE NAME = 'Helados individuales'),
    NULL
  ),
  (
    'Alfajor',
    'Helado de dulce de leche entre galletas de miel bañado en blanco y negro',
    80,
    (SELECT id_sector FROM SECTORS WHERE NAME = 'Heladería'),
    (SELECT id_product_type FROM PRODUCT_TYPES WHERE NAME = 'Helados individuales'),
    NULL
  );

INSERT INTO
  `DB_CHANGES`
VALUES
  (
    028,
    'Insert',
    'Varios registros de productos del sector Heladería con precios base.'
  );