import serializers from 'pino-std-serializers'
import uuid        from 'uuid/v1'

export const startTime = Symbol('startTime')

export const stdSerializers = {
  req: serializers.req,
  res: serializers.res,
}

export default function pinoLogger(opts, stream) {
  if (opts && opts._writableState) {
    stream = opts
    opts = null
  }

  opts = opts || {}
  opts.serializers = opts.serializers || {}
  opts.serializers.req = serializers.wrapRequestSerializer(opts.serializers.req || serializers.req)
  opts.serializers.res = serializers.wrapResponseSerializer(opts.serializers.res || serializers.res)
  opts.serializers.err = opts.serializers.err || serializers.err

  opts.headerName = opts.headerName || 'X-Request-Id'
  delete opts.headerName

  var useLevel = opts.useLevel || 'info'
  delete opts.useLevel

  var theStream = opts.stream || stream
  delete opts.stream

  var filters = opts.filters || []
  delete opts.filters

  var logger = wrapChild(opts, theStream)
  var genReqId = reqIdGenFactory(opts.genReqId)

  loggingMiddleware.logger = logger
  return loggingMiddleware

  function reqIdGenFactory(func) {
    if (typeof func === 'function') return func
    return function genReqId (req) {
      return req.id || req.headers[opts.headerName] ||  uuid()
    }
  }

  function onResFinished(err) {
    this.removeListener('error', onResFinished)
    this.removeListener('finish', onResFinished)

    var log = this.log
    var duration = Date.now() - this[startTime]

    if (err || this.err || this.statusCode >= 400) {
      log.error({
        res: this,
        err: err || this.err || new Error('failed with status code ' + this.statusCode),
        duration
      }, 'request errored')
      return
    }
    if (this.canLog) log[useLevel]({ res: this, duration }, 'request finish')
  }

  function onResClosed() {
    this.removeListener('close', onResClosed)
    var log = this.log
    var duration = Date.now() - this[startTime]

    log.warn({ res: this, duration }, 'request socket closed')
  }

  function loggingMiddleware(req, res, next) {
    req.id = genReqId(req)
    req.log = res.log = logger.child({ topic: 'routes', scope: 'request', reqid: req.id })
    req.canLog = res.canLog = canLog(req.url)
    res[startTime] = res[startTime] || Date.now()
    if (!req.res) { req.res = res }

    res.on('finish', onResFinished)
    res.on('error',  onResFinished)
    res.on('close',  onResClosed)

    if (req.canLog) req.log[useLevel]({ req }, 'request start - %s %s', req.method, req.url)
    if (next) next()
  }

  function canLog(url) {
    if (filters.length === 0) return true
    return filters.some(filter => {
      try {
        if (filter.startsWith('!')) {
          return RegExp(filter.substring(1)).exec(url) === null
        } else {
          return RegExp(filter).exec(url) !== null
        }
      } catch(err) {
        return false
      }
    })
  }
}

function wrapChild(opts, stream) {
  var prevLogger = opts.logger
  var prevGenReqId = opts.genReqId
  var logger = null

  if (prevLogger) {
    opts.logger   = undefined
    opts.genReqId = undefined

    logger = prevLogger.child(opts)
    opts.logger   = prevLogger
    opts.genReqId = prevGenReqId
  } else {
    logger = pino(opts, stream)
  }

  return logger
}

