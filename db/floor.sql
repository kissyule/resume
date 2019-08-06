SET NAMES UTF8;
USE lenovo;
CREATE TABLE lx_floor(
	floor_id INT PRIMARY KEY AUTO_INCREMENT,	#楼层ID
	floor INT NOT NULL DEFAULT 0,	#楼层数
	num INT NOT NULL DEFAULT 0,	#楼层内编号
	name VARCHAR(32) NOT NULL DEFAULT "",	#产品标题
	title VARCHAR(16) NOT NULL DEFAULT "",	#描述
	price decimal(10,2) NOT NULL DEFAULT 0.00,	#商品价格
	img VARCHAR(64) NOT NULL DEFAULT "",	#图片地址
	href VARCHAR(64) NOT NULL DEFAULT "",	#跳转地址
	detail ENUM('4','3','2','1','0') NOT NULL DEFAULT '0'	#0无,1热卖,2爆款,3新品,4直降
);


#1楼
INSERT INTO lx_floor VALUES(
	null,
	1,
	0,
	"",
	"",
	0.00,
	'images/index/floor_1_lg.jpg',
	"product_search.html?key=ideapad 320S",
	"0"
);
INSERT INTO lx_floor VALUES(
	null,
	1,
	1,
	"小新 Air 12 12.2英寸超轻薄笔记本 金色 80UN0001CD",
	"双硬盘 抢占战场先机",
	3699.00,
	"images/index/froor_1_1.jpg",
	"product_details.html?pid=86",
	"0"
);
INSERT INTO lx_floor VALUES(
	null,
	1,
	2,
	"小新 潮7000 14.0英寸轻薄笔记本 樱花粉 81BM000ACD",
	"轻薄  恰到好处",
	5499.00,
	"images/index/froor_1_2.jpg",
	"product_details.html?pid=70",
	"0"
);
INSERT INTO lx_floor VALUES(
	null,
	1,
	3,
	"小新 潮7000 13.3英寸轻薄笔记本 花火银81BS000ECD",
	"IPS显示屏 绽放炫彩特效",
	6299.00,
	"images/index/froor_1_3.jpg",
	"product_details.html?pid=53",
	"0"
);
INSERT INTO lx_floor VALUES(
	null,
	1,
	4,
	"小新 潮7000 13.3英寸轻薄笔记本 花火银 81BS0009CD",
	"8代CPU，3面微边框，全高清IPS",
	5199.00,
	"images/index/froor_1_4.jpg",
	"product_details.html?pid=53",
	"1"
);
INSERT INTO lx_floor VALUES(
	null,
	1,
	5,
	"拯救者 R720-15IKBN 15.6英寸游戏笔记本 黑色 80WW0013CD",
	"IPS显示屏，还原真实色彩",
	6699.00,
	"images/index/froor_1_5.jpg",
	"product_details.html?pid=107",
	"0"
);
INSERT INTO lx_floor VALUES(
	null,
	1,
	6,
	"小新 Air 12 12.2英寸超轻薄笔记本 金色 80UN0001CD",
	"双硬盘 抢占战场先机",
	3699.00,
	"images/index/froor_1_6.jpg",
	"product_details.html?pid=86",
	"0"
);
INSERT INTO lx_floor VALUES(
	null,
	1,
	7,
	"ideapad 320S-15IKB 15.6英寸笔记本 白色 80X50052CD",
	"杜比音效 还原动听音质",
	5099.00,
	"images/index/froor_1_7.jpg",
	"product_details.html?pid=118",
	"0"
);
INSERT INTO lx_floor VALUES(
	null,
	1,
	8,
	"小新 潮7000 14.0英寸轻薄笔记本 火花金 81BM0000CD",
	"简约的整体造型，精致的工艺处理",
	5699.00,
	"images/index/froor_1_8.jpg",
	"product_details.html?pid=51",
	"0"
);


