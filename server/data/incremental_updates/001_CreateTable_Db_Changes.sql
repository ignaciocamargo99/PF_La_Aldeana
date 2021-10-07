CREATE TABLE IF NOT EXISTS `DB_CHANGES` (
  `id_change` int(11) NOT NULL,
  `change_type` varchar(50) NOT NULL,
  `description` varchar(80) NOT NULL,
  PRIMARY KEY (`id_change`)
);

INSERT INTO
  `DB_CHANGES`
VALUES
  (
    001,
    'Create table',
    'Tabla para almacenar los scripts que se corrieron en BD.'
  );