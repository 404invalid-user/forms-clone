const cache = require('../../modules/cache.js');
const FORMANSWERS = require('../../db/formanswer.js')
const path = require('path');
const axios = require('axios')
const timezones =   require('../../modules/timezones');
module.exports = {
    path: '/api/me',
    async run(app, req, res) {
        if (req.user == null) return res.status(401).json({ error: 'login' })
        if (!timezones.includes(req.body.data.timezone)) return res.status(400).json({error: 'incorrect timezone'})

        req.user.timezone = req.body.data.timezone;
        req.user.save();
        return res.json({ status: '200' });
    }
}