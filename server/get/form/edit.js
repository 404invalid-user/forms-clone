const path = require('path');
var uniqid = require('uniqid');
const FORM = require('../../db/form');
module.exports = {
    path: '/form/edit',
    async run(app, req, res) {
        if (req.user == null) return res.redirect('/login');
    
        res.sendFile(path.join(__dirname, '/../../dist/index.html'));
    }
}