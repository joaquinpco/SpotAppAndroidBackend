const dotenv = require('dotenv');
dotenv.config();

const config = {
    endpoint: process.env.ENDPOINT,
    key: process.env.KEY,
    databaseId: process.env.DATABASE_ID,
    containerId: process.env.CONTAINER_ID
};

module.exports = config;