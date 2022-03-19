const path = require('path');
module.exports = {
    path: '/api',
    run(app, req,res) {
        if (req.user == null) return res.status(401).json({ error: 'login' })
        res.json({})
    }
}