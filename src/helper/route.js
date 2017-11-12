/**
 * Created by liqiankun on 2017/11/10.
 */
const fs = require('fs');
const path = require('path');
const config = require('../config/defaultConfig');
const mime = require('./mime');
const Handlebars = require('handlebars');
const compress = require('./compress');

const tplPath = path.join(__dirname,'../template/dir');//__dirname:/Users/liqiankun/newHbuilderProjects/nodeProject/src/helper 获取当前文件的路径； 拼接成绝对路径
const source = fs.readFileSync(tplPath);//默认获取的数据是buffer类型   fs.readFileSync(tplPath,'utf-8')
const template = Handlebars.compile(source.toString())//只能接受字符串                    Handlebars.compile(source)



module.exports = function (req,res,filePath) {
		fs.stat(filePath, (err,data) => {
			if(err){
				res.writeHead(404,{'Content-Type':'text/plain'});
				res.end(`${filePath} is not a file or director!`);
				return;
			};

			if(data.isFile()){
				const contentType = mime(filePath);
				//res.writeHead(200,{'Content-Type':contentType})
				res.statusCode = 200;
				res.setHeader('Content-Type',contentType);
				let rs = fs.createReadStream(filePath);

				if(filePath.match(config.compress)){
					rs = compress(rs,req,res)
				}
				rs.pipe(res);
			}else if(data.isDirectory()){
				fs.readdir(filePath, (err,files) => {
					res.writeHead(200,{'Content-Type':'text/html'});
					const dir = path.relative(config.root,filePath);
					console.log('dirr:',dir);
					const data = {
							title:path.basename(filePath),
							files,
							dir:dir ? `/${dir}` : ""
					}
					res.end(template(data));
				})
			}
		})
}