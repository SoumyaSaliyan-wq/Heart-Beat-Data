const multer = require('multer');
const path = require('path');
const fs = require('fs');
const MAX_FILE_SIZE_BYTES=10 * 1024 * 1024//10mb
let storagePath;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folderPath='app/data/'
        if (file.fieldname == 'file') {
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath);
            }
            storagePath = folderPath;
        }
        cb(null, storagePath)
    },
    filename: function (req, file, cb) {
        if (!file.originalname.match(/\.(json)$/i)) {
            console.log('Not valid JSON file');
            req.isInvalid = true; // Set a flag to indicate invalid file
            return cb(new Error('INVALID_FILE_TYPE')); // Reject the file
          }
        else if (!file) {
            req.file = null
        }
        if (file.size > MAX_FILE_SIZE_BYTES) {
            console.log('File size exceeds the limit');
            return cb(new Error('File size exceeds the limit'));
        }
        cb(null, 'data.json')
    }
});
const uploadImage = multer({ storage: storage });
module.exports = uploadImage;