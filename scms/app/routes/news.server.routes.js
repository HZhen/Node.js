// 路由文件，把用户的请求分配给响应的控制器代码
var NewsController = require('../controllers/news.server.controller.js');  //导入控制器

module.exports = function(app){					//导出，并传人express的实例
	app.route('/news')							//app.route：使用路由
		.get(NewsController.list)				//获取列表，使用news控制器下list方法
		.post(NewsController.create);			//创建列表，使用news控制器下create方法

	app.route('/news/:id')
		.get(NewsController.get);               //针对某一条新闻，返回news详情的get方法

	app.param('id', NewsController.getById);

};