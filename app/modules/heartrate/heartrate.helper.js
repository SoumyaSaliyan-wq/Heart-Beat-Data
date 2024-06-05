
const interval=15;
const aggregateHeartRate = (data) => {
    const heartRateData = data.clinical_data.HEART_RATE.data;
    heartRateData.sort((a, b) => new Date(a.on_date) - new Date(b.on_date));
    let i = 0;
    let output = []
    while (i < heartRateData.length) {
        let intervalStart = new Date(heartRateData[i].on_date);
        let intervalEnd = new Date(heartRateData[i].on_date);
        intervalEnd.setMinutes(intervalEnd.getMinutes() + interval);

        let filteredData = heartRateData.filter((entry) => {
            return (new Date(entry.on_date) >= intervalStart && new Date(entry.on_date) <= intervalEnd);
        });

        if (filteredData.length === 0) {
            i++;
            continue; // Skip to the next iteration if filteredData is empty
        }
        const measurements = filteredData.map(entry => parseFloat(entry.measurement));
        const min = Math.min(...measurements);
        const max = Math.max(...measurements);
        let intervalData = {
            from_date: intervalStart,
            to_date: intervalEnd,
            measurement: {
                min,
                max
            }

        }
        output.push(intervalData)
        i += filteredData.length;//the last filtered data will be the next startinterval 
    }
    return {
        clinical_data: {
            HEART_RATE: output
        }
    }

}
module.exports.processBatch=(data, batchSize) =>{
    const totalRecords = data.clinical_data.HEART_RATE.data.length;
    let processedData = [];

    for (let i = 0; i < totalRecords; i += batchSize) {
        const batch = data.clinical_data.HEART_RATE.data.slice(i, i + batchSize);
        const processedBatch = aggregateHeartRate({ clinical_data: { HEART_RATE: { data: batch } } });
        processedData = processedData.concat(processedBatch.clinical_data.HEART_RATE);
    }
    data.clinical_data.HEART_RATE.data = processedData
    return data
}
