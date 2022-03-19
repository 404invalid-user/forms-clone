module.exports = {
    path: '/api/timezones',
    run(app, req,res) {
        if (req.user == null) return res.status(401).json({ error: 'login' })
        res.json(require('../../modules/timezones'));
    }
}