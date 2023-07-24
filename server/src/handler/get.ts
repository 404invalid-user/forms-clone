import path from 'path';
import { readdirSync } from 'fs';
import { Application } from "express";
//@ts-ignore
import * as logger from 'mcstatusbot-logger';


export default async function GetHandler(app: Application) {

  const getDirectories: string[] = await readdirSync(__dirname + '/../get/');

  for (const dir of getDirectories) {
    const getDirFiles: string[] = await readdirSync(__dirname + `/../get/${dir}/`).filter(f => f.endsWith('.js'));
    for (const f of getDirFiles) {
      const file = require(__dirname + `/../get/${dir}/${f}`);
      let filePath = file.path ?? `/${dir}/${f.replace('.js', '')}`;
      if (!filePath) {
        logger.error('get file dosnt contain a name or description. path: ' + `./get/${dir}/${file}`);
        continue;
      }


      try {
        app.get(filePath, async (...args) => {
          //console.log(getReqFile.path)
          file.run(app, ...args)
        })
      } catch (error) {
        logger.error('executing. path: ' + `./get/${dir}/${file}`);
        logger.error(error.stack || error);
        continue;
      }

    }
  }

  app.get('/form/:formid', async (req, res) => {
    res.sendFile(path.join(__dirname, '/www/index.html'));
  });
  
  logger.info('loaded get handler');
}