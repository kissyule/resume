SET NAMES UTF8;
USE lenovo;
CREATE TABLE lx_product(
	pid INT PRIMARY KEY AUTO_INCREMENT,	#商品ID
	fid INT,	#家族ID
	FOREIGN KEY (fid) REFERENCES lx_product_family (fid),
	category VARCHAR(16) NOT NULL DEFAULT '',	#类别号
	tid INT,	#家族ID
    FOREIGN KEY (tid) REFERENCES lx_product_team (tid),
	title VARCHAR(64) NOT NULL DEFAULT '',	#商品标题
	subtitle VARCHAR(128) NOT NULL DEFAULT '',	#商品副标题
	price decimal(10,2) NOT NULL DEFAULT 0.00,	#商品价格
	promise VARCHAR(16) NOT NULL DEFAULT '',	#促销信息
	service VARCHAR(128) NOT NULL DEFAULT '',	#推荐服务
	cpu VARCHAR(128) NOT NULL DEFAULT '',	#处理器
	cpu_d VARCHAR(8) NOT NULL DEFAULT '',	#处理器类别
	dos VARCHAR(128) NOT NULL DEFAULT '',	#操作系统
	screen VARCHAR(128) NOT NULL DEFAULT '',	#屏幕
	screen_inch VARCHAR(8) NOT NULL DEFAULT '',	#屏幕尺寸
	screen_size VARCHAR(16) NOT NULL DEFAULT '',	#屏幕分辨率
	memory VARCHAR(128) NOT NULL DEFAULT '',	#内存
	memory_d VARCHAR(8) NOT NULL DEFAULT '',	#内存大小
	disk VARCHAR(128) NOT NULL DEFAULT '',	#硬盘
	disk_d VARCHAR(16) NOT NULL DEFAULT '',	#硬盘大小
	video_card VARCHAR(128) NOT NULL DEFAULT '',	#显卡
	cd_drive VARCHAR(128) NOT NULL DEFAULT '',	#光驱
	inter_face VARCHAR(128) NOT NULL DEFAULT '',	#接口
	network VARCHAR(128) NOT NULL DEFAULT '',	#网络通信
	multi_media VARCHAR(128) NOT NULL DEFAULT '',	#多媒体
	input_device VARCHAR(128) NOT NULL DEFAULT '',	#输入设备
	power VARCHAR(128) NOT NULL DEFAULT '',	#电源规格
	machine VARCHAR(128) NOT NULL DEFAULT '',	#机器规格
	software VARCHAR(32) NOT NULL DEFAULT '',	#预装软件
	service_all VARCHAR(64) NOT NULL DEFAULT '', #服务
	images VARCHAR(1024) NOT NULL DEFAULT '',	#展示图
	detail VARCHAR(1024) NOT NULL DEFAULT ''	#详情图
);