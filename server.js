require('app')
require('dotenv').config()

const express = require('express')
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Main page')
})

module.exports = app;