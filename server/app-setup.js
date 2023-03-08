const authuser = require('./modules/middleware-authuser');
const express = require('express');
module.exports = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(authuser());
    ['get', 'post'].forEach(h => {
        require('./handler/' + h)(app);
    })
    app.use(express.static(__dirname + '/www'));
    app.get('*', (req, res) => {
        res.status(404).sendFile(path.join(__dirname, '/../www/404.html'))
    })
}