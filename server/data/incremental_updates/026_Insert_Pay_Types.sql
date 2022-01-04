INSERT INTO
  `PAY_TYPES` (`name`, `description`)
VALUES
  (
    'Efectivo',
    'El cliente abona con dinero'
  ),
  (
    'Tarjeta de Débito/Crédito',
    'El cliente abona cualquier tarjeta'
  );

INSERT INTO
  `DB_CHANGES`
VALUES
  (
    026,
    'Insert',
    'Tipos de pago Efectivo y Tarjeta Débito/Crédito.'
  );