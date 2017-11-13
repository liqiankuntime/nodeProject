/**
 * Created by liqiankun on 2017/11/12.
 */
const config = require('../config/defaultConfig');


function refreshRes(stats,res) {
		const maxAge = config.catch.maxAge;
		const expires = config.catch.expires;
		const cacheControl = config.catch.cacheControl;
		const lastModified = config.catch.lastModified;
		const etag = config.catch.etag;

		if(expires){
				res.setHeader('Expires',(new Date( Date.now()+maxAge*1000 )).toUTCString());
		};

		if(cacheControl){
				res.setHeader('Cache-Controlv',`public,max-age=${maxAge}`);
		};
		if(lastModified){
				res.setHeader('Last-Modified',stats.mtime.toUTCString());
		};
		if(etag){
				res.setHeader('Etag',`${stats.size}-${stats.mtime}`);
		};
}


module.exports = function isFresh(stats,req,res) {
		refreshRes(stats,res);
		const lastModified = req.headers['if-modified-since']//从浏览器的请求头中获取
		const etag = req.headers['if-none-match'];
		
		if(!lastModified && !lastModified){//客户端没有给这两个信息：说明是第一次请求
			return false;
		};
		if(lastModified && lastModified !== res.getHeader('Last-Modified')){//说明失效了
			return false;
		}
		if(etag && etag !== res.getHeader('Etag')){
			return false;
		}
		
		return true;
}