#2楼
INSERT INTO lx_floor VALUES(
	null,
	2,
	0,
	"",
	"",
	0.00,
	'images/index/floor_2_lg.jpg',
	"product_search.html?key=E480 E580",
	"0"
);
INSERT INTO lx_floor VALUES(
	null,
	2,
	1,
	"ThinkPad X1 tablet 平板笔记本 20JBA00E00",
	"灵活多变，当然无惧改变",
	9999.00,
	"images/index/froor_2_1.jpg",
	"javascript:;",
	"1"
);
INSERT INTO lx_floor VALUES(
	null,
	2,
	2,
	"ThinkPad New S2 2017 笔记本电脑 银色 20J3A002CD",
	"效率出众",
	5999.00,
	"images/index/froor_2_2.jpg",
	"product_details.html?pid=188",
	"0"
);
INSERT INTO lx_floor VALUES(
	null,
	2,
	3,
	"ThinkPad T470 笔记本电脑 20JMA00BCD",
	"经典商务，耐用不止一面",
	7299.00,
	"images/index/froor_2_3.jpg",
	"product_details.html?pid=179",
	"1"
);
INSERT INTO lx_floor VALUES(
	null,
	2,
	4,
	"ThinkPad E480 笔记本电脑 20KNA003CD",
	"自成E派",
	5499.00,
	"images/index/froor_2_4.jpg",
	"product_details.html?pid=154",
	"3"
);
INSERT INTO lx_floor VALUES(
	null,
	2,
	5,
	"ThinkPad X270 笔记本电脑 20HNA01FCD",
	"经得起重担，亦无负担",
	5999.00,
	"images/index/froor_2_5.jpg",
	"product_details.html?pid=196",
	"0"
);
INSERT INTO lx_floor VALUES(
	null,
	2,
	6,
	"ThinkPad X1 Carbon 2017 笔记本电脑 20HRA03LCD",
	"以思考，进化时代",
	10999.00,
	"images/index/froor_2_6.jpg",
	"product_details.html?pid=185",
	"2"
);
INSERT INTO lx_floor VALUES(
	null,
	2,
	7,
	"ThinkPad E580 笔记本电脑 20KS0027CD",
	"从不止于思考",
	6799.00,
	"images/index/froor_2_7.jpg",
	"product_details.html?pid=160",
	"3"
);
INSERT INTO lx_floor VALUES(
	null,
	2,
	8,
	"ThinkCentre E75s小型台式机 10QF000JCD",
	"以思考，进化时代",
	4299.00,
	"images/index/froor_2_8.jpg",
	"javascript:;",
	"1"
);


#3楼
INSERT INTO lx_floor VALUES(
	null,
	3,
	0,
	"",
	"",
	0.00,
	'images/item/02bb8de1-2730-4bde-a2e2-943bd34631e3.jpg',
	"javascript:;",
	"0"
);
INSERT INTO lx_floor VALUES(
	null,
	3,
	1,
	"联想Mirage | 星球大战：绝地挑战",
	"星球大战 绝地挑战",
	1999.00,
	"images/item/m3ytMKH2ZACqo8rQehOL9iwH0-8178.w164.jpg",
	"javascript:;",
	"3"
);
INSERT INTO lx_floor VALUES(
	null,
	3,
	2,
	"TAB4 Plus TB-X704F 10.1英寸平板电脑 WIFI版 黑色 ZA2M0015CN",
	"精美外观 轻薄机身",
	2399.00,
	"images/item/uuRL8GFuEKvRgXRV1jSRqAKoF-6653.w164.jpg",
	"javascript:;",
	"3"
);
INSERT INTO lx_floor VALUES(
	null,
	3,
	3,
	"联想P8 平板电脑 8英寸 珍珠白 ZA220024CN",
	"8核高性能 爽玩够畅快",
	899.00,
	"images/item/TFLAXWsXzinQfFlPf47u3xsiD-1419.w164.jpg",
	"javascript:;",
	"1"
);
INSERT INTO lx_floor VALUES(
	null,
	3,
	4,
	"MIIX 5 Pro 二合一笔记本 12英寸 旗舰版 黑色 80VV000PCD",
	"性能强劲 卓尔不群",
	8699.00,
	"images/item/KaHN8Cr3mGylXUD0CnKLEOfNw-8044.w164.jpg",
	"javascript:;",
	"0"
);
INSERT INTO lx_floor VALUES(
	null,
	3,
	5,
	"YOGA 3 Tablet-X50F 10.1英寸 ZA0H0061CN 套装",
	"时尚随身 轻便随型",
	1109.00,
	"images/item/2g64s2c6Ehyyt5swxEalRDoY7-5223.w164.jpg",
	"javascript:;",
	"1"
);
INSERT INTO lx_floor VALUES(
	null,
	3,
	6,
	"YOGA平板 3 8英寸 WiFi版 ZA090052CN",
	"便携神器，享受无忧",
	999.00,
	"images/item/6jq7m07PHtL96Dtqqroi6j7BA-0583.w164.jpg",
	"javascript:;",
	"0"
);
INSERT INTO lx_floor VALUES(
	null,
	3,
	7,
	"MIIX 210 二合一笔记本 10.1英寸 64GB 银色 81C00001CD",
	"多面生活 一本兼得",
	1799.00,
	"images/item/nGZpw6aDeHCF9VIQrTcXzworM-1451.w164.jpg",
	"javascript:;",
	"0"
);
INSERT INTO lx_floor VALUES(
	null,
	3,
	8,
	"MIIX 5 Plus 二合一笔记本 12.2英寸 尊享版 黑色 80XE000ECD",
	"冷静畅行 低躁无扰",
	5899.00,
	"images/item/JWuHVAQeOJoojJw47qa8dKoxt-5331.w164.jpg",
	"javascript:;",
	"0"
);


