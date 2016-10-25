'use strict';

/**
 * Loads projections using the Skycatch Projections API
 *
 * NOTE Skycatch Projections API will fall back to epsg.io if it does not exist in the Skycatch
 * projections API database
 *
 * TODO This has not been implemented yet
 */

const BaseAdapter = require('./base');

const Errors = require('../errors');
const UnknownCRSError = Errors.UnknownCRSError;
const UnknownCRSFormatError = Errors.UnknownCRSFormatError;

class SkycatchAdapter extends BaseAdapter {

  constructor (config, logger) {
    super(config, logger);
  }

  static get baseUrl () {
    return ''; // TODO
  }

  get (crs, format) {
    crs = crs.toString().toLowerCase();
    format = format.toLowerCase();

    if (!this.isValidCRS(crs)) {
      return Promise.reject(new UnknownCRSError(crs));
    }

    if (!this.isValidCRSFormat(format)) {
      return Promise.reject(new UnknownCRSFormatError(format));
    }

    return this._getProjection(crs, format);
  }

  _getProjection (crs, format) {
    // TODO
  }
}

module.exports = SkycatchAdapter;
