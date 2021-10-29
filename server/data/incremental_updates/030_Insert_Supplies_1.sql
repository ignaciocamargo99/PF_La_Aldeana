INSERT INTO
  `SUPPLIES` (
    `name`,
    `description`,
    `id_supply_type`,
    `price_wholesale`,
    `price_retail`,
    `stock_lot`,
    `stock_unit`,
    `unit_x_lot`
  )
VALUES
  (
    'Vaso 90',
    'Vaso de pasta más chico',
    (SELECT id_supply_type FROM SUPPLY_TYPES WHERE NAME = 'Descuento por Unidad'),
    500,
    5,
    20,
    500,
    50
  ),
  (
    'Vaso 125',
    'Vaso de pasta más grande',
    (SELECT id_supply_type FROM SUPPLY_TYPES WHERE NAME = 'Descuento por Unidad'),
    800,
    8,
    25,
    1250,
    50
  ),
  (
    'Conservadora x 1 kg',
    'Envase térmico con capacidad para 1 kg',
    (SELECT id_supply_type FROM SUPPLY_TYPES WHERE NAME = 'Descuento por Unidad'),
    400,
    10,
    20,
    400,
    20
  ),
  (
    'Conservadora x 1/2 kg',
    'Envase térmico con capacidad para 1/2 kg',
    (SELECT id_supply_type FROM SUPPLY_TYPES WHERE NAME = 'Descuento por Unidad'),
    200,
    5,
    20,
    500,
    25
  ),
  (
    'Palito Bombón de Americana',
    'Palito de crema americana bañado en chocolate negro',
    (SELECT id_supply_type FROM SUPPLY_TYPES WHERE NAME = 'Descuento por Unidad'),
    NULL,
    NULL,
    NULL,
    240,
    NULL
  ),
  (
    'Palito de Agua de Naranja',
    'Palito de agua sabor naranja',
    (SELECT id_supply_type FROM SUPPLY_TYPES WHERE NAME = 'Descuento por Unidad'),
    NULL,
    NULL,
    NULL,
    310,
    NULL
  ),
  (
    'Alfajor',
    'Helado de dulce de leche entre galletas de miel bañado en blanco y negro',
    (SELECT id_supply_type FROM SUPPLY_TYPES WHERE NAME = 'Descuento por Unidad'),
    NULL,
    NULL,
    NULL,
    120,
    NULL
  );

INSERT INTO
  `DB_CHANGES`
VALUES
  (
    030,
    'Insert',
    'Varios registros de insumos.'
  );