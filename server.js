const http = require('http');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

http.createServer((req,res)=>{

    const files = req.url ==='/' ? 'index.html' : req.url;
    const filePath = path.join(__dirname,'public',files);
    const extname = path.extname(filePath);

    const allowedFileTypes = ['.html', '.css','.js'];
    const allowed = allowedFileTypes.find(item => item == extname);

    if(!allowed) return;

    fs.readFile(filePath,(err, content) =>{
        if(err) throw err;
        res.end(content);
    });
}).listen(7777,()=>{console.log("Servidor Rodando")});