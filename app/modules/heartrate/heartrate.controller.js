const heartRateHelper=require('./heartrate.helper')
const fs = require('fs');
const responseHelper=require('../../helpers/response.helper');
const responseMessageHelper=require('../../helpers/response_message.helper')
const logger = require('../../utils/logger');
const batchSize = 100;
const path = require('path');

module.exports.processHeartRateData = (req, res) => {
    try {
        if (!req.file)
            return responseHelper.badRequestError(res, 'Please select a file to upload')
        let filePath=path.join(process.cwd(), 'app','data','data.json')
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return responseHelper.badRequestError(res, responseMessageHelper.heartBeat.ERROR)
            }
            const jsonData = JSON.parse(data);
            const processedData = heartRateHelper.processBatch(jsonData, batchSize);
            return responseHelper.success(res, responseMessageHelper.heartBeat.SUCCESS, processedData)
        })
    }
    catch (error) {
        logger.error('Error parsing JSON data:', error);
        return responseHelper.serverError(res, responseMessageHelper.errorMessages.SERVER_ERROR)
    }
}

