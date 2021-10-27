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
    'Submarino',
    'Leche caliente con una barra de chocolate',
    210,
    (SELECT id_sector FROM SECTORS WHERE NAME = 'Cafetería'),
    (SELECT id_product_type FROM PRODUCT_TYPES WHERE NAME = 'Café'),
    NULL
  ),
  (
    'Cortado en Jarrito',
    'Café con leche mediano',
    150,
    (SELECT id_sector FROM SECTORS WHERE NAME = 'Cafetería'),
    (SELECT id_product_type FROM PRODUCT_TYPES WHERE NAME = 'Café'),
    NULL
  ),
  (
    'Torta Chajá',
    'Bizcochuelo de vainilla relleno con capas de dulce de leche, crema chantilly, durazno y merengue. Decorado con merengue en trozos',
    610,
    (SELECT id_sector FROM SECTORS WHERE NAME = 'Cafetería'),
    (SELECT id_product_type FROM PRODUCT_TYPES WHERE NAME = 'Tortas'),
    NULL
  ),
  (
    'Porción de Torta Chajá',
    'Porción de bizcochuelo de vainilla relleno con capas de dulce de leche, crema chantilly, durazno y merengue. Decorado con merengue en trozos',
    130,
    (SELECT id_sector FROM SECTORS WHERE NAME = 'Cafetería'),
    (SELECT id_product_type FROM PRODUCT_TYPES WHERE NAME = 'Tortas'),
    NULL
  ),
  (
    'Individual de Oreo',
    'Bandeja de 1 porción con base de galleta oreo, dulce de leche y crema',
    150,
    (SELECT id_sector FROM SECTORS WHERE NAME = 'Cafetería'),
    (SELECT id_product_type FROM PRODUCT_TYPES WHERE NAME = 'Tortas'),
    NULL
  ),
  (
    'Sprite 1,5 L',
    'Gaseosa Sprite grande',
    150,
    (SELECT id_sector FROM SECTORS WHERE NAME = 'Cafetería'),
    (SELECT id_product_type FROM PRODUCT_TYPES WHERE NAME = 'Gaseosas'),
    NULL
  ),
  (
    'Agua mineral Villavicencio 1/2 L',
    'Agua sin gas chica',
    80,
    (SELECT id_sector FROM SECTORS WHERE NAME = 'Cafetería'),
    (SELECT id_product_type FROM PRODUCT_TYPES WHERE NAME = 'Gaseosas'),
    NULL
  );

INSERT INTO
  `DB_CHANGES`
VALUES
  (
    029,
    'Insert',
    'Varios registros de productos del sector Cafetería con precios base.'
  );