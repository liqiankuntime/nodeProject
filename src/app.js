/**
 * Created by liqiankun on 2017/11/10.
 */

const http = require('http');
const config = require('./config/defaultConfig');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
	const filePath = path.join(config.root,req.url);

	fs.stat(filePath, (err,data) => {
		if(err){
			res.writeHead(404,{'Content-Type':'text/plain'});
			res.end(`${filePath} is not a file or director!`);
			return;
		};

		if(data.isFile()){
			fs.createReadStream(filePath).pipe(res);
		}else if(data.isDirectory()){
			fs.readdir(filePath, (err,files) => {
				res.writeHead(200,{'Content-Type':'text/plain'});
				res.end(files.join(','));
			})
		}
	})

});

server.listen(config.port,config.hostName,() => {
	console.log(`running at ${config.hostName}:${config.port}`);
})