INSERT INTO
  `PRODUCT_X_SUPPLY` (
    `id_product`,
    `id_supply`,
    `number_supply`
  )
VALUES
  (
    (SELECT id_product FROM PRODUCTS WHERE NAME = 'Vasito de una bocha'),
    (SELECT id_supply FROM SUPPLIES WHERE NAME = 'Vaso 90'),
    1
  ),
  (
    (SELECT id_product FROM PRODUCTS WHERE NAME = 'Vasito de dos bochas'),
    (SELECT id_supply FROM SUPPLIES WHERE NAME = 'Vaso 125'),
    1
  ),
  (
    (SELECT id_product FROM PRODUCTS WHERE NAME = 'Conservadora 1 Kg'),
    (SELECT id_supply FROM SUPPLIES WHERE NAME = 'Conservadora x 1 kg'),
    1
  ),
  (
    (SELECT id_product FROM PRODUCTS WHERE NAME = 'Conservadora 1/2 Kg'),
    (SELECT id_supply FROM SUPPLIES WHERE NAME = 'Conservadora x 1/2 Kg'),
    1
  ),
  (
    (SELECT id_product FROM PRODUCTS WHERE NAME = 'Palito Bombón de Americana'),
    (SELECT id_supply FROM SUPPLIES WHERE NAME = 'Palito Bombón de Americana'),
    1
  ),
  (
    (SELECT id_product FROM PRODUCTS WHERE NAME = 'Palito de Agua de Naranja'),
    (SELECT id_supply FROM SUPPLIES WHERE NAME = 'Palito de Agua de Naranja'),
    1
  ),
  (
    (SELECT id_product FROM PRODUCTS WHERE NAME = 'Alfajor'),
    (SELECT id_supply FROM SUPPLIES WHERE NAME = 'Alfajor'),
    1
  );

INSERT INTO
  `DB_CHANGES`
VALUES
  (
    032,
    'Insert',
    'Varios registros de insumos por producto.'
  );