require('dotenv').config()



const server = () => {
    const express = require('express')
    const app = express()

    app.use(express.json())

    app.get('/', (req, res) => {
        res.send('Main page')
    })

    app.listen(process.env.PORT, () => console.log(`Sever started on port ${process.env.PORT}`))
}

module.exports = server;