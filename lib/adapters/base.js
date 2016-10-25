'use strict';

const Needle = require('needle');

const Errors = require('../errors');
const InvalidResponseError = Errors.InvalidResponseError;

class BaseAdapter {

  constructor (config, logger) {
    this._config = config || {};
    this._logger = logger || console;
    this._supportedFormats = this._config.supportedFormats || BaseAdapter.defaultSupportedFormats;
  }

  static get defaultSupportedFormats () {
    return [
      'prettywkt',
      'wkt',
      'esriwkt',
      'proj4',
      'js',
      'usgs',
      'geoserver',
      'mapfile',
      'mapnik',
      'sql'
    ];
  }

  isValidCRS (crs) {
    const code = crs.replace('epsg:', '');
    if (code.match('[0-9]+') && code.length < 7) {
      return true;
    } else {
      return false;
    }
  }

  isValidCRSFormat (format) {
    return this._supportedFormats.indexOf(format) !== -1;
  }

  get (crs, format) { // eslint-disable-line no-unused-vars
    this._logger.error('This method should be overridden by the subclass');
  }

  makeRequest (method, url, data, options) {
    options = options || {};

    return new Promise((resolve, reject) => {
      Needle.request(method, url, data, options, (err, res) => {
        if (err) {
          reject(err);
        }
        else if (res.statusCode !== 200) {
          reject(new InvalidResponseError(res.statusCode, res.body, {
            url: url,
            method: method,
            data: data
          }));
        }
        else {
          resolve(res.body);
        }
      });
    });
  }
}

module.exports = BaseAdapter;
