import { readdirSync } from 'fs';
import { Application } from "express";
//@ts-ignore
import * as logger from 'mcstatusbot-logger';


export default async function postHandler(app: Application) {
  const postDirectories: string[] = await readdirSync(__dirname + '/../post/');

  for (const dir of postDirectories) {
    const postDirFiles: string[] = await readdirSync(__dirname + `/../post/${dir}/`).filter(f => f.endsWith('.js'));

    for (const f of postDirFiles) {
      const file = require(__dirname + `/../post/${dir}/${f}`);
      let filePath = file.path ?? `/${dir}/${f.replace('.js', '')}`;

      if (!filePath) {
        logger.error('post file dosnt contain a name or description. path: ' + `./post/${dir}/${file}`);
        continue;
      }


      try {
        app.post(filePath, async (...args) => {
          file.run(app, ...args);
        });
      } catch (error) {
        logger.error('executing. path: ' + `./post/${dir}/${file}`);
        logger.error(error.stack || error);
        continue;
      }
    }
  }
  logger.info('loaded post handler');
}