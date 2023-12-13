
import mysql from 'mysql2';

// create the connection to database
const connectDatabaseNowbuys = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nowbuys',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    typeCast: function (field, next) { 
        if (field.type === 'TINY' && field.length === 1) {
            return field.string() === '1'; // Trả về true nếu field là '1', ngược lại trả về false
        }
        return next();
    }
}) 

const connectDatabaseAddress = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'address',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    typeCast: function (field, next) { 
        if (field.type === 'TINY' && field.length === 1) {
            return field.string() === '1'; // Trả về true nếu field là '1', ngược lại trả về false
        }
        return next();
    }
}) 

export {connectDatabaseNowbuys, connectDatabaseAddress}