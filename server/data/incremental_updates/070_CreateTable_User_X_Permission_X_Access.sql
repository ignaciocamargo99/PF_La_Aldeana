CREATE TABLE IF NOT EXISTS `USER_X_PERMISSION_X_ACCESS` (
    `nick_user` VARCHAR(255) NOT NULL,
    `id_permission` int(11) NOT NULL,
    `id_access` int(11) NOT NULL,
    `active` bit NOT NULL,
    PRIMARY KEY (`nick_user`, `id_permission`, `id_access`),
    KEY `FK_USERS` (`nick_user`),
    KEY `FK_PERMISSIONS` (`id_permission`),
    KEY `FK_ACCESSES` (`id_access`),
    CONSTRAINT `FK_USERS` FOREIGN KEY (`nick_user`) REFERENCES `USERS` (`nick_user`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `FK_PERMISSIONS` FOREIGN KEY (`id_permission`) REFERENCES `PERMISSIONS` (`id_permission`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `FK_ACCESSES` FOREIGN KEY (`id_access`) REFERENCES `ACCESSES` (`id_access`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

INSERT INTO
    `DB_CHANGES`
VALUES
    (
        070,
        'Create table',
        'Tabla de usuarios por permiso y acceso.'
    );