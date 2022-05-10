--  Auto-generated SQL script #202205051751
UPDATE EMPLOYEES
	SET birthday='1976-08-08',street='José Quintela',`number`=1830,nickname='María',cuil=20250426756,phone=3576524354
	WHERE dni=25042675;
UPDATE EMPLOYEES
	SET birthday='1981-04-03',street='Rafael Bianchi',`number`=1255,nickname='Silvana',cuil=27271741591,phone=3576481037
	WHERE dni=27174159;
UPDATE EMPLOYEES
	SET birthday='1982-07-05',street='Av. Presidente Perón',`number`=916,nickname='Lily',cuil=27275210973,phone=3576481978
	WHERE dni=27521097;
UPDATE EMPLOYEES
	SET birthday='1990-08-08',street='Av. Illia',`number`=1118,nickname='Jonathan',cuil=20352582507,phone=3576513149
	WHERE dni=35258250;
UPDATE EMPLOYEES
	SET birthday='1991-03-01',street='Leandro Alem',`number`=415,nickname='Sonia',cuil=27356551422,phone=3576475971
	WHERE dni=35655142;
UPDATE EMPLOYEES
	SET birthday='1993-06-04',street='Mitré',`number`=541,nickname='Cintia',cuil=23356552814,phone=3576413597
	WHERE dni=35655281;
UPDATE EMPLOYEES
	SET birthday='1992-06-04',street='Conrrado Diez',`number`=1540,nickname='Adrián ',cuil=20361735154,phone=3576478510
	WHERE dni=36173515;
UPDATE EMPLOYEES
	SET birthday='1992-08-07',street='Vicente Orellano ',`number`=1146,nickname='Milena',cuil=27361859664,phone=3576472258
	WHERE dni=36185966;
UPDATE EMPLOYEES
	SET birthday='1993-05-04',street='Justo José de Urquiza',`number`=1632,nickname='Mariú',cuil=27373212011,phone=3576485479
	WHERE dni=37321201;
UPDATE EMPLOYEES
	SET birthday='1994-09-09',street='Bartolomé Mitré',`number`=1224,nickname='Dalma',cuil=27374393176,phone=3576653552
	WHERE dni=37439317;
UPDATE EMPLOYEES
	SET birthday='1998-03-03',street='Av. Illia',`number`=1118,nickname='Karen',cuil=27394727585,phone=3576471849
	WHERE dni=39472758;
UPDATE EMPLOYEES
	SET birthday='1997-08-06',street='Conrrado Diez',`number`=1540,nickname='Betiana',cuil=27396123916,phone=3576475201
	WHERE dni=39612391;
UPDATE EMPLOYEES
	SET birthday='1996-10-02',street='Mario seveso',`number`=1174,nickname='Vero',cuil=27398234451,phone=3576419503
	WHERE dni=39823445;
UPDATE EMPLOYEES
	SET birthday='2001-07-07',street='José Quinetela',`number`=1169,nickname='Melani',cuil=27427681576,phone=3576471291
	WHERE dni=42768157;
UPDATE EMPLOYEES
	SET birthday='2001-02-05',street='Renato Caturelli',`number`=420,nickname='Valentina',cuil=27432992336,phone=3576410156
	WHERE dni=43299233;
UPDATE EMPLOYEES
	SET birthday='2001-06-09',street='Peñaloza',`number`=1270,nickname='Milagros',cuil=27420497690,phone=3576449684
	WHERE dni=42049768;
UPDATE EMPLOYEES
	SET birthday='2003-07-09',city='La Tordilla',street='Juan Bautista Busto',`number`=287,nickname='Julieta',cuil=27450874340,phone=3576522081
	WHERE dni=45087433;

INSERT INTO
    `DB_CHANGES`
VALUES
    (
        081,
        'Update',
        'Completado nuevos campos de empleados'
    );