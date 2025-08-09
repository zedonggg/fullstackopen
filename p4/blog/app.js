const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blogRouter')

const app = express()
const mongoUrl = config.MONGO_URL
mongoose.connect(mongoUrl)

app.use(express.json())
app.use('/', blogRouter)

module.exports = app
