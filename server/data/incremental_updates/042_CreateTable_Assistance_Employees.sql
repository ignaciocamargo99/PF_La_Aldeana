CREATE TABLE IF NOT EXISTS `ASSISTANCE_EMPLOYEES` (
  `id_assistance` INT NOT NULL AUTO_INCREMENT,
  `date_entry` DATETIME NOT NULL,
  `date_egress` DATETIME NOT NULL,
  `employee` BIGINT NOT NULL
  PRIMARY KEY (`id_assistance`),
  KEY `FK_EMPLOYEE` (`employee`),
  CONSTRAINT `FK_EMPLOYEE` FOREIGN KEY (`employee`) REFERENCES `EMPLOYEES`(`dni`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

INSERT INTO
  `DB_CHANGES`
VALUES
  (
    042,
    'Create table',
    'Tabla de asistencia de empleados.'
  );