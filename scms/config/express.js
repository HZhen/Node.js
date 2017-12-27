//导出服务器实例，其他地方就可以require使用这个实例
var express = require('express');
var bodyParser = require('body-parser');  //中间件，解析post请求


module.exports = function (){
	console.log('init express...');
	var app = express();

	app.use(bodyParser.json());   //使用中间件，用json来解析body中的数据

	require('../app/routes/news.server.routes')(app);	//导入路由配置

	app.use(function(req, res,next){    //在客户端请求了不存在的资源，报404
		res.status(404);
		try{
			return res.json('Not Found');
		}catch(e) {
			console.error('404 set header after sent');
		}
	});

	app.use(function(err, req, res, next){  //统一处理错误
		if(!err) {return next()}
		res.status(500);
		try{
			return res.json(err.message || 'server error');
		}catch(e) {
			console.error('500 set header after sent');
		}
	});

	return app;  //返回这个实例
};