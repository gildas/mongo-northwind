// @ts-ignore
const app_info = require('../package.json')
import { existsSync } from 'fs';
import { execSync }   from 'child_process'
import pino           from 'pino'
import express        from 'express'
import { SystemError} from '../models/errors'
import { logger }     from '../modules/logger/logger'

import mongo_middleware from './mongo'
import error_handler    from './_error-handler'
import { add_routes as add_routes_categories } from './categories'
import { add_routes as add_routes_products   } from './products'
import { add_routes as add_routes_regions    } from './regions'

process.on('uncaughtException', pino.final(logger, (err, finalLogger) => {
  finalLogger.error(err, 'uncaughtException')
  process.exit(1)
}))

process.on('unhandledRejection', pino.final(logger, (err, finalLogger) => {
  finalLogger.error(err, 'unhandledRejection')
  process.exit(1)
}))

export function create_api({ db_url }) {
  let node_env = process.env.NODE_ENV || 'development'

  logger.info('='.repeat(80))
  if (node_env !== 'production' && existsSync('.git')) {
    try {
      if (! execSync('command -v git').toString().trim()) throw new SystemError('ENOENT', 'git')
      let revision = execSync('git rev-parse --short HEAD').toString().trim()
      logger.info('Starting %s v. %s-%s (%s)', app_info.name, app_info.version, revision, node_env)
    } catch (err) {
      logger.info('Starting %s v. %s (%s)', app_info.name, app_info.version, node_env)
    }
  } else {
    logger.info('Starting %s v. %s (%s)', app_info.name, app_info.version, node_env)
  }

  let router = express.Router()
  let app    = express()

  // Transform req and res to have the same API as express
  // so we can use res.status() and res.json()
  router.use((req, res, next) => {
    Object.setPrototypeOf(req, app.request)
    Object.setPrototypeOf(res, app.response)
    // Add CORS stuff
    //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1')
    //res.header('Access-Control-Allow-Credentials', 'true')
    req.res = res
    res.req = req
    req['db_url'] = db_url
    next()
  })

  router.use(mongo_middleware)

  add_routes_categories({ router })
  add_routes_products({ router })
  add_routes_regions({ router })

  router.use(error_handler)

  return { path: '/api/v1', handler: router }
}