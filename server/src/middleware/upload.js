const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        fs.mkdir('./uploads/',(err)=>{
           cb(null, './uploads/');
        });
      },
    filename: function (req, file, cb) {
        console.log(file)
        cb(null, 'nosTech' + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    let filetypes = /jpeg|jpg|png/;
    let mimetype = filetypes.test(file.mimetype);
    let extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
    return cb(null, true);
    }else{
        req.fileValidationError = "Error: File upload only supports the following filetypes - " + filetypes;
        return cb(null, false, req.fileValidationError);
    }
};

let upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

module.exports = upload.single('image')