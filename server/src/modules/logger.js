const fs = require('fs')
const moment = require('moment')
const chalk = require('chalk')
const {WebhookClient}  = require('discord.js')

module.exports = {
append(text) {
  // @ts-ignore
  fs.appendFileSync(__dirname + '/../log.log', text + '\n', (err) => {
    if (err) process.stdout.write(chalk.red('Error writing logs to file: ' + err))
  })
  if (process.env.LOGHOOK) {
    const webhookClient = new WebhookClient({ url: process.env.LOGHOOK })
    webhookClient.send({ content: text.toString() })
  }
},
info(text) {
    // @ts-ignore
    const time = moment().format('YYYY-MM-DD HH:mm:ss')
    process.stdout.write(chalk.gray(`${time} [info]: `) + text + '\n')

    append(time + ' [info]: ' + text)
  },
   success(text) {
    // @ts-ignore
    const time = moment().format('YYYY-MM-DD HH:mm:ss')
    process.stdout.write(chalk.gray(`${time} [${chalk.green('success')}]: `) + text + '\n')

    append(time + ' [success]: ' + text)
  },
  error(text) {
    // @ts-ignore
    const time = moment().format('YYYY-MM-DD HH:mm:ss')
    process.stderr.write(chalk.gray(`${time} [${chalk.red('error')}]: `) + chalk.red(text) + '\n')

    append(time + ' [error]: ' + text)
  },
  warn(text) {
    // @ts-ignore
    const time = moment().format('YYYY-MM-DD HH:mm:ss')
    process.stderr.write(chalk.gray(`${time} [${chalk.yellow('warn')}]: `) + text + '\n')

    append(time + ' [warn]: ' + text)
  },
  crash(text) {
    // @ts-ignore
    const time = moment().format('YYYY-MM-DD HH:mm:ss')
    process.stderr.write(chalk.gray(`${time} [${chalk.red('CRASH')}]: `) + text + '\n')

    append(time + ' [CRASH]: ' + text)
  }
}