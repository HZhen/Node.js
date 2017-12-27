var mongoose = require('mongoose');  //导入模拟mongoose模块

var NewsSchema = new mongoose.Schema({  //创建Schema数据对象
	title: String,
	content: String,
	createTime: {type: Date, default: Date.now}
});

//创建文档模型
var News = mongoose.model('News', NewsSchema);   //创建模型
module.exports = News;		