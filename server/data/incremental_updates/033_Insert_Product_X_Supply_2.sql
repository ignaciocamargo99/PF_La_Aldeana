INSERT INTO
  `PRODUCT_X_SUPPLY` (
    `id_product`,
    `id_supply`,
    `number_supply`
  )
VALUES
  (
    (SELECT id_product FROM PRODUCTS WHERE NAME = 'Torta Chajá'),
    (SELECT id_supply FROM SUPPLIES WHERE NAME = 'Torta Chajá'),
    6
  ),
  (
    (SELECT id_product FROM PRODUCTS WHERE NAME = 'Porción de Torta Chajá'),
    (SELECT id_supply FROM SUPPLIES WHERE NAME = 'Torta Chajá'),
    1
  ),
  (
    (SELECT id_product FROM PRODUCTS WHERE NAME = 'Individual de Óreo'),
    (SELECT id_supply FROM SUPPLIES WHERE NAME = 'Individual de Óreo'),
    1
  ),
  (
    (SELECT id_product FROM PRODUCTS WHERE NAME = 'Sprite 1,5 L'),
    (SELECT id_supply FROM SUPPLIES WHERE NAME = 'Sprite 1,5 L'),
    1
  ),
  (
    (SELECT id_product FROM PRODUCTS WHERE NAME = 'Agua mineral Villavicencio 1/2 L'),
    (SELECT id_supply FROM SUPPLIES WHERE NAME = 'Agua mineral Villavicencio 1/2 L'),
    1
  );

INSERT INTO
  `DB_CHANGES`
VALUES
  (
    033,
    'Insert',
    'Varios registros de insumos por producto.'
  );