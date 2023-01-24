'use strict';

/**
 * Loads projections using the Skycatch Projections API
 *
 * NOTE Skycatch Projections API will fall back to epsg.io if it does not exist in the Skycatch
 * projections API database
 *
 * TODO This is a temporary implementation
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

    if (!this.isValidCRS(crs)) {
      return Promise.reject(new UnknownCRSError(crs));
    }

    if (!this.isValidCRSFormat(format)) {
      return Promise.reject(new UnknownCRSFormatError(format));
    }

    const normalizedFormat = this._normalizeFormat(format);
    return this._getProjection(crs, normalizedFormat)
    .then((res) => {

      const obj = {};
      obj.source = 'skycatch';
      obj.crs = crs;
      obj.name = res.name;
      obj[format] = res[normalizedFormat];
      return obj;
    });
  }

  _normalizeFormat (format) {

    const map = {
      wkt: 'ogcwkt',
    };

    format = format.toLowerCase();
    return map[format] || format;
  }

  _castEPSGCode (crs) {

    let lowerCaseCRS = crs.toString().toLowerCase();

    if (lowerCaseCRS !== 'local' &&
      lowerCaseCRS.indexOf('arbitrary') === -1 &&
      lowerCaseCRS.indexOf('epsg') === -1) {
      lowerCaseCRS = `epsg:${lowerCaseCRS}`;
    }

    return lowerCaseCRS;
  }

  _getProjection (crs, format) {

    const url = 'https://s3-us-west-2.amazonaws.com/skycatch-projections/data.json';
    const options = {timeout: 4000};

    // fetch the projections from s3
    return this.makeRequest('GET', url, null, options)
    .then((data) => {

      const code = this._castEPSGCode(crs).toUpperCase();
      const crsData = data[code];

      if (!crsData) {
        throw new UnknownCRSError(crs, {
          adapter: this.constructor.name
        });
      }

      if (!crsData[format]) {
        throw new UnknownCRSFormatError(format, {
          crsData: crsData
        });
      }

      return crsData;
    });
  }
}

module.exports = SkycatchAdapter;
