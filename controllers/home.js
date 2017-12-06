const path= require('path');
const fs = require('fs');
const uuidv4 = require('uuid/v4');
module.exports = function(formidable,Image,aws){
    return {
        SetRouting: function(router){
            router.get('/home', this.homePage,this.getUploadImage);
          //  router.get('/upload', this.getUploadImage); 
            router.post('/uploadFile', aws.Upload.any(), this.uploadFile);
            router.post('/home',this.ImagePostPage);
        },

        getUploadImage: function(req, res){
            const errors = req.flash('error');
            return res.render('index', {title: 'Cards AR | Login', messages: errors, hasErrors: errors.length > 0});
        },

        ImagePostPage:function(req,res){
           
            const newImage = new Image();
            newImage.name = req.body.club;
            newImage.album = req.body.country;
            newImage.image = req.body.upload;
            newImage.save((err) => {
                res.render('home');
            })
        },

        
        
        
        homePage:function(req,res){
            return res.render('home');
        },
        uploadFile: function(req, res) {
            const form = new formidable.IncomingForm();
            form.uploadDir=path.join(__dirname,'../public/uploads');

            form.on('file', (field, file) => {
                fs.rename(file.path,path.join(form.uploadDir,uuidv4()+'.jpg'),(err)=>{
                    if(err)throw err;
                    console.log("file renamed");
                })

            });
            
            form.on('error', (err) => {
                console.log(err);
            });
            
            form.on('end', () => {
                console.log("upload successful");
                
            });
            
            form.parse(req);
        }
        
    }
}

























