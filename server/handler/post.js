const { readdirSync } = require('fs');
const logger = require('../modules/logger');
module.exports = (app) => {
  readdirSync(__dirname + '/../post/').forEach((dir) => {
    const postReqFiles = readdirSync(__dirname + `/../post/${dir}/`).filter((file) => file.endsWith('.js'))
    for (const file of postReqFiles) {
      const postReqFile = require(__dirname + `/../post/${dir}/${file}`)
      if (postReqFile.path) {
        app.post(postReqFile.path, async (...args) => postReqFile.run(app, ...args))
        console.log(postReqFile.path)
      } else {
        logger.error('post file dosnt contain a name or description. path: ' + `/${dir}/${file}`)
        continue
      }
    }
  })
  logger.info('loaded post handler')
}