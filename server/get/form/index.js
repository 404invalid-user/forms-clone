const path = require('path');
var uniqid = require('uniqid');
const FORM = require('../../db/form');
const cache = require('../../modules/cache');
module.exports = {
    path: '/form',
    async run(app, req, res) {
        if (req.get('user-agent') == 'Mozilla/5.0 (compatible; Discordbot/2.0; +https://discordapp.com)') {
            if (req.query.id) {

                const form = await cache.lookup('form', req.query.id);
                if (form == null) return res.sendFile(path.join(__dirname, '/../../dist/index.html'));
                const author = await cache.lookup('user', form.user);
                if (author == null) return res.sendFile(path.join(__dirname, '/../../dist/index.html'));
                return res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="404invalid-user" />
    <meta content="#1E2146" data-react-helmet="true" name="theme-color">
    <meta property="og:image" content="${author.avatar}" />
    <meta property="og:title" content="${form.title}" />
    <meta property="og:description" content="${form.description}" />
    <meta property="og:url" content="http://${process.env.DOMAIN}/form?id=${form.id}" />
    <title>${form.title}</title>
</head>
<body>
<h1>${form.title}</h1>
<h2>${form.description}</h2>
</body>
</html>`)
            }
        } else {
        if (req.user == null) {
            if (req.query.id) {
                return res.cookie('form', req.query.id).redirect('/login');
            }
            return res.redirect('/login');
        }
        
        res.sendFile(path.join(__dirname, '/../../dist/index.html'));
    }
    }
}