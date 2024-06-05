const heartRateHelper=require('./heartrate.helper')
const fs = require('fs');
const { Transform } = require('stream');
const ndjson = require('ndjson')
module.exports.processHeartRateData = (req, res) => {
    try {
        fs.readFile('data.json', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return;
            }
            
            try {
                // Parse the JSON data
                const jsonData = JSON.parse(data);
                const batchSize = 100;
                const processedData = heartRateHelper.processBatch(jsonData, batchSize);
                res.json(processedData)
                // Use the JSON data
                console.log(jsonData);
            } catch (error) {
                // Handle any errors that occur during JSON parsing
                console.error('Error parsing JSON data:', error);
            }
        });
        
    }
    catch (error) {
        console.log(error);
    }
}

