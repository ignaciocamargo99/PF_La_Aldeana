CREATE TABLE IF NOT EXISTS `USER_X_PERMISSION_X_ACCESS` (
    `id_user` int(11) NOT NULL,
    `id_permission` int(11) NOT NULL,
    `id_access` int(11) NOT NULL,
    PRIMARY KEY (`id_user`, `id_permission`, `id_access`),
    KEY `FK_USERS` (`id_user`),
    KEY `FK_PERMISSIONS` (`id_permission`),
    KEY `FK_ACCESSES` (`id_access`),
    CONSTRAINT `FK_USERS` FOREIGN KEY (`id_user`) REFERENCES `USERS` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `FK_PERMISSIONS` FOREIGN KEY (`id_permission`) REFERENCES `PERMISSIONS` (`id_permission`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `FK_ACCESSES` FOREIGN KEY (`id_access`) REFERENCES `ACCESSES` (`id_access`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

INSERT INTO
    USER_X_PERMISSION_X_ACCESS
VALUES
    -- Ignacio 22. --
    (1, 1, 1),
    (1, 2, 1),
    (1, 3, 3),
    (1, 4, 3),
    (1, 5, 3),
    (1, 6, 2),
    (1, 7, 3),
    (1, 8, 3),
    -- RCamandona --
    (2, 1, 3),
    (2, 2, 3),
    (2, 3, 3),
    (2, 4, 3),
    (2, 5, 3),
    (2, 6, 3),
    (2, 7, 3),
    (2, 8, 3);

INSERT INTO
    `DB_CHANGES`
VALUES
    (
        077,
        'Alter table',
        'Tabla de usuarios por permiso y acceso creada nuevamente por cambio en PK.'
    );