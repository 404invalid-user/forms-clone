const path = require('path')
const logger = require('../../modules/logger')

const User = require('../../db/user')
const cache = require('../../modules/cache')
const rS = require('randomstring')
const axios = require('axios')

module.exports = {
    path: '/login',
    dynamic: false,
    async run(shards, req, res) {
        try {
            if (req.query.code) {
                let oath;
                let userInfo
                let userGuild;
                let guilds = []
                let randomString = rS.generate({
                    length: 33,
                    charset: 'alphabetic'
                })

                const tokenData = new URLSearchParams()
                tokenData.append('client_id', process.env.client_id)
                tokenData.append('client_secret', process.env.client_secret)
                tokenData.append('grant_type', 'authorization_code')
                tokenData.append('redirect_uri', process.env.redirect_uri)
                tokenData.append('code', req.query.code)
                tokenData.append('scope', 'identify email guilds')

                await axios
                    .post('https://discord.com/api/oauth2/token', tokenData.toString(), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                    .then((responce) => (oath = responce.data))
                    .catch((err) => {
                        logger.error(err.stack || err)
                        if (err.toString() == 'Error: Request failed with status code 400') {
                            console.log("400")
                            return res.redirect('/login?ref=code-fail')
                        }
                    })
                await axios
                    .get('https://discord.com/api/users/@me', { headers: { authorization: `${oath.token_type} ${oath.access_token}` } })
                    .then((responce) => (userInfo = responce.data))
                    .catch((err) => {
                        logger.error(err.stack || err)
                    });
                await axios
                    .get('https://discord.com/api/users/@me/guilds', { headers: { authorization: `${oath.token_type} ${oath.access_token}` } })
                    .then((responce) => (userGuilds = responce.data))
                    .catch((err) => {
                        logger.error(err.stack || err)
                    });

                // the access code was used/expired
                if (userInfo.message == '401: Unauthorized' || guilds.message == '401: Unauthorized') return res.redirect('/login')
                //loop though oauth2 guilds and push bit of guild info to 'guilds' array
                for await (const userGuild of userGuilds) {
                    guilds.push({
                        id: userGuild.id
                    })
                }
                let currentUser = await cache.lookup('user', userInfo.id).catch((e) => { });
                if (currentUser == null) {
                    await User.create({
                        id: userInfo.id,
                        username: userInfo.username,
                        discriminator: userInfo.discriminator,
                        avatar: `https://cdn.discordapp.com/avatars/${userInfo.id}/${userInfo.avatar}.png`,
                        token: [{ browser: req.headers['user-agent'], code: randomString }],
                        lastLogin: Date.now().toString(),
                        guilds: guilds
                    })
                    currentUser = await cache.lookup('user', userInfo.id).catch((e) => { })
                } else {
                    currentUser.tokens.push({ browser: req.headers['user-agent'], code: randomString });
                    currentUser.userName = userInfo.username;
                    currentUser.discriminator = userInfo.discriminator;
                    currentUser.avatar = `https://cdn.discordapp.com/avatars/${userInfo.id}/${userInfo.avatar}.png`;
                    currentUser.guilds = guilds;
                    currentUser.lastLogin = Date.now().toString(),
                        currentUser.save();
                }
                cache.removeCache('user', currentUser.id)
                cache.createCache('user', currentUser.id, currentUser)
                return res
                    .cookie('id', currentUser.id, { expires: new Date(253402300000000), httpOnly: true })
                    .cookie('token', randomString, { expires: new Date(253402300000000), httpOnly: true })
                    .status(200)
                    .redirect('/')
            } else if (req.query.error) {
                logger.error('req query error: ' + req.query.error)
                return res.status(500)
            } else {
                return res.redirect(
                    `https://discord.com/api/oauth2/authorize?client_id=${process.env.client_id}&redirect_uri=${process.env.redirect_uri}&response_type=code&scope=identify%20email%20guilds`
                )
            }
        } catch (error) {
            logger.error(error.stack || error)
            return res.status(500)
        }
    }
}