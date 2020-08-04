var http = require('http');
var fs = require('fs');
var path = require('path');
formidable = require('formidable');

var indice = 0;

http.createServer(function (request, response) {
    console.log('request ', request.url);
    //console.log(request);
    //console.log(++indice);

    if( request.url == '/fileupload' ) {

        var form = new formidable.IncomingForm();
        form.parse(request, function (err, fields, files) {
          var oldpath = files.filetoupload.path;
          var newpath = '../' + files.filetoupload.name;
          fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            //response.write('File uploaded and moved!');
            //response.end('<h1>Arquivo Carregado com sucesso','utf-4');
            //return;
          });
        
        });
    
    }
            
    



    var filePath = '.' + request.url;
    if (filePath == './' || filePath == './server.js' || filePath == './fileupload' ) {
        filePath = './index.html';
    }

    var extname = String(path.extname(filePath)).toLowerCase();
    var contentType = 'text/html';
    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.svg': 'application/image/svg+xml'
    };

    contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end();
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(5000);
console.log('Server running.');
 