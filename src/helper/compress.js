/**
 * Created by liqiankun on 2017/11/12.
 */
const {createGzip, createDeflate} = require('zlib');
console.log('acceptEncoding')
module.exports = (rs ,req, res) => {
	const acceptEncoding = req.headers['accept-encoding'];
	console.log('acceptEncoding',acceptEncoding);
	if(!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)){
			console.log('nullRS:');
		return rs;
	}else if(acceptEncoding.match(/gzip/)){
		res.setHeader('Content-Encoding','gzip');
		return rs.pipe(createGzip());
	}else if(acceptEncoding.match(/\bdeflate\b/)){
		res.setHeader('Content-Encoding','deflate');
		return rs.pipe(createDeflate());
	}
}








