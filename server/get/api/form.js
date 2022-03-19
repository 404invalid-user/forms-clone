const cache = require('../../modules/cache.js');
const path = require('path');
module.exports = {
  path: '/api/form',
  async run(app, req, res) {
    if (req.user == null) return res.status(401).json({ error: 'login' })
    if (!req.query.id || req.query.id == 'undefined') return res.status(400).json({ error: 'invalid form id' });
    const form = await cache.lookup('form', req.query.id);
    if (form == null) return res.status(400).json({ error: 'form does not exist' });
    const formAuthor = await cache.lookup('user', form.user);
    if (formAuthor == null) return res.status(400).json({ error: 'form does not exist' });
    if (form.user !== req.user.id) {
      if (form.settings.guild) {
        if (!req.user.guilds.map(g => g.id).includes(form.settings.guild)) return res.status(403).json({ error: 'please be in the server for that form' });
      }
      await form.views.push({ date: Date.now().toString(), user: req.user.id });
      await form.save();

      form.views = undefined;
      form.answers = undefined;
    }
    form.author = {
      id: formAuthor.id,
      username: formAuthor.username,
      discriminator: formAuthor.discriminator,
      avatar: formAuthor.avatar,
      admin: formAuthor.admin
    }
    return res.json(form);
  }
}