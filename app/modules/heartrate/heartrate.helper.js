module.exports.aggregateHeartRate=(data) =>{
    const heartRateData = data.clinical_data.HEART_RATE.data;
    const intervals = [];
    const intervalData = {};

    // Parse date and sort data
    heartRateData.sort((a, b) => new Date(a.on_date) - new Date(b.on_date));

    heartRateData.forEach(entry => {
        const dt = new Date(entry.on_date);
        const measurement = parseInt(entry.measurement);

        // Calculate the start of the 15-minute interval
        const intervalStart = new Date(dt);
        intervalStart.setMinutes(Math.floor(dt.getMinutes() / 15) * 15, 0, 0);
        const intervalEnd = new Date(intervalStart);
        intervalEnd.setMinutes(intervalEnd.getMinutes() + 15);

        const intervalKey = intervalStart.toISOString();

        if (!intervalData[intervalKey]) {
            intervalData[intervalKey] = {
                from_date: intervalStart.toISOString(),
                to_date: intervalEnd.toISOString(),
                measurements: []
            };
        }

        intervalData[intervalKey].measurements.push(measurement);
    });

    // Aggregate measurements
    for (const key in intervalData) {
        const measurements = intervalData[key].measurements;
        intervalData[key].measurement = {
            low: Math.min(...measurements),
            high: Math.max(...measurements)
        };
        delete intervalData[key].measurements;
        intervals.push(intervalData[key]);
    }

    return {
        clinical_data: {
            HEART_RATE: intervals
        }
    };
}

module.exports.processBatch=(data, batchSize) =>{
    const totalRecords = data.clinical_data.HEART_RATE.data.length;
    let processedData = [];

    for (let i = 0; i < totalRecords; i += batchSize) {
        const batch = data.clinical_data.HEART_RATE.data.slice(i, i + batchSize);
        const processedBatch = heartRateHelper.aggregateHeartRate({ clinical_data: { HEART_RATE: { data: batch } } });
        processedData = processedData.concat(processedBatch.clinical_data.HEART_RATE);
    }
    data.clinical_data.HEART_RATE.data = processedData
    return data
}
