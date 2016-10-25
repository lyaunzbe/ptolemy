'use strict';

const Logger = console;
const adapters = {};

class Ptolemy {
  constructor (config, logger) {

    Ptolemy.registerBundledAdapters();

    this._config = config || {};
    this._logger = logger || Logger;
    this._adapter = this._loadAdapter(this._config);
  }

  static get defaultAdapter () {
    return 'epsgio';
  }

  static get bundledAdapters () {
    return [
      'epsgio',
      'skycatch'
    ];
  }

  static get adapters () {
    return adapters;
  }

  static get (crs, format, cb) {
    Logger.warn('Static method "get" is deprecated and will be removed in a future version. Use instance method "getProjection" instead. See README for details.');

    const ptolemy = new Ptolemy();

    ptolemy._adapter.get(crs, format)
    .then((res) => {
      cb(null, res);
    })
    .catch((err) => {
      cb(err);
    });
  }

  static deregisterAdapter (name) {
    delete adapters[name];
  }

  static registerAdapter (name, adapter) {
    adapters[name] = adapter;
  }

  static registerBundledAdapters () {
    Ptolemy.bundledAdapters.forEach(function (filename) {
      let adapter = require(`./adapters/${filename}`);
      Ptolemy.registerAdapter(filename, adapter);
    });
  }

  getProjection (crs, format) {
    return this._adapter.get(crs, format);
  }

  // Private ///////////////////////////////////////////////////////////////////

  _loadAdapter (config) {
    const name = config.adapter || Ptolemy.defaultAdapter;
    const Adapter = Ptolemy.adapters[name];

    if (!Adapter) {
      throw new Error(`Unknown Adapter ${name}`);
    }

    return new Adapter(config, this._logger);
  }
}

module.exports = Ptolemy;
