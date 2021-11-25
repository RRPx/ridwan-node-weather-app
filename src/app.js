const express = require('express')
const path = require('path')
const hbs = require('hbs', )
const geoCode = require('./utils/geocode')
const foreCast = require('./utils/forecast')
const forecast = require('./utils/forecast')

// defines path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()
const port = process.env.PORT || 4000

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath) // when you change the 'views' directory to something else, this line would stop the error
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ridwanur Ralph'
    }) // match up hbs template name (if static has the same name file, it will override hbs file having the same name)
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Reach me at ridwanurrahman0183@gmail.com',
        title: 'Help',
        name: 'Ridwanur Ralph'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Ridwanur Ralph'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address is missing'
        })
    }

    geoCode(req.query.address, (error, {
        latitude,
        longitude,
        location
    } = {}) => {
        if (error) {
            return res.send({
                error
            })
        } else {
            foreCast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error
                    })
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
        }
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({ // two responses without return in here will provide a js error
            error: 'You mush provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ridwanur Ralph',
        errorText: 'help article not found'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ridwanur Ralph',
        errorText: 'Page not found'
    })
})


// app.com
// app.com/help
// app.com/about

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})