'use strict';
class RouteNotFoundError extends Error {
  constructor(message, extra) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = 'RouteNotFoundError';
    this.message = message || 'You have attempted to access an API endpoint that does not exist.';
    this.extra = extra;
  }
}
module.exports = RouteNotFoundError;