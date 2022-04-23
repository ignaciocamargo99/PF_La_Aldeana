ALTER TABLE `USERS`
	ADD COLUMN `active` BIT NOT NULL AFTER `password`;

INSERT INTO
    `DB_CHANGES`
VALUES
    (
        078,
        'Alter table',
        'Nueva columna active para usuarios.'
    );