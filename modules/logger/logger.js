import pino from 'pino'

const level       = process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug')
const redact      = ['key', 'password', 'salt', 'hash']
const serializers = {
  err:     pino.stdSerializers.err,
  user:    user => { return user ? { username: user.username, email: user.email, role: user.role, token: user.token } : {} },
  dbquery: data => {
    if (!data) return
    const query   = JSON.stringify(data.query   || {})
    const options = JSON.stringify(data.options || {})

    return `db.${data.coll}.${data.method}(${query}, ${options});`
  },
}

export const logger = (
  pino.destination
    ? pino({ level, serializers, redact }, pino.destination(process.env.LOG_FILE ? process.env.LOG_FILE : 1))
    : pino({ level, serializers, redact, browser: { asObject: true } })
).child({ topic: 'main', scope: 'main' })
