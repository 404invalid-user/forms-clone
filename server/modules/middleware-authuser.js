const cache = require('./cache.js');
const logger = require('./logger.js');
module.exports = () => {
    return async(req,res,next)=> {
        const { headers: { cookie } } = req;
        if (cookie) {
            const cookies = cookie.split(';').reduce((res, item) => {
                const data = item.trim().split('=');
                return { ...res, [data[0]]: data[1] };
            }, {});
            req.cookies = cookies;
            if (cookies.id && cookies.token) {
                const currentUser = await cache.lookup('user', cookies.id).catch(e => logger.error(e.stack || e));
                if (currentUser == null) {
                    req.user = null;
                    next()
                } else {
                    let hasAccess = false;
                    for await (const token of currentUser.tokens) {
                        if (cookies.token === token.code) {
                            hasAccess = true;
                        }
                    };
                    if (hasAccess) {
                        req.user = await currentUser;
                        next();
                    } else {
                        req.user = null;
                        next();
                    }
                }
            } else {
                req.user = null;
                next();
            }
        } else {
            next();
        }
    }
}