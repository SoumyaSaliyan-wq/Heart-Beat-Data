const express = require('express');
const path = require('path');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const config = require('../config');
const logger=require('./utils/logger');
const indexRouter=require('./routes')
const port = config.port
const db=require('./db/config')
const rateLimiter = require('./middlewares/ratelimiter.middleware');
const validateImage=require('./middlewares/mutler.middleware')
const heartRate=require('./models/heartrate.model')
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json());
app.use(xss());
app.use(rateLimiter);


app.use('/',indexRouter);
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use(validateImage);

app.listen(port, function () {
  console.log('App listening on port '+ port);
  logger.info('App listening on port ')
});

module.exports=app