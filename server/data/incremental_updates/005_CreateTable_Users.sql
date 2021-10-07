CREATE TABLE IF NOT EXISTS `USERS` (
  `nick_user` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_rol` int(11) NOT NULL,
  PRIMARY KEY (`nick_user`) USING BTREE,
  KEY `FK_USERS_ROLES` (`id_rol`),
  CONSTRAINT `FK_USERS_ROLES` FOREIGN KEY (`id_rol`) REFERENCES `ROLES` (`id_rol`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO
  `DB_CHANGES`
VALUES
  (
    005,
    'Create table',
    'Tabla de usuarios.'
  );