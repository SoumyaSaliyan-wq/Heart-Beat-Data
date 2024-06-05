const express = require('express');
const router = express.Router();
const heartRateRouter=require('../modules/heartrate/heartrate.route')


router.use('/heart',heartRateRouter)

module.exports=router