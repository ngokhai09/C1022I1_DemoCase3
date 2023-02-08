const fs = require('fs')
const formidable = require('formidable');
const { dir } = require('console');
let demo = {
    '/demo': (req,res)=>{
        if(req.method === 'GET'){
            fs.readFile('./views/upload.html', 'utf-8', (err, data)=>{
                if(err){
                    console.log(err);
                }
                res.writeHead(200, {"Content-type" : 'text/html'});
                res.write(data);
                res.end();
            })
        }
        else{
            let form = new formidable.IncomingForm();
            console.log(form);
            form.uploadDir = './uploads/';
            form.parse(req, (err, fields, files)=>{
                let tmpPath = files.avatar.filepath;
                let dirPath = form.uploadDir + files.avatar.originalFilename;
                fs.rename(tmpPath, dirPath, (err)=>{
                    if(err)console.log(err);
                    else res.write("Success");
                    res.end();
                })
            })
        }
    }
}

module.exports = demo;