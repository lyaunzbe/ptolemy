'use strict';

const BaseAdapter = require('./base');

const Errors = require('../errors');
const UnknownCRSError = Errors.UnknownCRSError;
const UnknownCRSFormatError = Errors.UnknownCRSFormatError;

class EpsgIoAdapter extends BaseAdapter {

  constructor (config, logger) {
    super(config, logger);
  }

  static get baseUrl () {
    return 'https://epsg.io';
  }

  get (crs, format) {
    format = format.toLowerCase();
    crs = crs.toString().toLowerCase();

    if (!this.isValidCRS(crs)) {
      return Promise.reject(new UnknownCRSError(crs));
    }

    if (!this.isValidCRSFormat(format)) {
      return Promise.reject(new UnknownCRSFormatError(format));
    }

    return Promise.all([
      this._getName(crs),
      this._getProjection(crs, format)
    ])
    .then((res) => {
      const obj = {};

      obj.crs = crs;
      obj.name = res[0];
      obj[format] = res[1];

      return obj;
    });
  }

  _getEPSGCode (crs) {
    return crs.toString().toLowerCase().replace('epsg:', '');
  }

  _getName (crs) {
    const code = this._getEPSGCode(crs);
    const url = [EpsgIoAdapter.baseUrl, `${code}.xml`].join('/');
    const options = {timeout: 4000};

    return this.makeRequest('GET', url, null, options)
    .then((body) => {
      let name = '';

      // Parse XML for name
      if (body['gml:ProjectedCRS']) {
        name = body['gml:ProjectedCRS']['gml:srsName'];
      }
      else if (body['gml:GeographicCRS']) {
        name = body['gml:GeographicCRS']['gml:srsName'];
      }

      if (!name) {
        throw new Error('Cannot extract name from CRS definition');
      }

      return name;
    });
  }

  _getProjection (crs, format) {
    const code = this._getEPSGCode(crs);
    const url = [EpsgIoAdapter.baseUrl, `${code}.${format}`].join('/');
    const options = {timeout: 4000};

    return this.makeRequest('GET', url, null, options);
  }
}

module.exports = EpsgIoAdapter;
