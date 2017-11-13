/**
 * Created by liqiankun on 2017/11/10.
 */
module.exports = {
	root:process.cwd(),
	port:3000,
	hostName:'127.0.0.1',
	compress:/\.(html|js|css|md|png|json)/,
	catch:{
			maxAge:600,
			expires:true,
			cacheControl:true,
			lastModified:true,
			etag:true
	}
}