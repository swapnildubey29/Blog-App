require('dotenv').config()
const express = require('express')
const expressLayout = require('express-ejs-layouts')
const connectDB = require('./server/config/db')
const app = express()

// configration
app.use(express.static('public'))
app.use(expressLayout)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')
app.use('/', require('./server/routes/main'))

// Connect to DB
connectDB()



// Listen
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is listen at ${PORT}`)
})