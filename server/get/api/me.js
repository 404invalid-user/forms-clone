const cache = require('../../modules/cache.js');
const path = require('path');
module.exports = {
  path: '/api/me',
  async run(app, req, res) {
    if (req.user == null) return res.status(401).json({ error: 'login' })
    const userForms = [];
    const allForms = await cache.getallCache('form');
    if (allForms.length >= 1) {
      for (const form of allForms) {
        if (form.user === req.user.id) {
          userForms.push(form);
        }
      }
    }
    req.user.forms = [];
    if (userForms.length >= 1) {
      for await (let form of userForms) {
        req.user.forms.push({
          id: form.id,
          title: form.title,
          views: form.views.length,
          answers: form.answers.length,
          link: 'http://' + process.env.DOMAIN + '/form?id=' + form.id
        })
      }
    }
    return res.json(req.user);
  }
}