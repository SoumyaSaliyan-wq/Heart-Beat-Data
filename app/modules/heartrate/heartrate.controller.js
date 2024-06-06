const heartRateHelper = require('./heartrate.helper')
const fs = require('fs');
const responseHelper = require('../../helpers/response.helper');
const responseMessageHelper = require('../../helpers/response_message.helper')
const logger = require('../../utils/logger');
const batchSize = 100;
const path = require('path');
const hearRateService = require('../heartrate/heartrate.service');

module.exports.processHeartRateData = (req, res) => {
    try {
        if (!req.file)
            return responseHelper.badRequestError(res, 'Please select a file to upload')
        let filePath = path.join(process.cwd(), 'app', 'data', 'data.json')
        fs.readFile(filePath, 'utf8', async (err, data) => {
        if (err) {
            return responseHelper.badRequestError(res, responseMessageHelper.heartBeat.ERROR)
        }
        const jsonData = JSON.parse(data);
        const processedData = heartRateHelper.processBatch(jsonData, batchSize);
        let findResult = await hearRateService.findData({ patient_id: jsonData.patient_id })
        if (findResult) {
            await hearRateService.updateData({ data: processedData }, { patient_id: jsonData.patient_id })

        } else {
            await hearRateService.createData({ data: processedData, patient_id: jsonData.patient_id })
        }
        return responseHelper.success(res, responseMessageHelper.heartBeat.SUCCESS, processedData)
        })
    }
    catch (error) {
        logger.error('Error parsing JSON data:', error);
        return responseHelper.serverError(res, responseMessageHelper.errorMessages.SERVER_ERROR)
    }
}