#4楼
INSERT INTO lx_floor VALUES(
	null,
	4,
	0,
	"",
	"",
	0.00,
	'images/item/b5475373-8f14-4977-9df8-4ddbb7b04bad.jpg',
	"javascript:;",
	"0"
);
INSERT INTO lx_floor VALUES(
	null,
	4,
	1,
	"联想K320t 星夜黑",
	"千元双摄 全面看视界",
	999.00,
	"images/item/N3AtX92N6peN78ZIACI5wgLgX-8515.w164.jpg",
	"javascript:;",
	"3"
);
INSERT INTO lx_floor VALUES(
	null,
	4,
	2,
	"moto z 2018 鎏金黑",
	"传世品质/多样人生/智胜未来",
	9999.00,
	"images/item/23eda743-aa8c-41fd-bc28-7e423d55c900.jpg",
	"javascript:;",
	"3"
);
INSERT INTO lx_floor VALUES(
	null,
	4,
	3,
	"moto z² play 金色",
	"黑武士登场/全像素双核激光对焦拍照",
	2999.00,
	"images/item/3b52f643-3e3f-4cca-9f82-4e4bffe99a8f.jpg",
	"javascript:;",
	"1"
);
INSERT INTO lx_floor VALUES(
	null,
	4,
	4,
	"摩眼-哈苏摄影模块 黑色",
	"10倍光学变焦/更远更清晰",
	2299.00,
	"images/item/b98fea3b-279b-4f84-a2c4-25e82cb03394_1.jpg",
	"javascript:;",
	"0"
);
INSERT INTO lx_floor VALUES(
	null,
	4,
	5,
	"摩电Turbo-快充电池模块",
	"3490mAh真实电量/峰值30W快充",
	549.00,
	"images/item/d53b466c-f4e3-4f3e-bde9-ad778fd4f88b.jpg",
	"javascript:;",
	"0"
);
INSERT INTO lx_floor VALUES(
	null,
	4,
	6,
	"模块优惠套装",
	"套装享9折优惠/再赠模块挎包和摩范",
	5496.00,
	"images/item/513baf92-025e-4dd5-8dbe-d68326d11e6a.jpg",
	"javascript:;",
	"0"
);
INSERT INTO lx_floor VALUES(
	null,
	4,
	7,
	"摩影-投影模块 黑色",
	"70吋随身影院/任意角度轻松投影",
	1999.00,
	"images/item/be9c183c-9f3e-47e8-b0de-7fbc92a3f5d9_1.jpg",
	"javascript:;",
	"1"
);
INSERT INTO lx_floor VALUES(
	null,
	4,
	8,
	"摩电mini-薄电模块 黑色",
	"72g轻薄设计/厚度减少20%",
	499.00,
	"images/item/90af7eb3-82ea-4040-ac9c-b1809ae9c7e8.jpg",
	"javascript:;",
	"0"
);


