import { format } from 'util'

export class HTTPError extends Error {
  constructor(http_status, message, ...args) {
    super(args.length > 0 ? format.apply(null, [message, ...args]) : message)
    this.status     = http_status
    this.statusCode = http_status
  }
}

export class SystemError extends Error {
  constructor(errno, message, ...args) {
    super(args.length > 0 ? format.apply(null, [message, ...args]) : message)
    this.code = errno
  }
}

export class NotFoundError extends Error {
  constructor(what, message, ...args) {
    super(args.length > 0 ? format.apply(null, [message, ...args]) : message)
    this.what = what
  }
}

export class ArgumentInvalidError extends Error {
  constructor(name, value, message, ...args) {
    super(args.length > 0 ? format.apply(null, [message, ...args]) : message)
    this.name  = name
    this.value = value
  }
}

export class ArgumentMissingError extends Error {
  constructor(name, message, ...args) {
    super(args.length > 0 ? format.apply(null, [message, ...args]) : message)
    this.name  = name
  }
}

export class InvalidCredentialsError extends Error {
  constructor(message, ...args) {
    super(args.length > 0 ? format.apply(null, [message, ...args]) : message)
    this.id = 'error.auth.credentials.invalid'
  }
}
