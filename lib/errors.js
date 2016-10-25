'use strict';

class ExtendableError extends Error {
  constructor (message) {
    super();
    this.message = message;
    this.stack = (new Error(message)).stack;
    this.name = this.constructor.name;
  }
}

exports.UnknownCRSError = class UnknownCRSError extends ExtendableError {
  constructor (crs) {
    const m = `Unknown Coordinate Reference System: ${crs}`;
    super(m);
  }
};

exports.UnknownCRSFormatError = class UnknownCRSFormatError extends ExtendableError {
  constructor (format) {
    const m = `Unknown Coordinate Reference System format: ${format}`;
    super(m);
  }
};

exports.InvalidResponseError = class InvalidResponseError extends ExtendableError {
  constructor (statusCode, body, params) {
    const m = `Invalid Response Status Code: ${statusCode}`;
    super(m);
    this.requestParams = params;
    this.responseBody = body;
    this.responseStatusCode = statusCode;
  }
};
