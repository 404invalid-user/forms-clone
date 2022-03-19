const path = require('path');
var uniqid = require('uniqid');
const FORM = require('../../db/form');
module.exports = {
    path: '/form/new',
    async run(app, req, res) {
        if (req.user == null) return res.redirect('/login');
        const formId = uniqid() +uniqid()+uniqid();
        await FORM.create({id: formId, user: req.user.id, guild: 'none', title: "new form", description: "a new form", questions: [], views: [], answers: []});
        res.redirect('/form/edit?id='+formId);
    }
}