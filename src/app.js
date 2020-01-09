const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
      title: 'Weather',
      name: 'Harland Williams'
    } )
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Harland Williams'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is the help message you are seeking',
        title: 'Help',
        name: 'Harland Williams'
    })
})


app.get('/weather', (req, res) =>  {  
    if (!req.query.address) {
        return res.send({
        error: 'You must provide a search term'    
        })
    } 
    
    // Get location from address and then forecast
    geocode(req.query.address, (error, {lattitude, longitude, location} = {}) =>  {
        if (error) {
          return res.send({ error })
        } 
       
          forecast(lattitude, longitude, (error, forecastData) => {
            if (error) {
              return res.send({ error })
            }          
 
            res.send( {
            location: location,
            address: req.query.address,
            forecast: forecastData

            })
          
          })
          
        })   
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        message: 'The article you are seeking is not found',
        title: 'Error',
        name: 'Harland Williams'
    })   
})

app.get('*' , (req, res) => {
    res.render('error', {
        message: 'Page Not Found',
        title: 'Error',
        name: 'Harland Williams'
    })      
})

app.listen(3000, () => {
    console.log('Sever is up on port 3000')
})