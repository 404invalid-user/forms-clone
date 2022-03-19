const cache = require('../../modules/cache.js');
const FORMANSWERS = require('../../db/formanswer.js')
const path = require('path');
const axios = require('axios')
module.exports = {
    path: '/api/form',
    async run(app, req, res) {
        console.log("3")
        if (req.user == null) return res.status(401).json({ error: 'login' })
        if (!req.body.data.id || req.body.data.id == 'undefined') return res.status(400).json({ error: 'invalid form id' });
        const form = await cache.lookup('form', req.body.data.id);
        if (form == null) return res.status(400).json({ error: 'form does not exist' });
        console.log("f: "+form.settings.guild)
        if (form.settings.guild) {
            if (!req.user.guilds.map(g => g.id).includes(form.settings.guild)) return res.status(403).json({ error: 'please be in the server for that form' });
        }
        if (req.body.data.questions.lenght <=1) {
            return res.status(400).json({ error: 'please include array of questions' });
        }
        form.answers.push({ date: Date.now().toString(), user: req.user.id });
        form.save();
        let startDate = '0';
        if (req.body.data.timeStart) {
            startDate = req.body.data.timeStart.toString();
        }
        FORMANSWERS.create({
            id: form.id,
            user: req.user.id,
            questions: req.body.data.questions,
            time: {
                start: startDate,
                end: Date.now().toString()
            }
        })
        if (form.settings.webhook) {
            if(isUrl(form.settings.webhook)) {
                axios.post(form.settings.webhook, {content: `new form submission from <@!${req.user.id}> (${req.user.id})`}).cache(e => {})
            }
        }
        return res.json({ status: '200' });
    }
}


function isUrl(txt) {
    try {
        url = new URL(txt);
    } catch (_) {
        return false;
    }
    const domain = txt.replace('//', '/').split('/')[1];
    if (domain !== 'discord.com') {
        return false
    }
    return true;
}