const multer = require("multer");
const fileTypeMap = {
    'image/png' : 'png',
    'image/jpeg' : 'jpeg',
    'image/jpg' : 'jpg'
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = fileTypeMap[file.mimetype];
        let uploadError = new Error('Invalid Image Type');
        if(isValid){
            uploadError = null
        }
        cb(uploadError, 'images')
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-');
        const extension = fileTypeMap[file.mimetype];
        cb(null,`${fileName}-${Date.now()}.${extension}`)
    }
})

module.exports = multer({storage:storage}).single("image")