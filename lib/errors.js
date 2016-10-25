'use strict';

class ExtendableError extends Error {
  constructor (message, meta) {
    super();
    this.message = message;
    this.stack = (new Error(message)).stack;
    this.name = this.constructor.name;
    Object.assign(this, meta);
  }
}

exports.UnknownCRSError = class UnknownCRSError extends ExtendableError {
  constructor (crs, meta) {
    const m = `Unknown Coordinate Reference System: ${crs}`;
    super(m, meta);
  }
};

exports.UnknownCRSFormatError = class UnknownCRSFormatError extends ExtendableError {
  constructor (format, meta) {
    const m = `Unknown Coordinate Reference System format: ${format}`;
    super(m, meta);
  }
};

exports.InvalidResponseError = class InvalidResponseError extends ExtendableError {
  constructor (statusCode, body, params, meta) {
    const m = `Invalid Response Status Code: ${statusCode}`;
    super(m, meta);
    this.requestParams = params;
    this.responseBody = body;
    this.responseStatusCode = statusCode;
  }
};
