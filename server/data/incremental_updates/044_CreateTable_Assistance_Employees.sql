CREATE TABLE IF NOT EXISTS `ASSISTANCE_EMPLOYEES` (
  `id_assistance` int(11) NOT NULL AUTO_INCREMENT,
  `date_entry` DATETIME NOT NULL,
  `date_egress` DATETIME NOT NULL,
  `employee` bigint(20) NOT NULL,
  PRIMARY KEY (`id_assistance`),
  KEY `FK__EMPLOYEE` (`employee`) USING BTREE,
  CONSTRAINT `FK__EMPLOYEE` FOREIGN KEY (`employee`) REFERENCES `EMPLOYEES`(`dni`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

INSERT INTO
  `DB_CHANGES`
VALUES
  (
    044,
    'Create table',
    'Tabla de asistencia de empleados.'
  );