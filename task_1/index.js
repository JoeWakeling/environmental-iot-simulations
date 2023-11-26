// Constants for sensor data ranges
const MIN_TEMP = 8;
const MAX_TEMP = 15;
const VARIATION_TEMP = 1;

const MIN_WIND_SPEED = 15;
const MAX_WIND_SPEED = 25;
const VARIATION_WIND_SPEED = 3;

const MIN_HUMIDITY = 40;
const MAX_HUMIDITY = 70;
const VARIATION_HUMIDITY = 5;

const MIN_C02 = 500;
const MAX_C02 = 1500;
const VARIATION_C02 = 100;

// Constant for number of sensors
const NUM_SENSORS = 20;

// Generate random int between min and max parameters inclusive
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Get a random sensor data object
function generateWeatherData() {
    return {
        temperature: getRandomNumber(MIN_TEMP + VARIATION_TEMP, MAX_TEMP - VARIATION_TEMP),
        windSpeed: getRandomNumber(MIN_WIND_SPEED + VARIATION_WIND_SPEED, MAX_WIND_SPEED - VARIATION_WIND_SPEED),
        humidity: getRandomNumber(MIN_HUMIDITY + VARIATION_HUMIDITY, MAX_HUMIDITY - VARIATION_HUMIDITY),
        c02: getRandomNumber(MIN_C02 + VARIATION_C02, MAX_C02 - VARIATION_C02),
    };
}

// Generate NUM_SENSORS sensor variations given a base sensor data object
function generateSensors(baseSensor) {
    let sensors = [];
    for (let i = 0; i < NUM_SENSORS; i++) {
        sensors.push({
            sensorID: i+1,
            temperature: baseSensor.temperature + getRandomNumber(-VARIATION_TEMP, VARIATION_TEMP),
            windSpeed: baseSensor.windSpeed + getRandomNumber(-VARIATION_WIND_SPEED, VARIATION_WIND_SPEED),
            humidity: baseSensor.humidity + getRandomNumber(-VARIATION_HUMIDITY, VARIATION_HUMIDITY),
            c02: baseSensor.c02 + getRandomNumber(-VARIATION_C02, VARIATION_C02),
        });
    }
    return sensors;
}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // Generate weather data then use it to generate simulated sensor data
    let weatherData = generateWeatherData();
    let sensors = generateSensors(weatherData);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: sensors
    };
}