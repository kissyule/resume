SET NAMES UTF8;
USE lenovo;
CREATE TABLE lx_shopping_like(
    lid INT PRIMARY KEY AUTO_INCREMENT, #收藏列表ID
    uid INT,    #用户ID
	FOREIGN KEY (uid) REFERENCES lx_user (uid),
	pid INT,    #商品ID
	FOREIGN KEY (pid) REFERENCES lx_product (pid),
	is_like ENUM('1','0') NOT NULL DEFAULT '1'    #用户性别 0：不喜欢 1：喜欢
);