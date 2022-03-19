const path = require('path');
const logger= require('../modules/logger')
const { readdirSync } = require('fs')
module.exports = (app) => {
  readdirSync(__dirname + '/../get/').forEach((dir) => {
    const getReqFiles = readdirSync(__dirname + `/../get/${dir}/`).filter((file) => file.endsWith('.js'))
    for (const file of getReqFiles) {
      const getReqFile = require(__dirname + `/../get/${dir}/${file}`)
      if (getReqFile.path) {
        try {
            app.get(getReqFile.path, async (...args) =>  {
              console.log(getReqFile.path)
              getReqFile.run(app, ...args)
            })
            console.log(getReqFile.path)
        } catch (error) {
          logger.error('executing. path: ' + `./get/${dir}/${file}`)
          continue
        }
      } else {
        logger.error('get file dosnt contain a name or description. path: ' + `./get/${dir}/${file}`)
        continue
      }
    }
  })
  app.get('/form/:formid', async (req, res) => {
    if (req.user == null) return res.redirect('/login');
    res.sendFile(path.join(__dirname,'/www/index.html'));
  })
  logger.info('loaded get handler')
}