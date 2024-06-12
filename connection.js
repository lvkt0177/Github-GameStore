const mysql = require('mysql');
//* 
exports.create = (host = 'localhost', user = 'root', password = '', database = 'playstation') => {
    return mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database
    })
}