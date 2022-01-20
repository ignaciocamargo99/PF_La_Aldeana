CREATE TABLE IF NOT EXISTS `CHARGES_X_EMPLOYEES` (
  `dni_employee` bigint(20) NOT NULL,
  `id_charge` int(11) NOT NULL,
  PRIMARY KEY (`dni_employee`, `id_charge`),
  KEY `FK__CHARGES_X_EMPLOYEES__CHARGES` (`id_charge`),
  CONSTRAINT `FK__CHARGES_X_EMPLOYEES__CHARGES` FOREIGN KEY (`id_charge`) REFERENCES `CHARGES` (`id_charge`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK__CHARGES_X_EMPLOYEES__EMPLOYEES` FOREIGN KEY (`dni_employee`) REFERENCES `EMPLOYEES` (`dni`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

INSERT INTO
  `DB_CHANGES`
VALUES
  (
    045,
    'Create Table',
    'Tabla cargos por empleados.'
  );