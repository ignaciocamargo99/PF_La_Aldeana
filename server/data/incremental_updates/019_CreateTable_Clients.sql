CREATE TABLE IF NOT EXISTS `CLIENTS` (
  `cellphone` bigint(20) NOT NULL,
  `names` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `street_name` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `street_number` int(11) NOT NULL,
  PRIMARY KEY (`cellphone`),
  CONSTRAINT `CHK_cellphone` CHECK (octet_length(`cellphone`) = 10),
  CONSTRAINT `CHK_street_number` CHECK (
    octet_length(`street_number`) >= 1
    and octet_length(`street_number`) <= 4
  ),
  CONSTRAINT `CHK_street` CHECK (octet_length(`street_name`) >= 1),
  CONSTRAINT `CHK_names` CHECK (octet_length(`names`) >= 1)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

INSERT INTO
  `DB_CHANGES`
VALUES
  (
    019,
    'Create table',
    'Tabla de clientes.'
  );