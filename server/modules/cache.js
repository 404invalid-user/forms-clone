const USER = require('../db/user');
const FORM = require('../db/form');
const FORMANSWERS = require('../db/formanswer');


const util = require('util');
const logger = require('./logger');
const client = global.redisclient;
client.hget = util.promisify(client.hget);
client.hgetall = util.promisify(client.hgetall);


// Lookup function, Looks up redis,
// if the key is not in redis it fallbacks to mongo
module.exports = {
  async lookup(collection, key) {
    // collection can be 'Server' or 'Log'
    const cacheValue = await client.hget(collection, key);
    let result = null

    if (cacheValue) {
      result = JSON.parse(cacheValue)
    }

    // Mongo fallback
    else {
      logger.info(`${key} just fellback to mongo while looking for the ${collection} collection!`)
      if (collection === 'user') {
        result = await USER.findOne({ id: key })
        if (result != null) {
          client.hset(collection, key, JSON.stringify(result))
        }
      } else if (collection === 'form') {
        result = await FORM.findOne({ id: key })
        if (result != null) {
          client.hset(collection, key, JSON.stringify(result))
        }
      } else if (collection === 'formanswer') {
        result = await FORMANSWERS.findOne({ id: key })
        if (result != null) {
          client.hset(collection, key, JSON.stringify(result))
        }
      } else {
        logger.error(`${collection} is not a valid collection name - user, form, formanswers!`)
        return
      }
    }
    if (result !== null) {
      result['save'] = async () => {
        let mdbupdate
        if (collection === 'user') {
          mdbupdate = await USER.findOne({ id: key })
        } else if (collection === 'form') {
          mdbupdate = await FORM.findOne({ id: key })
        } else if (collection === 'formanswers') {
          mdbupdate = await FORMANSWERS.findOne({ id: key })
        } else {
          throw new Error(`${collection} is not a valid collection name!`)
        }
        for (const o in result) {
          if (result.hasOwnProperty(o)) {
            if (o !== 'save') {
              mdbupdate[o] = result[o]
            }
          }
        }
        await mdbupdate.save()
        await client.hdel(collection, key)
        await client.hset(collection, key, JSON.stringify(mdbupdate))
        return true;
      }
    }
    return result
  },

  async removeCache(collection, key) {
    await client.hdel(collection, key);
    return true;
  },
  async createCache(collection, key, data) {
    await client.hset(collection, key, JSON.stringify(data));
    return true;
  },



  // Get all values and kays from collection
  // This returns the same array that mongo does.
  async getallCache(collection) {
    const all = await client.hgetall(collection)

    const map = new Map(Object.entries(all)) // Convert to map
    const res = [];
    map.forEach(function callbackFn(value, key) {
      const json = JSON.parse(value)
      res.push(json)
    })
    return res
  },
}
