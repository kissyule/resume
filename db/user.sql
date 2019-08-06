SET NAMES UTF8;
DROP DATABASE IF EXISTS lenovo;
CREATE DATABASE lenovo CHARSET=UTF8;
USE lenovo;
CREATE TABLE lx_user (
    uid INT PRIMARY KEY AUTO_INCREMENT,
    uname VARCHAR(32) NOT NULL DEFAULT '',  #昵称
    phone VARCHAR(16) NOT NULL DEFAULT '',  #手机号
    email VARCHAR(32) NOT NULL DEFAULT '',  #邮箱
    upwd VARCHAR(32) NOT NULL DEFAULT '',
    avatar VARCHAR(128) NOT NULL DEFAULT 'images/header/user.png',    #用户头像路径
    user_name VARCHAR(32) NOT NULL DEFAULT '',  #用户姓名
    gender ENUM('-1','1','0') NOT NULL DEFAULT '-1',    #用户性别 0：女 1：男 -1:保密
	home varchar(16) NOT NULL DEFAULT '0/0/0', #省市区信息
    birthday DATETIME NOT NULL DEFAULT 0,    #生日
    registrationTime DATETIME NOT NULL DEFAULT 0    #注册时间
);