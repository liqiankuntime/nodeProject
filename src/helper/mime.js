/**
 * Created by liqiankun on 2017/11/12.
 */
const path = require('path');

const mimeTypes = {
	'css': 'text/css',
	// 'css':{
	// 	text:'text/css',
	// 	icon:'图片路径'
	// },
	'gif': 'image/gif',
	'html': 'text/html',
	'ico': 'image/x-icon',
	'jpeg': 'image/jpeg',
	'jpg': 'image/jpeg',
	'js': 'text/javascript',
	'json': 'application/json',
	'pdf': 'application/pdf',
	'png': 'image/png',
	'svg': 'image/svg+xml',
	'swf': 'application/x-shockwave-flash',
	'tiff': 'image/tiff',
	'txt': 'text/plain',
	'wav': 'audio/x-wav',
	'wma': 'audio/x-ms-wma',
	'wmv': 'video/x-ms-wmv',
	'xml': 'text/xml'
};

module.exports = (filePath) => {


	let ext = path.extname(filePath)//返回文件名file.js
	.split('.')//按'.'进行分隔成数组
	.pop()//把最后的类型名字弹出
	.toLocaleLowerCase()
	if(!ext){
		ext = filePath;
	}
	return mimeTypes[ext] || mimeTypes['txt'];
}