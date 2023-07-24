import fs from 'fs';

import path from 'path';

import express from 'express';


const mongoose = require('mongoose');




require('dotenv').config();

//@ts-ignore

import * as logger from 'mcstatusbot-logger';




process.on('uncaughtException', async (error, source) => {

await logger.crash(error.stack || error + 'at' + source)

// process.exit(1)

})


const app = express();


app.use((req, res, next) => {

// @ts-ignore

req.date = Date.now();

next();

});


const authuser = require('./modules/middleware-authuser');




app.use(express.json());


app.use(express.urlencoded({ extended: true }));


app.use(authuser());


['get', 'post'].forEach(h => {

require('./handler/' + h)(app);

});


import getHandler from './handler/get';

import postHandler from './handler/post';

import putHandler from './handler/put';


getHandler(app);

postHandler(app);

putHandler(app);


app.use(express.static(__dirname + '/dist'));

app.get('*', (req, res) => {

res.status(404).sendFile(path.join(__dirname, '/../www/404.html'))

});



app.listen(process.env.PORT, () => {

logger.success('web server listening on port ' + process.env.PORT)

})



