
const analyticsSchema = require('../../models/analytics.js');
module.exports = () => {
    async function analytics(req, res, next) {
        next();
        const urlpath = req.originalUrl.split('?')[0];
            let pagePath = await analyticsSchema.findOne({ path: urlpath });
            if (pagePath == null) {
                await analyticsSchema.create({ path: urlpath, views: [] })
                pagePath = await analyticsSchema.findOne({ path: urlpath });
            }
            pagePath.views.push({
                timestamp: Date.now(),
                ref: req.query.ref || 'none',
            })
            pagePath.save();
    }
    return analytics;
}