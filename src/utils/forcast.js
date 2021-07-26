const request = require("request");

const forcast = (latitude, longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b0e33c3d6ba79b18a5280cb01f5b42bd&query=' + latitude + ',' + longitude + '&units=m'

    request({url,json:true},(error,{body}) =>{
        if(error){
            callback('Unable to connect to weather service', undefined)
        } else if(body.error){
            callback('Unable to find location',undefined)
        } else{
            callback(undefined, "Current tem. : " + body.current.temperature + " feels like : " + body.current.feelslike)
        }
    })
}

module.exports = forcast

