CREATE TABLE IF NOT EXISTS `DAYS_OFF` (
    `id_day_off` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `dni_employee` BIGINT(20) NOT NULL,
    `date` DATE NOT NULL,
    PRIMARY KEY (`id_day_off`) USING BTREE,
    INDEX `FK__DAYS_OFF__EMPLOYEES` (`dni_employee`) USING BTREE,
    CONSTRAINT `FK__DAYS_OFF__EMPLOYEES` FOREIGN KEY (`dni_employee`) REFERENCES `EMPLOYEES` (`dni`) ON UPDATE NO ACTION ON DELETE NO ACTION
) COLLATE = 'utf8mb4_unicode_ci' ENGINE = InnoDB;

INSERT INTO
    `DB_CHANGES`
VALUES
    (
        065,
        'Create table',
        'Tabla de días franco de empleados.'
    );