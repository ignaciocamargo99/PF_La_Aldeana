DROP TABLE `USER_X_PERMISSION_X_ACCESS`;

ALTER TABLE
    `USERS`
ADD
    COLUMN `id_user` INT NULL DEFAULT NULL
AFTER
    `nick_user`;

ALTER TABLE
    `USERS` CHANGE COLUMN `id_user` `id_user` INT(11) NOT NULL AUTO_INCREMENT FIRST,
    DROP PRIMARY KEY,
ADD
    PRIMARY KEY (`id_user`) USING BTREE;

INSERT INTO
    `DB_CHANGES`
VALUES
    (
        076,
        'Alter table',
        'Cambio en PK tabla usuarios, ahora es id_user.'
    );