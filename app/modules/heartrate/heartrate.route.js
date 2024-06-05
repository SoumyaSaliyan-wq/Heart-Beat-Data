const express = require('express');
const router = express.Router();
const heartRateController=require('./heartrate.controller')
const uploadFileMiddleware=require('../../middlewares/uploadfile.middleware')

router.post('/',uploadFileMiddleware.single('file'),heartRateController.processHeartRateData)

module.exports=router