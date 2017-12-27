//把各个配置文件引入进来，该实例化的实例化，该执行的执行
var express = require('./config/express.js');
var mongodb = require('./config/mongoose.js');

var db = mongodb();
var app = express();   //执行express的配置文件的导出函数的，生成express的实例app

module.exports = app;   //把app实例导出，以便在bin/www下使用