const formanswer = require('../../db/formanswer.js');
const cache = require('../../modules/cache.js');
module.exports = {
    path: '/api/form/edit',
    async run(app, req, res) {
        if (req.user == null) return res.status(401).json({ error: 'login' })
        if (!req.body.data.id || req.body.data.id == 'undefined') return res.status(400).json({ error: 'invalid form id' });
        const form = await cache.lookup('form', req.body.data.id);
        if (form == null) return res.status(400).json({ error: 'form does not exist' });
        if (req.user.id !== form.user) return res.status(403).json({ error: 'you can not edit this form' });
        form.title = req.body.data.title;
        form.description = req.body.data.description;
        form.questions = req.body.data.questions;
        form.save();
        return res.json({ status: '200' });
    }
}