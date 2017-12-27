//读取环境变量的文件,没有环境变量就是读取开发环境下自定义的配置
var config = null;

if(process && process.env && process.env.NODE_ENV) {
	config = require('./env/' + process.env.NODE_ENV + '.js');
}else {
	config = require('./env/development.js');
}

module.exports = config;  //导出config，这样在其他文件就可以require就可以访问配置文件