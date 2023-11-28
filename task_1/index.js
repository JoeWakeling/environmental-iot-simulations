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
        wind_speed: getRandomNumber(MIN_WIND_SPEED + VARIATION_WIND_SPEED, MAX_WIND_SPEED - VARIATION_WIND_SPEED),
        relative_humidity: getRandomNumber(MIN_HUMIDITY + VARIATION_HUMIDITY, MAX_HUMIDITY - VARIATION_HUMIDITY),
        co2: getRandomNumber(MIN_C02 + VARIATION_C02, MAX_C02 - VARIATION_C02),
    };
}

// Generate NUM_SENSORS sensor variations given a base sensor data object
function generateSensors(baseSensor) {
    let sensors = [];
    for (let i = 0; i < NUM_SENSORS; i++) {
        sensors.push({
            sensor_id: i+1,
            temperature: baseSensor.temperature + getRandomNumber(-VARIATION_TEMP, VARIATION_TEMP),
            wind_speed: baseSensor.wind_speed + getRandomNumber(-VARIATION_WIND_SPEED, VARIATION_WIND_SPEED),
            relative_humidity: baseSensor.relative_humidity + getRandomNumber(-VARIATION_HUMIDITY, VARIATION_HUMIDITY),
            co2: baseSensor.co2 + getRandomNumber(-VARIATION_C02, VARIATION_C02),
        });
    }
    return sensors;
}

module.exports = async function (context, req) {
    // Generate some random weather data
    let weatherData = generateWeatherData();
    // Then use it to generate data for 20 sensors by adding some variaiton & write to azure sql db
    context.bindings.simulatedData = generateSensors(weatherData);
    // Response message
    context.res = {
        status: 200,
        body: "Data generated & written to db successfully"
    };
}