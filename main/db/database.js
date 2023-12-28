require('dotenv').config()
const pgp = require('pg-promise')();

const { Client } = require('pg')

const db = new Client({
    username: 'gym_main_db_user',
    password: '3dFm5vxA2pAk9bxwguUHwO222wemWcDE',
    host: 'postgres://dpg-cm6mri0cmk4c738pjkog-a',
    port: 5432,
    database: 'gym_main_db'
})

db.connect()