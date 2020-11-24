const express = require('express');
const router = express.Router();
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination(req,file,cb) {
        cb(null,'uploads/')
    },
    filename(req,file,cb) {
        cb(null, `${file.originalname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

function checkFileType(file,cb) {
    const filetypes = /webm|mp4/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if(extname && mimetype) {
        return cb(null, true)
    }else {
        cb('Videos only')
    }
}

const upload = multer({
    storage,
    fileFilter: function(req,file,cb) {
        checkFileType(file,cb)
    }
})

router.post('/', upload.array('video',2), (req,res) => {
    const videos = []
    for(const path of req.files) {
        videos.push(path.path);
    }
    console.log(videos)
    res.send(videos)
})


module.exports = router;