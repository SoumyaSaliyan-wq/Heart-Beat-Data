const heartRateHelper=require('./heartrate.helper')
const fs = require('fs');
const responseHelper=require('../../helpers/response.helper');
const responseMessageHelper=require('../../helpers/response_message.helper')
const logger = require('../../utils/logger');
const batchSize = 100;
module.exports.processHeartRateData = (req, res) => {
    try {
        fs.readFile('data.json', 'utf8', (err, data) => {
            if (err) {
                return responseHelper.badRequestError(res, 'File reading error')
            }
            const jsonData = JSON.parse(data);
            const processedData = heartRateHelper.processBatch(jsonData, batchSize);
            return responseHelper.success(res, 'Aggregated Heart Rate', processedData)
        })
    }
    catch (error) {
        logger.error('Error parsing JSON data:', error);
        return responseHelper.serverError(res, responseMessageHelper.errorMessages.SERVER_ERROR)
    }
}

