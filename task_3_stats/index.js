function calculate_statistics(simulatedData) {
    // Setup statistics data array of objects
    let statisticsData = [];

    // Initialize statisticsData array with empty objects for each sensor
    for (let i = 0; i < 20; i++) {
        statisticsData.push({
            sensor_id: i + 1,
            num_logs: 0,
            temperature: {
                min: Number.MAX_VALUE,
                max: Number.MIN_VALUE,
                avg: 0
            },
            wind_speed: {
                min: Number.MAX_VALUE,
                max: Number.MIN_VALUE,
                avg: 0
            },
            relative_humidity: {
                min: Number.MAX_VALUE,
                max: Number.MIN_VALUE,
                avg: 0
            },
            co2: {
                min: Number.MAX_VALUE,
                max: Number.MIN_VALUE,
                avg: 0
            }
        });
    }

    // Calculate statistics for each sensor
    for (let log of simulatedData) {
        let i = log.sensor_id - 1
        // Number of logs
        statisticsData[i].num_logs++;
        // Temperature max/min
        if (log.temperature < statisticsData[i].temperature.min) {
            statisticsData[i].temperature.min = log.temperature;
        }
        if (log.temperature > statisticsData[i].temperature.max) {
            statisticsData[i].temperature.max = log.temperature;
        }
        // Temperature avg
        statisticsData[i].temperature.avg += log.temperature;

        // Wind speed max/min
        if (log.wind_speed < statisticsData[i].wind_speed.min) {
            statisticsData[i].wind_speed.min = log.wind_speed;
        }
        if (log.wind_speed > statisticsData[i].wind_speed.max) {
            statisticsData[i].wind_speed.max = log.wind_speed;
        }
        // Wind speed avg
        statisticsData[i].wind_speed.avg += log.wind_speed;

        // Humidity max/min
        if (log.relative_humidity < statisticsData[i].relative_humidity.min) {
            statisticsData[i].relative_humidity.min = log.relative_humidity;
        }
        if (log.relative_humidity > statisticsData[i].relative_humidity.max) {
            statisticsData[i].relative_humidity.max = log.relative_humidity;
        }
        // Humidity avg
        statisticsData[i].relative_humidity.avg += log.relative_humidity;

        // C02 max/min
        if (log.co2 < statisticsData[i].co2.min) {
            statisticsData[i].co2.min = log.co2;
        }
        if (log.co2 > statisticsData[i].co2.max) {
            statisticsData[i].co2.max = log.co2;
        }
        // C02 avg
        statisticsData[i].co2.avg += log.co2;
    }

    // Calculate averages
    for (let statistics of statisticsData) {
        statistics.temperature.avg /= statistics.num_logs;
        statistics.wind_speed.avg /= statistics.num_logs;
        statistics.relative_humidity.avg /= statistics.num_logs;
        statistics.co2.avg /= statistics.num_logs;
    }

    return statisticsData;
}


module.exports = async function (context, req, simulatedData, simulatedDataChanges) {
    // Run statistics function
    let statisticsData = calculate_statistics(simulatedData)

    // Log statistics data
    context.log(statisticsData);
}
