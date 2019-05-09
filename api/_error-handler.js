import * as _  from 'lodash'
import Consola from 'consola'
import * as Errors from '../models/errors'

const is_production = process.env.NODE_ENV === 'production'

export default function(err, req, res, next) {
  let log = req.log ? req.log.child({ topic: 'routes', controller: 'error-handler', scope: 'error' }) : Consola
  let status =  _.get(err, 'status', 500)

  log.warn({ err }, 'processing an error from a previous middleware')

  if (err instanceof Errors.ArgumentInvalidError)          status = 400 // HTTP BadRequest
  else if (err instanceof Errors.ArgumentMissingError)     status = 400 // HTTP BadRequest
  else if (err instanceof Errors.InvalidCredentialsError)  status = 401 // HTTP Unauthorized
  else if (err instanceof Errors.NotFoundError)            status = 404 // HTTP NotFound
  else if (err instanceof Errors.SystemError) {
    if (err.code === 'ENOENT' || err.code === 'ENOTFOUND') status = 404 // HTTP NotFound
    else if (err.code === 'EINVALID')                      status = 400 // HTTP Bad Request
  }
  
  if (req.accepts('json')) {
    res.status(status).send({
      id:          err.id,
      statusCode:  status,
      http_status: status,
      message:     err.message,
      stack:       is_production ? {} : _.get(err, 'stack', '').split('\n'),
    })
  } else if (req.accepts('html')) {
    // TODO: Use Youch to send a pretty error page
    res.status(status).send({
      id:          err.id,
      statusCode:  status,
      http_status: status,
      message:     err.message,
      stack:       is_production ? {} : _.get(err, 'stack', '').split('\n'),
    })
  } else {
    log.error('cannot retrun JSON/HTML as request doe not accept these')
    res.status(406).send('')
  }
}