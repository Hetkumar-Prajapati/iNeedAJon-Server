// dependencies
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// create the app & set it to parse JSON
const app = express()
app.use(bodyParser.json())

// use dotenv if in not in production mode
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// enable CORS BEFORE the controller declaration and mongoose connection 
//cors- cross origin resource sharing 
//this enables localhost/4200 to communicate to localhost/3000 which are both diffrent website. Same Origin Policy
const cors = require('cors')
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: 'GET,POST,PUT,DELETE,HEAD,OPTIONS'
}))


// db conn
mongoose.connect(process.env.DATABASE_URL, {
}).then((res) => {
    console.log('Connected')
}).catch((err) => {
    console.log(`Connection Error: ${err}`)
})

// map url path to controller
const employers = require('./controllers/employers')
app.use('/api/employers', employers)

// start express web server & make public
app.listen(3000)
module.exports = app
