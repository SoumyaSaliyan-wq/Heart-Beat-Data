const responseHelper = require('../helpers/response.helper');
const multer = require('multer');

const validateImage = async (err,req, res, next) => {
    console.log(err.message)
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                return res.status(400).send({ error: "Unexpected form field.Please use 'file' as the field name." });
            }
        }
        if(err.message==='INVALID_FILE_TYPE'){
            return res.status(400).send({ error: "Not a valid json file" });
        }
        
        next(err);
};

module.exports = validateImage