import { readdirSync } from 'fs';
import { Application } from "express";
//@ts-ignore
import * as logger from 'mcstatusbot-logger';


export default async function putHandler(app: Application) {
  const putDirectories: string[] = await readdirSync(__dirname + '/../put/');

  for (const dir of putDirectories) {
    const putDirFiles: string[] = await readdirSync(__dirname + `/../put/${dir}/`).filter(f => f.endsWith('.js'));

    for (const f of putDirFiles) {
      const file = require(__dirname + `/../put/${dir}/${f}`);
      let filePath = file.path ?? `/${dir}/${f.replace('.js', '')}`;

      if (!filePath) {
        logger.error('put file dosnt contain a name or description. path: ' + `./put/${dir}/${file}`);
        continue;
      }


      try {
        app.put(filePath, async (...args) => {
          file.run(app, ...args);
        });
      } catch (error) {
        logger.error('executing. path: ' + `./put/${dir}/${file}`);
        logger.error(error.stack || error);
        continue;
      }

    }

  }

  logger.info('loaded put handler');

}