#5楼
INSERT INTO lx_floor VALUES(
	null,
	5,
	0,
	"",
	"",
	0.00,
	'images/item/fdb74187-06ad-4c90-bf18-31c160cf2cc5_1.jpg',
	"javascript:;",
	"0"
);
INSERT INTO lx_floor VALUES(
	null,
	5,
	1,
	"联想（ThinkVision）X24q 23.8英寸2K超高分辨率纤薄窄边框显示器",
	"",
	1799.00,
	"images/item/e01ayaoBHm7NSljXORcTdpeUB-9260.w164.jpg",
	"javascript:;",
	"0"
);
INSERT INTO lx_floor VALUES(
	null,
	5,
	2,
	"联想（Lenovo）小新智能投影仪 T1",
	"",
	1850.00,
	"images/item/xWHheDQ0ifwfD1jbZzCu7dvve-9208.w164.jpg",
	"javascript:;",
	"0"
);
INSERT INTO lx_floor VALUES(
	null,
	5,
	3,
	"联想UM10C直播版手机麦克风 苹果安卓手机主播K歌话筒 香槟金",
	"",
	299.00,
	"images/item/TnqqUmaWMQKmKLftIuzDDt0Tx-3380.w164.jpg",
	"javascript:;",
	"0"
);
INSERT INTO lx_floor VALUES(
	null,
	5,
	4,
	"联想 智能空气净化器 X500",
	"",
	2399.00,
	"images/item/q62JE1xMCCZkwp2Yr4tNsYsAv-9261.w164.jpg",
	"javascript:;",
	"0"
);
INSERT INTO lx_floor VALUES(
	null,
	5,
	5,
	"联想双模触控无线鼠标N700(橙)",
	"",
	169.00,
	"images/item/CmBZD1aDdZyAQiU1AABrNmEYxUM486.w164.jpg",
	"javascript:;",
	"0"
);
INSERT INTO lx_floor VALUES(
	null,
	5,
	6,
	"联想（Lenovo） KN100无线键鼠套装",
	"",
	99.00,
	"images/item/BRgdwSQ9oh8J4F3RbGHyGVz8C-9162.w164.jpg",
	"javascript:;",
	"0"
);
INSERT INTO lx_floor VALUES(
	null,
	5,
	7,
	"联想 USB3.0 移动硬盘F308 黑 1TB",
	"",
	439.00,
	"images/item/CmBZD1Z4wb2AakwVAABiZrJKxBM144.w164.jpg",
	"javascript:;",
	"0"
);
INSERT INTO lx_floor VALUES(
	null,
	5,
	8,
	"联想65W方口电源适配器(CN)",
	"",
	169.00,
	"images/item/ZLwzTYWaW7w6B32n7XqLYCJah-5788.w164.jpg",
	"javascript:;",
	"0"
);


#6楼
INSERT INTO lx_floor VALUES(
	null,
	6,
	0,
	"",
	"",
	0.00,
	'images/item/a9ce30d5-2f22-46ef-9979-7ec864df6a19.jpg',
	"javascript:;",
	"0"
);
INSERT INTO lx_floor VALUES(
	null,
	6,
	1,
	"Lenovo 笔记本适配器套装（90W 小圆口）",
	"联想原厂 安全可靠",
	199.00,
	"images/item/72cddf07-a9ea-409f-98a2-f0e14f25f3a9_1.jpg",
	"javascript:;",
	"1"
);
INSERT INTO lx_floor VALUES(
	null,
	6,
	2,
	"联想一键服务鼠标N911黑款",
	"",
	59.00,
	"images/item/zTDgVGaCIxS5HjkqkU9Nb8Ng4-0285.w164.jpg",
	"javascript:;",
	"2"
);
INSERT INTO lx_floor VALUES(
	null,
	6,
	3,
	"联想小闲无线U盘 32GB 白色",
	"",
	239.00,
	"images/item/C7uzzaQYrjBEartx4s0O1gQsK-0015.w164.jpg",
	"javascript:;",
	"4"
);
INSERT INTO lx_floor VALUES(
	null,
	6,
	4,
	"联想多功能便携适配器套装 65W方口",
	"手机电脑都能充 小巧便携",
	299.00,
	"images/item/31318f33-efab-4cda-adf8-d0a99fe4c8c1_1.jpg",
	"javascript:;",
	"2"
);
INSERT INTO lx_floor VALUES(
	null,
	6,
	5,
	"联想智能插线板",
	"APP远程控制 防触电保护",
	118.00,
	"images/item/voDgMtr2XlJbbiwdpb8SkhFgJ-7691.w164.jpg",
	"javascript:;",
	"4"
);
INSERT INTO lx_floor VALUES(
	null,
	6,
	6,
	"120G固态硬盘升级服务NGFF(80mm)",
	"快速读写 工程师上门安装",
	799.00,
	"images/item/sYOsCd3R7gR8pgROJWOFRyzIb-4159.w164.jpg",
	"javascript:;",
	"0"
);
INSERT INTO lx_floor VALUES(
	null,
	6,
	7,
	"联想USB 、VGA转接（USB HUB扩展型）",
	"USB和VGA两种接口集于一身",
	249.00,
	"images/item/5OFs9EZRBcExyrUDOquyhfESH-8661.w164.jpg",
	"javascript:;",
	"0"
);
INSERT INTO lx_floor VALUES(
	null,
	6,
	8,
	"笔记本电脑4G内存(联想原厂)",
	"联想原厂 工程师上门安装",
	399.00,
	"images/item/KVdApV0JK2vLe9spkaUctyGSv-7637.w520.jpg",
	"javascript:;",
	"0"
);