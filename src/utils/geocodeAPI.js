const request = require('request');

// //pk.eyJ1IjoiZGViLTIyIiwiYSI6ImNrejVvZ2l4cDBzNmwyb3IxcHYzbzJkbmcifQ.uRlZNBbagvKPh8FwsY3nUw = ACCESS KEY FOR LOCATION

// const location_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Kolkata.json?access_token=pk.eyJ1IjoiZGViLTIyIiwiYSI6ImNrejVvZ2l4cDBzNmwyb3IxcHYzbzJkbmcifQ.uRlZNBbagvKPh8FwsY3nUw';

// request({ url: location_url, json: true }, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to Geocoding API');
//         // } else if (response.body.features[0] === undefined) {
//     } else if (response.body.features[0].length === 0) {
//         console.log('Unable to fetch location data from Geocoding API');
//     } else {
//         console.log('Longitude: ' + response.body.features[0].center[0] + ' and Latitude: ' + response.body.features[0].center[1]);
//     }
// });

const geoCode = (location, callback) => {
    const location_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?access_token=pk.eyJ1IjoiZGViLTIyIiwiYSI6ImNrejVvZ2l4cDBzNmwyb3IxcHYzbzJkbmcifQ.uRlZNBbagvKPh8FwsY3nUw&limit=1';

    // request({ url: location_url, json: true }, (error, response) => {
    //     if (error) {
    //         callback('Unable to connect to Geocoding API!', undefined);
    //     }
    //     else if (response.body.features[0].length === 0) {
    //         callback('Invalid Location Data!', undefined);
    //     }
    //     else {
    //         callback(undefined, {
    //             longitude: response.body.features[0].center[0],
    //             latitude: response.body.features[0].center[1],
    //             full_location: response.body.features[0].place_name
    //         });
    //     }
    // });
    // Using ES6 destructuring & shorthands of objects below
    request({ url: location_url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to Geocoding API!', undefined);
        }
        else if (response.body.features[0] === undefined) {
            callback('Invalid Location Data!', undefined);
        }
        else {
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                full_location: response.body.features[0].place_name
            });
        }
    });
};

module.exports = geoCode;