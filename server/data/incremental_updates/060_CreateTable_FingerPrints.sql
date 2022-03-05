CREATE TABLE IF NOT EXISTS `FINGER_PRINTS` (
  `idFingerPrint` int(11) NOT NULL AUTO_INCREMENT,
  `dniEmployee` bigint(20) NOT NULL,
  `finger` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finger_print` varchar(5000) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`idFingerPrint`),
  KEY `FK__EMPLOYEES` (`dniEmployee`),
  CONSTRAINT `FK__EMPLOYEES` FOREIGN KEY (`dniEmployee`) REFERENCES `EMPLOYEES` (`dni`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


INSERT INTO
    `DB_CHANGES`
VALUES
    (
        060,
        'Create table',
        'Tabla de huellas.'
    );
