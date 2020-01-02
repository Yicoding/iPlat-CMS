const config  = require('./config');

const env = process.env.NODE_ENV;
const { mysql } = config[env];

const DB = require('knex')({
    client: 'mysql',
    connection: {
        host: mysql.host,
        port: mysql.port,
        user: mysql.user,
        password: mysql.pass,
        database: mysql.db,
        charset: mysql.char,
    }
});

module.exports = {
    mysql: DB
};