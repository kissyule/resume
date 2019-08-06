//连接池模块
const mysql = require("mysql"),
    host = "127.0.0.1",
    user = "root",
    password = "",
    database = "lenovo",
    port = 3306,
    connectionLimit = 5
let pool = mysql.createPool({host,user,password,database,port,connectionLimit})
module.exports = pool