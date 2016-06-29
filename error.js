'use strict';

class ExtendableError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.stack = (new Error(message)).stack;
    this.name = this.constructor.name;
  }
}

class InvalidSRIDError extends ExtendableError {
  constructor(m) {
    super(m);
  }
}

class InvalidFormatError extends ExtendableError {
  constructor(m) {
    super(m);
  }
}

class StatusCodeError extends ExtendableError {
  constructor(m) {
    super(m);
  }
}

module.exports = {
  InvalidSRIDError: InvalidSRIDError,
  InvalidFormatError: InvalidFormatError,
  StatusCodeError: StatusCodeError
};
