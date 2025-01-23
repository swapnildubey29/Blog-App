require('dotenv').config()
const express = require('express')
const expressLayout = require('express-ejs-layouts')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./server/config/db')
const { isActiveRoute } = require('./server/helpers/routerHelpers')
const app = express()

// Connect to DB
connectDB()

// Middleware for parsing static files and body
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true })) // Parse URL-encoded data
app.use(express.json()) // Parse JSON data
app.use(cookieParser())
app.use(methodOverride('_method'))

// Session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  }),
}))

// EJS settings
app.use(expressLayout)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

// Global variable
app.locals.isActiveRoute = isActiveRoute

// Routes
app.use('/', require('./server/routes/main'))
app.use('/', require('./server/routes/admin'))

// Listen on the server
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`)
})