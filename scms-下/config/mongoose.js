//mongoose配置文件
var mongoose = require('mongoose');
var config = require('./config.js');

// 使用mongoose连接数据库
module.exports = function(){

	mongoose.Promise = global.Promise;  
	var db = mongoose.connect(config.mongodb,{useMongoClient: true});

	require('../app/models/news.server.model.js');

	return db;
};