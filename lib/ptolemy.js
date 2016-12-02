'use strict';


const Errors = require('./errors');
const UnknownCRSError = Errors.UnknownCRSError;

const Logger = console;

const epsgio = require('./adapters/epsgio');
const skycatch = require('./adapters/skycatch');
const adapters = {};

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
      {name: 'epsgio', adapter: epsgio},
      {name: 'skycatch', adapter: skycatch}
    ];
  }

  static get adapters () {
    return adapters;
  }

  static get (crs, format, cb) {
    Logger.warn('Static method "get" is deprecated and will be removed in a future version. Use instance method "getProjection" instead. See README for details.');

    const ptolemy = new Ptolemy();
    const adapter = ptolemy._loadAdapter(Ptolemy.defaultAdapter.name);

    let errored = false;

    adapter.get(crs, format)
    .catch((err) => {
      errored = true;
      cb(err);
    })
    .then((res) => {
      if (!errored) {
        cb(null, res);
      }
    });
  }

  static deregisterAdapter (name) {
    delete adapters[name];
  }

  static registerAdapter (name, adapter) {
    adapters[name] = adapter;
  }

  static registerBundledAdapters () {
    Ptolemy.bundledAdapters.forEach(function (adapter) {
      Ptolemy.registerAdapter(adapter.name, adapter.adapter);
    });
  }

  getProjection (crs, format) {
    const adapters = this._config.adapters || [Ptolemy.defaultAdapter];

    // if multiple adapters are specified then all are used
    const promises = adapters.map((adapterObj) => {
      let adapter = this._loadAdapter(adapterObj.name, adapterObj.config);
      return adapter.get(crs, format)
      .catch((err) => {
        return err;
      });
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
