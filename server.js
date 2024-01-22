require('dotenv').config()
require('./config/config.js')

const express = require('express')
const PORT = process.env.PORT || 3000
const app = express()
const bodyParser = require("body-parser")
const atmRoutes = require('./routes/routes.js')
const cors = require('cors')

app.use(cors())
app.use(express.json())

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', atmRoutes)

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
})