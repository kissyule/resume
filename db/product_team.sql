SET NAMES UTF8;
USE lenovo;
CREATE TABLE lx_product_family(
	fid INT PRIMARY KEY AUTO_INCREMENT,	#家族ID
	brand VARCHAR(16) NOT NULL DEFAULT '',	#品牌
	f_name VARCHAR(16) NOT NULL DEFAULT ''	#系列名
);
INSERT INTO lx_product_family VALUES (1,"lenovo","YOGA系列");
INSERT INTO lx_product_family VALUES (2,"lenovo","小新系列");
INSERT INTO lx_product_family VALUES (3,"lenovo","拯救者系列");
INSERT INTO lx_product_family VALUES (4,"lenovo","ideapad系列");
INSERT INTO lx_product_family VALUES (5,"lenovo","天逸系列");
INSERT INTO lx_product_family VALUES (6,"ThinkPad","E系列");
INSERT INTO lx_product_family VALUES (7,"ThinkPad","T系列");
INSERT INTO lx_product_family VALUES (8,"ThinkPad","X1系列");
INSERT INTO lx_product_family VALUES (9,"ThinkPad","S系列");
INSERT INTO lx_product_family VALUES (10,"ThinkPad","X系列");
INSERT INTO lx_product_family VALUES (11,"ThinkPad","R系列");
INSERT INTO lx_product_family VALUES (12,"ThinkPad","P系列");
INSERT INTO lx_product_family VALUES (13,"ThinkPad","A系列");
CREATE TABLE lx_product_team(
	tid INT PRIMARY KEY AUTO_INCREMENT,	#系列ID
	fid INT,	#家族ID
    FOREIGN KEY (fid) REFERENCES lx_product_family (fid),
    p_name VARCHAR(16) NOT NULL DEFAULT ''	#商品名
);
INSERT INTO lx_product_team VALUES (1,1,"YOGA 5 Pro");
INSERT INTO lx_product_team VALUES (2,1,"YOGA 720");
INSERT INTO lx_product_team VALUES (3,1,"YOGA 710");
INSERT INTO lx_product_team VALUES (4,1,"YOGA 6 Pro");
INSERT INTO lx_product_team VALUES (5,2,"小新潮7000");
INSERT INTO lx_product_team VALUES (6,2,"小新潮5000");
INSERT INTO lx_product_team VALUES (7,2,"小新Air12");
INSERT INTO lx_product_team VALUES (8,2,"小新锐7000");
INSERT INTO lx_product_team VALUES (9,3,"拯救者 R720");
INSERT INTO lx_product_team VALUES (10,3,"拯救者E520");
INSERT INTO lx_product_team VALUES (11,3,"拯救者Y720");
INSERT INTO lx_product_team VALUES (12,3,"拯救者Y920");
INSERT INTO lx_product_team VALUES (13,4,"ideapad 320S");
INSERT INTO lx_product_team VALUES (14,4,"ideapad 720s");
INSERT INTO lx_product_team VALUES (15,4,"ideapad 110");
INSERT INTO lx_product_team VALUES (16,4,"ideapad 320");
INSERT INTO lx_product_team VALUES (17,5,"天逸 310");
INSERT INTO lx_product_team VALUES (18,6,"E470");
INSERT INTO lx_product_team VALUES (19,6,"E570c");
INSERT INTO lx_product_team VALUES (20,6,"E470c");
INSERT INTO lx_product_team VALUES (21,6,"E570");
INSERT INTO lx_product_team VALUES (22,6,"E580");
INSERT INTO lx_product_team VALUES (23,6,"E480");
INSERT INTO lx_product_team VALUES (24,7,"T470p");
INSERT INTO lx_product_team VALUES (25,7,"T470s");
INSERT INTO lx_product_team VALUES (26,7,"T470");
INSERT INTO lx_product_team VALUES (27,8,"X1 Yoga");
INSERT INTO lx_product_team VALUES (28,8,"X1 Carbon");
INSERT INTO lx_product_team VALUES (29,9,"S2");
INSERT INTO lx_product_team VALUES (30,9,"S1");
INSERT INTO lx_product_team VALUES (31,9,"S5");
INSERT INTO lx_product_team VALUES (32,10,"X270");
INSERT INTO lx_product_team VALUES (33,10,"X260");
INSERT INTO lx_product_team VALUES (34,11,"R480");
INSERT INTO lx_product_team VALUES (35,12,"P51s");
INSERT INTO lx_product_team VALUES (36,12,"P51");
INSERT INTO lx_product_team VALUES (37,13,"A475");
INSERT INTO lx_product_team VALUES (38,13,"A275");