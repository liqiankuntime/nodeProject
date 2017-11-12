/**
 * Created by liqiankun on 2017/11/12.
 */

const http = require('http');
const config = require('./config/defaultConfig');
const fs = require('fs');
const path = require('path');
const route = require('./helper/route');
const tplPath = path.join(__dirname,'./template/dir');
const server = http.createServer((req, res) => {
		const filePath = path.join(config.root,req.url);

		route(req, res, filePath);


});

server.listen(config.port,config.hostName,() => {
		console.log(`running at ${config.hostName}:${config.port},${tplPath}`);
})