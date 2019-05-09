import { logger } from '../modules/logger/logger'
import mongoose   from 'mongoose'

mongoose.set('debug', (collection, method, query, doc, options) => {
  logger.debug({ topic: 'db', scope: 'query', dbquery: { collection, method, query, doc, options}})
})

export default async function(req, _res, next) {
  if (mongoose.connection.readyState === 0) {
    req.log.info({ db_url: req.db_url }, 'Connecting to the Mongo DB')
    await mongoose.connect(req.db_url, { useNewUrlParser: true, keepAlive: true, keepAliveInitialDelay: 300000 })
  }
  if (next) next()
}