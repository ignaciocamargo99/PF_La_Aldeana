INSERT INTO
  `PRODUCT_TYPES` (`name`, `description`,`id_sector`)
VALUES
  (
    'Por bocha',
    'Incluye 1,2 o 3 bochas en vasitos o cucuruchos',
    (SELECT id_sector FROM SECTORS WHERE NAME = 'Heladería')
  ),
  (
    'Por kilo',
    'Incluye el helado en envases térmicos',
    (SELECT id_sector FROM SECTORS WHERE NAME = 'Heladería')
  ),
  (
    'Helados individuales',
    'Incluye palitos bombón, de agua y alfajores',
    (SELECT id_sector FROM SECTORS WHERE NAME = 'Heladería')
  ),
  (
    'Café',
    'Incluye todos los tipos de preparación en cafetería',
    (SELECT id_sector FROM SECTORS WHERE NAME = 'Cafetería')
  ),
  (
    'Tortas',
    'Incluye tortas, tartas e individuales',
    (SELECT id_sector FROM SECTORS WHERE NAME = 'Cafetería')
  ),
  (
    'Gaseosas',
    'Incluye varias líneas de bebidas',
    (SELECT id_sector FROM SECTORS WHERE NAME = 'Cafetería')
  );

INSERT INTO
  `DB_CHANGES`
VALUES
  (
    027,
    'Insert',
    'Registro de seis tipos de producto.'
  );