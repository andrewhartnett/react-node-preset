require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const busboy = require('connect-busboy')
const path = require('path')
const port = process.env.PORT || 3001

const mongoDB = 'mongodb://localhost:27017/react-node'

const mongoConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect(mongoDB, mongoConfig)

app.use(cors())
app.use(express.json())
app.use(busboy())

// Register the routes

// app.use(express.static(path.join(__dirname, '../build')))
app.use('/public', express.static(path.join(__dirname, '../public')))

app.use('/api', require('./routes'))

// https://github.com/wxsms/react-node-starter <-- Where I got this code from
// This will matter when deploying on heroku

app.get('*', (req, res) => {
  res.sendFile('build/index.html', { root: path.join(__dirname, '../') })
})

// Not to confuse, but the app serves port 8080, and docker maps that to 3000
// This is located in the docker-compose.yml file
app.listen(port, () => {
  console.log(`API RUNNING ON http://localhost:${port}`)
})
