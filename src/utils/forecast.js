const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=7a82ad6144ed8b356f40cf1690712fda`

    request({
        url,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback('Unable to connect', undefined)
        } else if (body.message) {
            callback('Cant find location', undefined)
        } else {
            callback(undefined, {
                temp: body.main.temp,
                humid: body.main.humidity
            })
        }
    })
}

module.exports = forecast