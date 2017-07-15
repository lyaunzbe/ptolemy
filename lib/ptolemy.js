'use strict';


const Errors = require('./errors');
const UnknownCRSError = Errors.UnknownCRSError;

const Logger = console;

const Epsgio = require('./adapters/epsgio');
const Skycatch = require('./adapters/skycatch');
const kAdapters = {};
const kCache = {};

class Ptolemy {
  constructor (config, logger) {

    Ptolemy.registerBundledAdapters();

    this._config = config || {};
    this._logger = logger || Logger;
  }

  static get defaultAdapter () {
    return {name: 'epsgio'};
  }

  static get bundledAdapters () {
    return [
      {name: 'epsgio', adapter: Epsgio},
      {name: 'skycatch', adapter: Skycatch}
    ];
  }

  static get adapters () {
    return kAdapters;
  }

  static get (crs, format, cb) {
    Logger.warn('Static method "get" is deprecated and will be removed in a future version. Use instance method "getProjection" instead. See README for details.');

    const ptolemy = new Ptolemy();
    const adapter = ptolemy._loadAdapter(Ptolemy.defaultAdapter.name);

    let errored = false;

    adapter.get(crs, format)
    .catch((err) => {
      errored = true;
      Logger.error(err);
      cb(err);
    })
    .then((res) => {
      if (!errored) {
        cb(null, res);
      }
    });
  }

  static deregisterAdapter (name) {
    delete kAdapters[name];
  }

  static registerAdapter (name, adapter) {
    kAdapters[name] = adapter;
  }

  static registerBundledAdapters () {
    Ptolemy.bundledAdapters.forEach(function (adapter) {
      Ptolemy.registerAdapter(adapter.name, adapter.adapter);
    });
  }

  static get cache () {
    return kCache;
  }

  static emptyCache () {
    Object.keys(kCache).forEach((key) => {
      delete kCache[key];
    });
  }

  static getCacheKey (crs, format) {
    return [crs, format].join('_');
  }

  static getFromCache (key) {
    Logger.info(`Cache hit for ${key}`);
    return kCache[key];
  }

  static setCache (key, value) {
    kCache[key] = value;
    return value;
  }

  static removeFromCache (key) {
    const val = kCache[key];
    delete kCache[key];
    return val;
  }

  getProjection (crs, format) {
    const adapters = this._config.adapters || [Ptolemy.defaultAdapter];
    const cachekey = Ptolemy.getCacheKey(crs, format);
    const cached = Ptolemy.getFromCache(cachekey);

    // if multiple adapters are specified then all are used
    const promises = adapters.map((adapterObj) => {
      if (cached) {
        return Promise.resolve(cached);
      }
      else {
        const adapter = this._loadAdapter(adapterObj.name, adapterObj.config || this._config);
        return adapter.get(crs, format)
        .catch((err) => {
          return err;
        });
      }
    });

    // wait until all requests have resolved
    // TODO refactor so this is a race for the first non-error response
    return Promise.all(promises)
    .then((results) => {
      // filter for non-error response and return the first one
      const filtered = results.filter((res) => {
        return !(res instanceof Error);
      });

      if (filtered.length === 0) {
        throw new UnknownCRSError(crs, {
          errors: results
        });
      }

      return filtered[0];
    })
    .then((proj) => {
      // cache it before returning
      return Ptolemy.setCache(cachekey, proj);
    });
  }

  // Private ///////////////////////////////////////////////////////////////////

  _loadAdapter (name, config) {
    const Adapter = Ptolemy.adapters[name];

    if (!Adapter) {
      throw new Error(`Unknown Adapter ${name}`);
    }

    return new Adapter(config, this._logger);
  }
}

module.exports = Ptolemy;
