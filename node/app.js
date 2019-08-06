//加载响应模块 http/express/mysql/body-parser/cookie-parser/express-session
const http = require("http"),
    express = require("express"),
    bodyParser = require("body-parser"),            //post
    cookieParser = require("cookie-parser"),        //session
    expressSession = require("express-session"),    //session
    cors = require("cors"),                         //跨域
    pool = require("./pool"),                       //连接池
	pageReg = /^[0-9]{1,10}$/
let app = express(),
    server = http.createServer(app)
server.listen(5050)
//配置第三方模块
//1.配置跨域模块
app.use(cors({
    origin:["http://127.0.0.1","http://176.233.29.27"],   //origin允许来自哪个域名下的跨域访问,数组，支持多个同时允许
    credentials:true
}))
//2.配置post模块 req.body.uname
app.use(bodyParser.urlencoded({extended:false}))    //自动将参数转码
//3.配置cookie/session模块
app.use(cookieParser())
app.use(expressSession({
    resave:false,            //每次请求是否需要重新设置session
    saveUninitialized:true,  //每次请求是否需要重新设置session的cookie值
    secret:"wuChuanJi"       //http加密传输，密钥
}))
//模块1.商品查询页面
//http://127.0.0.1:5050/search?pno=1&key=黑&brand=ThinkPad&f_name=E系列&p_name=E470&cpu_d=i7&memory_d=8GB&disk_d=500GB&screen_size=1366x768&screen_inch=14.0英寸
app.get("/search",(req,res)=>{
    let key = req.query.key,
	    brand = req.query.brand,
	    f_name = req.query.f_name,
	    p_name = req.query.p_name,
	    cpu_d = req.query.cpu_d,
	    memory_d = req.query.memory_d,
	    disk_d = req.query.disk_d,
	    screen_inch = req.query.screen_inch,
	    screen_size = req.query.screen_size,
	    pno = req.query.pno,
        brand_i = "",
        f = "",
	    p = "",
	    cpu = "",
	    memory = "",
        disk = "",
        inch = "",
        size = "",
	    input = [],
	    output = {},
	    canRes = 0,
	    keyLength = 0
	if(pno===undefined||pno===""||!pageReg.test(pno)||pno<=0){
    	pno = 1
	}
	if(brand !== undefined && brand!==""){
		brand_i = "(y.brand = ?)AND"
		input.push(brand)
	}
	if(f_name !== undefined && f_name!==""){
		f = "(y.f_name = ?)AND"
		input.push(f_name)
	}
	if(p_name !== undefined && p_name!==""){
		p = "(z.p_name = ?)AND"
		input.push(p_name)
	}
	if(cpu_d !== undefined && cpu_d!==""){
		cpu = "(x.cpu_d = ?)AND"
		input.push(cpu_d)
	}
	if(memory_d !== undefined && memory_d!==""){
		memory = "(x.memory_d = ?)AND"
		input.push(memory_d)
	}
	if(disk_d !== undefined && disk_d!==""){
		disk = "(x.disk_d = ?)AND"
		input.push(disk_d)
	}
	if(screen_inch !== undefined && screen_inch!==""){
		inch = "(x.screen_inch = ?)AND"
		input.push(screen_inch)
	}
	if(screen_size !== undefined && screen_size!==""){
		size = "(x.screen_size = ?)AND"
		input.push(screen_size)
	}
    if(key===undefined){
        key = "%"
    }else{
	    key = trim(key)
    	let arr = key.split(" ")
	    for(keyLength=0;keyLength<arr.length;keyLength++){
	    	key = "%"+arr[keyLength]+"%"
		    input.push(key,key)
	    }
    }
	let sql_all = "SELECT x.pid,x.title,x.category,x.subtitle,x.price,x.promise,x.images,y.brand,y.f_name,z.p_name ",
		sql_brand = "SELECT x.pid,y.brand ",
		sql_f_name = "SELECT x.pid,y.f_name ",
		sql_p_name = "SELECT x.pid,z.p_name ",
		sql_cpu = "SELECT x.pid,x.cpu_d ",
		sql_disk = "SELECT x.pid,x.disk_d ",
		sql_memory = "SELECT x.pid,x.memory_d ",
		sql_inch = "SELECT x.pid,x.screen_inch ",
		sql_size = "SELECT x.pid,x.screen_size ",
		sql_2 = "FROM lx_product AS x INNER JOIN lx_product_family AS y on x.fid=y.fid INNER JOIN lx_product_team AS z ON x.tid=z.tid WHERE",
		sql_3 = brand_i + f + p + cpu + memory + disk + inch + size,
		sql_key = "( x.title LIKE ? OR x.subtitle LIKE ? )",
		sql_4 = "",
		sql_5 = "ORDER BY x.category ASC ",
		sql_6 = "LIMIT ?,20"
	for(let i=0;i<keyLength;i++){
		sql_4+=sql_key
    	if(i<keyLength-1){
		    sql_4+=" OR "
	    }
	}
	pool.getConnection((err,conn)=>{
		if(err) throw err
		conn.query("SELECT COUNT(pid) AS pageAll "+sql_2+sql_3+sql_4,input,(err,result)=>{
			if(err) throw err
			if(result[0].pageAll===0){
				res.json({code:-1,msg:"查询失败,请尝试其他关键词"})
				conn.release()
				return
			}
			output.sum_all = result[0].pageAll
			output.pageCount = Math.ceil(output.sum_all/20)
			if(output.pageCount<pno){
				pno = output.pageCount
			}
			output.pno = parseInt(pno)
			input.push((parseInt(pno)-1)*20)
			conn.query(sql_all+sql_2+sql_3+sql_4+sql_5+sql_6,input,(err,result)=>{
				if(err) throw err
				canRes++
				output.data = result
				if(canRes===9){
					res.json(output)
					conn.release()
				}
			})
			conn.query(sql_brand+sql_2+sql_3+sql_4+"GROUP BY y.brand "+sql_5,input,(err,result)=>{
				if(err) throw err
				canRes++
				output.brand = result
				if(canRes===9){
					res.json(output)
					conn.release()
				}
			})
			conn.query(sql_f_name+sql_2+sql_3+sql_4+"GROUP BY y.f_name "+sql_5,input,(err,result)=>{
				if(err) throw err
				canRes++
				output.f_name = result
				if(canRes===9){
					res.json(output)
					conn.release()
				}
			})
			conn.query(sql_p_name+sql_2+sql_3+sql_4+"GROUP BY z.p_name "+sql_5,input,(err,result)=>{
				if(err) throw err
				canRes++
				output.p_name = result
				if(canRes===9){
					res.json(output)
					conn.release()
				}
			})
			conn.query(sql_cpu+sql_2+sql_3+sql_4+"GROUP BY x.cpu_d "+sql_5,input,(err,result)=>{
				if(err) throw err
				canRes++
				output.cpu_d = result
				if(canRes===9){
					res.json(output)
					conn.release()
				}
			})
			conn.query(sql_disk+sql_2+sql_3+sql_4+"GROUP BY x.disk_d "+sql_5,input,(err,result)=>{
				if(err) throw err
				canRes++
				output.disk_d = result
				if(canRes===9){
					res.json(output)
					conn.release()
				}
			})
			conn.query(sql_memory+sql_2+sql_3+sql_4+"GROUP BY x.memory_d "+sql_5,input,(err,result)=>{
				if(err) throw err
				canRes++
				output.memory_d = result
				if(canRes===9){
					res.json(output)
					conn.release()
				}
			})
			conn.query(sql_inch+sql_2+sql_3+sql_4+"GROUP BY x.screen_inch "+sql_5,input,(err,result)=>{
				if(err) throw err
				canRes++
				output.screen_inch = result
				if(canRes===9){
					res.json(output)
					conn.release()
				}
			})
			conn.query(sql_size+sql_2+sql_3+sql_4+"GROUP BY x.screen_size "+sql_5,input,(err,result)=>{
				if(err) throw err
				canRes++
				output.screen_size = result
				if(canRes===9){
					res.json(output)
					conn.release()
				}
			})
		})
	})
	//清楚字符串前后空格方程
	function trim(s){
		return s.replace(/(^\s*)|(\s*$)/g, "");
	}
})

