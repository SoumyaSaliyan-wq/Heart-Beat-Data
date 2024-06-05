const express = require('express');
const router = express.Router();
const heartRateController=require('./heartrate.controller')

router.get('/',heartRateController.processHeartRateData)

module.exports=router