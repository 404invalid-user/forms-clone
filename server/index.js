const fs = require('fs')
const express = require("express");
const mongoose = require('mongoose');
const Redis = require('ioredis');
const logger = require('./modules/logger');
const FORM = require('./db/form');
require('dotenv').config()
process.on('uncaughtException', async(error, source) => {
    await logger.crash(error.stack || error + 'at' + source)
        // process.exit(1)
})
const app = express();
app.use((req, res, next) => {
    req.date = Date.now();
    next();
});

const redisDetails = {
        password: process.env.REDIS.split(':').length === 3 ? process.env.REDIS.split(':')[0] : null,
        host: process.env.REDIS.split(':').length === 3 ? process.env.REDIS.split(':')[1] : process.env.REDIS.split(':')[0],
        port: process.env.REDIS.split(':').length === 3 ? process.env.REDIS.split(':')[2] : process.env.REDIS.split(':')[1]
    }
    // Connect to database
mongoose
    .connect(process.env.DBURI, )
    .then(() => logger.info('Connected to database!'))
    .catch((err) => logger.error(err.stack || err))

const redisclient = new Redis(redisDetails);
global.redisclient = redisclient;

// Flush redis
redisclient.flushall(async(error, succeeded) => {
    logger.info(`Flushing Redis -  ${error ? error : succeeded}`)
    logger.info('Started caching the databases');

    FORM.find().then((result) => {
        result.forEach((form) => redisclient.hset('form', form.id, JSON.stringify(form)))
        logger.info('Cached forms')
    }).catch((err) => logger.error(err.stack || err));

})

require('./app-setup')(app);


app.listen(process.env.PORT, () => {
    logger.success('web server listening on port ' + process.env.PORT)
})