//模块2.楼层加载页面
//http://127.0.0.1:5050/floor
app.get("/floor",(req,res)=>{
	pool.getConnection((err,conn)=>{
		if(err) throw err
		let sql = "SELECT floor,num,name,title,price,img,href,detail FROM lx_floor"
		conn.query(sql,(err,result)=>{
			if(err) throw err
			res.json(result)
			conn.release()
		})
	})
})

//模块3.明星单品轮播模块
//http://127.0.0.1:5050/banner_md
app.get("/banner_md",(req,res)=>{
	pool.getConnection((err,conn)=>{
		if(err) throw err
		let sql = "SELECT img,href,name,title,price FROM lx_banner_md"
		conn.query(sql,(err,result)=>{
			if(err) throw err
			res.json(result)
			conn.release()
		})
	})
})

//模块4.小轮播模块
//http://127.0.0.1:5050/banner_sm
app.get("/banner_sm",(req,res)=>{
	pool.getConnection((err,conn)=>{
		if(err) throw err
		let sql = "SELECT href,title FROM lx_banner_sm"
		conn.query(sql,(err,result)=>{
			if(err) throw err
			res.json(result)
			conn.release()
		})
	})
})

//模块5.大轮播模块
//http://127.0.0.1:5050/banner_lg
app.get("/banner_lg",(req,res)=>{
	pool.getConnection((err,conn)=>{
		if(err) throw err
		let sql = "SELECT img,href,title FROM lx_banner_lg"
		conn.query(sql,(err,result)=>{
			if(err) throw err
			res.json(result)
			conn.release()
		})
	})
})