const cache = require('../../modules/cache.js');
const path = require('path');
const FORMANSWERS = require('../../db/formanswer')
module.exports = {
    path: '/api/form/answers',
    async run(app, req, res) {
        if (req.user == null) return res.status(401).json({ error: 'login' })
        if (!req.query.id || req.query.id == 'undefined') return res.status(400).json({ error: 'invalid form id' });
        const form = await cache.lookup('form', req.query.id);

        if (form == null) return res.status(400).json({ error: 'form does not exist' });
        if (req.user.id !== form.user) return res.status(403).json({ error: 'you canot see answers for this form' });
        const dbformAnswers = await FORMANSWERS.find({ id: form.id });
        let formAnswers = [];

        for (const fa of dbformAnswers) {
            const user = await cache.lookup('user', fa.user);
            if (user == null) continue;
            formAnswers.push({
                user: {
                    id: user.id,
                    username: user.username,
                    discriminator: user.discriminator,
                    avatar: user.avatar
                },
                time: {
                    start: fa.time.start,
                    end: fa.time.end
                },
                questions: fa.questions
            })
        }
        return res.json(formAnswers);
    }
}