const path = require('path');
const express = require('express');
const hbs = require('hbs');

//pulling geocode & weather js
const geoCode = require('../src/utils/geocodeAPI.js');
const foreCast = require('../src/utils/weatherstackAPI.js')

const app = express();
const port = process.env.PORT || 3000;

// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname, '../public/index.html'));

// Define paths for Express Config
const homePageHtml = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../views');
const partialsPath = path.join(__dirname, '../partials');

// Setup handle bars engine & views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(homePageHtml));

// Serving pages for hbs
app.get('', (req, res) => {
    res.render('index', {
        title: 'Home',
        desc: 'Hello, This is the introduction page for me, go ahead and try out the other new pages from nav bar!',
        name: 'Deb'
    });
});

// Serving pages for hbs
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me!',
        text: 'This is Me >>>',
        name: 'Deb'
    });
});

// Serving pages for hbs
app.get('/weatherapp', (req, res) => {
    res.render('weatherapp', {
        title: 'Weather Data',
        text: 'Get Weather for your location...',
        name: 'Deb'
    });
});

// //Serving static page
// app.get('', (req, res) => {
//     res.send('Home!');
//     console.log(req.url);
// });

// //Serving static page
// app.get('/help', (req, res) => {
//     res.send('Help Page');
//     console.log(req.url);
// });

// //Serving static page
// app.get('/about', (req, res) => {
//     res.send('About Page...');
//     console.log(req.url);
// });

//Serving static page for Weather Forecast
app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: 'Location is not provided!'
        })
    }

    geoCode(req.query.location, (error, { latitude, longitude, full_location: address } = {}) => {
        if (error) {
            return res.send({ error });
        }
        else {
            foreCast(latitude, longitude, (error, { desciption, temp: temperature, precipitation } = {}) => {
                if (error) {
                    return res.send({ error });
                }
                else {
                    res.send({
                        latitude: latitude,
                        longitude: longitude,
                        location: address,
                        forecast: req.query.location + ' is ' + desciption + ' throughout the day. It is currently ' + temperature + ' degrees out and there is ' + precipitation + '% chances of rain.'
                    });
                }
            });
        }
    });

    //console.log(req.query.location)
    // res.send({
    //     forecast: forcast,
    //     location: req.query.location
    // });
    //console.log(req.url);
});

//Serving Error Page for undefined pages
app.get('*', (req, res) => {
    // res.send('Error 404: Page not defined!');
    res.render('error', {
        title: 'Error Page',
        error: 'Error 404: Page not defined!',
        name: 'Deb'
    })
});

//Starting server on port 3000
app.listen(port, () => {
    console.log('Server is Up on port:3000');
});