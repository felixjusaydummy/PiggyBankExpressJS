const dotenv = require('dotenv')
dotenv.config();

module.exports = {
    PORT : process.env.PORT,
    
    DB_REGION: process.env.DB_REGION,
    DB_ENDPOINT: process.env.DB_ENDPOINT
};