1.本项目部分基于node.js 8.11.0版编写，部署时请确保电脑中安装有node.js 8.11.0及其以上版本。
2.使用命令行（cmd）查询本机IP地址（ipcomfig）并记住
3.找到node目录下app文件，将第16行176.233.27.253改为当前计算机IP地址
4.在js目录下，找到header.js、index.js、product_search.js，将文件中的所有176.233.27.253（header.js一处、index.js三处、product_search.js一处）改为当前计算机IP地址（注意：不要修改协议名及端口号）
5.在命令行（cmd）执行node目录上app.js文件（node   //app.js的绝对路径）