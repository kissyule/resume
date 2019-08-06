SET NAMES UTF8;
USE lenovo;
CREATE TABLE lx_banner_lg (
	b_l_id INT PRIMARY KEY AUTO_INCREMENT,	#大轮播图编号
	img VARCHAR(128) NOT NULL DEFAULT '',	#图片地址
	href VARCHAR(128) NOT NULL DEFAULT '',	#跳转地址
	title VARCHAR(64) NOT NULL DEFAULT ''	#标题
);
INSERT INTO lx_banner_lg VALUES (null,"images/index/banner-pic-1.jpg","product_search.html","寒假促销，学生专项");
INSERT INTO lx_banner_lg VALUES (null,"images/index/banner-pic-2.jpg","product_search.html","新春惠聚年货节");
INSERT INTO lx_banner_lg VALUES (null,"images/index/banner-pic-3.jpg","product_search.html","优选好礼新年钜惠");
INSERT INTO lx_banner_lg VALUES (null,"images/index/banner-pic-4.jpg","product_search.html","我是学生我就敢喊");
INSERT INTO lx_banner_lg VALUES (null,"images/index/banner-pic-5.jpg","product_search.html","签到抽豪礼");
INSERT INTO lx_banner_lg VALUES (null,"images/index/banner-pic-6.jpg","product_search.html","急速达");
INSERT INTO lx_banner_lg VALUES (null,"images/index/banner-pic-7.jpg","product_search.html","抢年货");
CREATE TABLE lx_banner_md (
	b_m_id INT PRIMARY KEY AUTO_INCREMENT,	#中轮播图编号
	img VARCHAR(128) NOT NULL DEFAULT '',	#轮播图地址
	href VARCHAR(128) NOT NULL DEFAULT '',	#跳转地址
	name VARCHAR(64) NOT NULL DEFAULT '',	#标题
	title VARCHAR(64) NOT NULL DEFAULT '',	#描述
	price VARCHAR(8) NOT NULL DEFAULT ''	#价格
);
INSERT INTO lx_banner_md VALUES (null,"images/index/star_1.jpg","javascript:;","联想Mirage | 星球大战：绝地挑战","星球大战：绝地挑战","¥1999");
INSERT INTO lx_banner_md VALUES (null,"images/index/star_2.jpg","product_details.html?pid=20","YOGA 720-13IKB 13.3英寸触控笔记本 傲娇银 80X6006CCD","全金属机身  翻转“视”界","¥6899");
INSERT INTO lx_banner_md VALUES (null,"images/index/star_3.jpg","product_details.html?pid=107","拯救者 R720-15IKB 15.6英寸游戏笔记本 黑色 80WW0013CD","升级GTX 1050Ti 4G显存 流畅游戏","¥6699");
INSERT INTO lx_banner_md VALUES (null,"images/index/star_4.jpg","product_details.html?pid=86","小新 Air 12 12.2英寸超轻薄笔记本 金色 80UN0001CD","简约设计 金属机身","¥3699");
INSERT INTO lx_banner_md VALUES (null,"images/index/star_5.jpg","product_details.html?pid=118","ThinkPad New S2 2017 笔记本电脑 银色 20J3A002CD","触屏商务 效率出众","¥5999");
INSERT INTO lx_banner_md VALUES (null,"images/index/star_6.jpg","javascript:;","MIIX 5 Pro 二合一笔记本 12英寸 尊享版 黑色 80VV0005CD","可插拔 精美铝合金一体成型","¥6999");
INSERT INTO lx_banner_md VALUES (null,"images/index/star_7.jpg","product_details.html?pid=95","小新 锐7000 15.6英寸游戏笔记本 黑色 80WB0007CD","高性能游戏本 轻薄酷黑","¥6299");
INSERT INTO lx_banner_md VALUES (null,"images/index/star_8.jpg","javascript:;","ThinkPad Stack智能魔方投影模块","智能微投 可任意拓展","¥3999");
INSERT INTO lx_banner_md VALUES (null,"images/index/star_9.jpg","javascript:;","联想（Lenovo）小新智能投影仪 T1","不伤眼的大屏电视","¥1850");
INSERT INTO lx_banner_md VALUES (null,"images/index/star_10.jpg","javascript:;","联想UM10C直播版手机麦克风 玫瑰金","立体混响 更有主播范","¥399");
INSERT INTO lx_banner_md VALUES (null,"images/index/star_11.jpg","javascript:;","Lenovo/联想 R3210  300M无线路由器-黑色","6折优惠，就是这么任性","¥69");
INSERT INTO lx_banner_md VALUES (null,"images/index/star_12.jpg","product_details.html?pid=33","YOGA 710-14IKB 14.0英寸触控笔记本 银色 80V40007CD","固态硬盘 快速读写","¥6199");
CREATE TABLE lx_banner_sm (
	b_s_id INT PRIMARY KEY AUTO_INCREMENT,	#小轮播图编号
	href VARCHAR(64) NOT NULL DEFAULT '',	#跳转地址
	title VARCHAR(32) NOT NULL DEFAULT ''	#描述
);
INSERT INTO lx_banner_sm VALUES (null,"javascript:;","乐豆抽奖大战开始啦，赶快戳我抽取大奖，miix平板等着你！");
