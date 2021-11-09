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
    'Torta Chajá',
    'Bizcochuelo de vainilla relleno con capas de dulce de leche, crema chantilly, durazno y merengue. Decorado con merengue en trozos',
    (SELECT id_supply_type FROM SUPPLY_TYPES WHERE NAME = 'Descuento por Unidad'),
    NULL,
    NULL,
    2,
    12,
    6
  ),
  (
    'Individual de Óreo',
    'Bandeja de 1 porción con base de galleta oreo, dulce de leche y crema',
    (SELECT id_supply_type FROM SUPPLY_TYPES WHERE NAME = 'Descuento por Unidad'),
    NULL,
    NULL,
    NULL,
    6,
    NULL
  ),
  (
    'Sprite 1,5 L',
    NULL,
    (SELECT id_supply_type FROM SUPPLY_TYPES WHERE NAME = 'Descuento por Unidad'),
    NULL,
    NULL,
    11,
    66,
    6
  ),
  (
    'Agua mineral Villavicencio 1/2 L',
    NULL,
    (SELECT id_supply_type FROM SUPPLY_TYPES WHERE NAME = 'Descuento por Unidad'),
    NULL,
    NULL,
    4,
    24,
    6
  );

INSERT INTO
  `DB_CHANGES`
VALUES
  (
    031,
    'Insert',
    'Varios registros de insumos.'
  );