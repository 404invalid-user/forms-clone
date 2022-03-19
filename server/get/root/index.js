const path = require('path');
module.exports = {
    path: '/',
    run(app, req,res) {
        if (req.user == null) return res.redirect('/login');
        if (req.cookies.form) {
            return res.clearCookie("form").redirect('/form?id='+req.cookies.form);
        }
       return res.sendFile(path.join(__dirname, '/../../dist/index.html'));
    }
}