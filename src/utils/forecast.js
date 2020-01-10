const request = require('request')

const forecast = (latt, long, callback) => {
const url = 'https://api.darksky.net/forecast/a5360cee371e9f8112e5456dc50c6e47/' + latt + ',' + long

request({ url, json: true }, (error, { body }) => {
    
    if (error) {

        callback('Unable to connect to weather service.', undefined)
        
    } else if (body.error) {
        callback('Unable to find location', undefined)

    } else {

        callback(undefined, body.daily.data[0].summary + 'The current temp is ' + body.currently.temperature + ', There is a ' + body.currently.precipProbability + '% chance of rain. High today: ' + body.daily.data[0].temperatureHigh + ' Low today: ' + body.daily.data[0].temperatureLow)
    }
    
})

}

module.exports = forecast
