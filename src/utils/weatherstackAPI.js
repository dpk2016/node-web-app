const request = require('request');

// //ff8efa03832cd979ea1403871d73f3c8 = ACCESS KEY FOR WEATHER

// //http://api.weatherstack.com/current?access_key=ff8efa03832cd979ea1403871d73f3c8&query=22.5726,88.3639 = KOLKATA
// //http://api.weatherstack.com/current?access_key=ff8efa03832cd979ea1403871d73f3c8&query=23.2313,87.0784 = BANKURA

// const url = 'http://api.weatherstack.com/current?access_key=ff8efa03832cd979ea1403871d73f3c8&query=23.2313,87.0784';

// // request({ url: url }, (error, response) => {
// //     const data = JSON.parse(response.body);
// //     console.log(data.current);
// // });
// //Parsed data request below

// request({ url: url, json: true }, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to WeatherStack API');
//     } else if (response.body.error) {
//         console.log('Unable to fetch weather data from WeatherStack API');
//     } else {
//         console.log(response.body.current.weather_descriptions[0] + ': It is currently ' + response.body.current.temperature + ' degrees out. There is ' + response.body.current.precip + '% chances of rain.');
//     }
// });

const foreCast = (latitude, longitude, callback) => {
    const weather_url = 'http://api.weatherstack.com/current?access_key=ff8efa03832cd979ea1403871d73f3c8&query=' + latitude + ',' + longitude;

    request({ url: weather_url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to WeatherStack API!', undefined);
        }
        else if (response.body.error) {
            callback('Invalid Location Data!', undefined);
        }
        else
            callback(undefined, {
                desciption: response.body.current.weather_descriptions[0],
                temp: response.body.current.temperature,
                precipitation: response.body.current.precip
            });
    });
};

module.exports = foreCast;