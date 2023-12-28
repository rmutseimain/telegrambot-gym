require('dotenv').config({
    path: '../../.env'
})

const { Client } = require('pg')
const fs = require('fs');

const options = {
    user:  process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    ssl: {
        required: true
    }
}

class GymDB extends Client {
    constructor(options) {
        super(options);
    }

    async init() {
        let query = fs.readFileSync('./init_database.sql').toString()
        return await super.query(query);
    }

    async insertSurveyData(){

    }


}

let db = new GymDB(options);

db.connect().then( result => {
    console.log('Connected to DB', result)

    db.init()
        .then( result => { console.log(JSON.stringify(result, undefined, 4 )) })
        .catch( error => { console.log(error)})

}).catch( error => {
    console.log('Error while connect to DB', error)
})

module.exports = db;
