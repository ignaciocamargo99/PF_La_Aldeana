-- m6aacureuqp9xsmy.ADVANCES definition

CREATE TABLE `ADVANCES` (
  `nroDNI` bigint(20) NOT NULL,
  `date` date NOT NULL,
  `amount` int(11) NOT NULL,
  `pay` int(11) NOT NULL,
  PRIMARY KEY (`nroDNI`,`date`),
  CONSTRAINT `ADVANCES_FK` FOREIGN KEY (`nroDNI`) REFERENCES `EMPLOYEES` (`dni`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- m6aacureuqp9xsmy.INSTALLMENTS definition

CREATE TABLE `INSTALLMENTS` (
  `nroDNI` bigint(20) NOT NULL,
  `date` date NOT NULL,
  `month` date NOT NULL,
  `amount` int(11) NOT NULL,
  `label` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pay` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`nroDNI`,`date`,`month`),
  CONSTRAINT `INSTALLMENTS_FK` FOREIGN KEY (`nroDNI`, `date`) REFERENCES `ADVANCES` (`nroDNI`, `date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO
	`DB_CHANGES`
VALUES
	(
		042,
		'Create Table',
		'Tabla de adelantos y cuotas.'
	);