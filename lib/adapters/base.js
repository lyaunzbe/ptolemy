'use strict';

const Needle = require('needle');

const Errors = require('../errors');
const InvalidResponseError = Errors.InvalidResponseError;

class BaseAdapter {

  constructor (config, logger) {
    this._config = config || {};
    this._logger = logger || console;
    this._supportedFormats = this._config.supportedFormats || BaseAdapter.defaultSupportedFormats;
    this._retryCount = this._config.retryCount || 3; // number of automatic retries before giving up
    this._retryBackoff = this._config.retryBackoff || 250; // milliseconds between retries... increases linearly
    this._requests = {};
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
    if (crs === 'local') {
      return true;
    }
    else if (crs.indexOf('arbitrary') !== -1) {
      return true;
    }
    else {
      const code = crs.replace('epsg:', '');
      if (code.match('[0-9]+') && code.length < 7) {
        return true;
      } else {
        return false;
      }
    }
  }

  isValidCRSFormat (format) {
    return this._supportedFormats.indexOf(format) !== -1;
  }

  get (crs, format) { // eslint-disable-line no-unused-vars
    this._logger.error('This method should be overridden by the subclass');
  }

  makeRequest (method, url, data, options) {
    let requests = this._requests[url];
    if (!requests || !requests.length) {
      requests = this._requests[url] = this._prepareRequests(method, url, data, options);
    }

    const request = requests.shift();
    if (requests.length === 0) {
      this._logger.info('Last retry...');
      return request();
    }
    else {
      return request()
      .catch(() => {
        this._logger.info(`Retrying request for ${url}... ${this._retryCount - requests.length}`);
        return this.makeRequest(method, url, data, options);
      })
      .then((res) => {
        requests = [];
        return res;
      });
    }
  }

  _makeRequest (method, url, data, options) {
    options = options || {};
    return new Promise((resolve, reject) => {
      this._logger.info(`Sending request for ${url}`);
      Needle.request(method, url, data, options, (err, res) => {
        if (err) {
          reject(err);
        }
        else if (res.statusCode !== 200) {
          reject(new InvalidResponseError(res.statusCode, res.body, {
            url: url,
            adapter: this.constructor.name,
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

  _prepareRequests (method, url, data, options) {
    const requests = [];
    for (var i = 0; i < this._retryCount; i++) {
      const makeRequestFn = this._makeRequest.bind(this, method, url, data, options);
      const wait = this._retryBackoff * i;
      requests.push(function () {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            makeRequestFn().then(resolve).catch(reject);
          }, wait);
        });
      });
    }
    return requests;
  }
}

module.exports = BaseAdapter;
