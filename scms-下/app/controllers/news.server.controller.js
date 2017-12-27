
var mongoose = require('mongoose'); //导入mongoose，使用news里的模型
var News = mongoose.model('News');   //找出news的mongoose模型

module.exports = {				//导出处理各种请求的方法，通过对象组织
	create: function(req, res, next){
		var news = new News(req.body);  //创建news的实例，传人的参数是post数据
		news.save(function(err){        //保存这个实例
			if(err) return next(err);	//save出现错误执行err同意方法

			return res.json(news);		//save成功，返回这个数据
		});
	},
	list: function(req, res, next){		//news的list方法
		var pagesize = parseInt(req.query.pagesize, 10) ||10;  //每页多少条news
		var pagestart = parseInt(req.query.pagestart, 10) || 1; //从那页开始翻页

		News       
		.find()									//查询
		.skip( (pagestart - 1) * pagesize)      //翻页操作，skip先跳过多少条
		.limit( pagesize)						//只取多少条
		.exec(function(err, docs){              //执行查询，有个回调函数
			if(err) return next(err);           //有错就用统一的错误处理函数处理

			return res.json(docs);				//没有报错就用json就返回所以的文档
		});
	},
	getById: function(req, res, next, id){		//处理路由参数的方法，多了一个id
		if(!id) return next(new Error('News not Found'));  //错误处理，生成Error的实例，并打印出错误提示

		News              						
		 .findOne({_id: id})					//查询，只查询一条数据
		 .exec(function(err, doc){				//执行，出错就用统一的错误处理函数
		 	if(err) return next(err);

		 	if(doc) return next(new Error('News not Found'));  //没有查询到这个文档

		 	res.news = doc;						//没有出错就把这个文档赋给请求对象下的news
		 	return next();						
		 });
	},
	get: function(req, res, next) {				//如果查询到文档，就把getById()函数处理得到的req.news打印出来
		return res.json(res.news);
	}
};
