const Pool = require('pg').Pool
const pg = new Pool({
    user: '',
    password: '',
    host: '',
    port: '',
    database: ''
});

module.exports = pg;