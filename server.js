require('dotenv').config()

const express = require('express')
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Main page')
})

app.listen(process.env.PORT, () => console.log(`Sever started on port ${process.env.PORT}`))


require('app')

module.exports = app