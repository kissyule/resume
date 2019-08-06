SET NAMES UTF8;
USE lenovo;
CREATE TABLE lz_shopping_cart_items(
	iid INT PRIMARY KEY AUTO_INCREMENT, #列表ID
	uid INT,    #用户ID
	FOREIGN KEY (uid) REFERENCES lx_user (uid),
	pid INT,    #商品ID
	FOREIGN KEY (pid) REFERENCES lx_product (pid),
	p_count INT NOT NULL DEFAULT 1,   #商品数量
	is_service VARCHAR(512) NOT NULL DEFAULT '', #服务信息
	is_choice ENUM('1','0') NOT NULL DEFAULT '0' #是否被选中
);