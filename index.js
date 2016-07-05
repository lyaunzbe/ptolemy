const needle = require('needle');
const Bluebird = require('bluebird');
const InvalidFormatError = require('./error').InvalidFormatError;
const InvalidSRIDError = require('./error').InvalidSRIDError;
const StatusCodeError = require('./error').StatusCodeError;
const NameError = require('./error').NameError;

// Promisify Needle.get()
const promisfiedGet = Bluebird.promisify(needle.get);

const BASE_URL = 'http://epsg.io/';

function Ptolemy() {}

/**
 * CURRENTLY SUPPORTED PROJECTION FORMATS:
 * prettywkt (Well Known Text as HTML)
 * wkt (OGC WKT)
 * esriwkt (ESRI WKT)
 * gml (OGC GML)
 * xml
 * proj4
 * js (Proj4js - always be careful when using eval)
 * usgs
 * geoserver
 * mapfile (MapServer - MAPfile)
 * mapnik
 * sql (PostGIS)
 */
var formatWhiteList = [
  'prettywkt',
  'wkt',
  'esriwkt',
  'proj4',
  'js',
  'usgs',
  'geoserver',
  'mapfile',
  'mapnik',
  'sql',
];

// UTIL FUNCTIONS
function isValidEPSG(srid) {
  if (srid.match('[0-9]+') && srid.length < 7) {
    return true;
  } else {
    return false;
  }
}

/**
 * Provide an EPSG SRID and the requested projection format you want to retrieve.
 *
 * @param  {string or number} epsg The EPSG SRID
 * @param  {string} info The projection info being requested
 * @return {function} returnObj  Returns projection info requested
 */
Ptolemy.prototype.get = function(epsg, format) {
  format = format.toLowerCase();
  epsg = epsg.toString();
  var returnObj = {};
  returnObj.epsg = epsg;

  if (!isValidEPSG(epsg)) {
    return Bluebird.reject(new InvalidSRIDError('Invalid EPSG SRID.'));
  }

  if (!(formatWhiteList.indexOf(format) > -1)) {
    return Bluebird.reject(new InvalidFormatError('Invalid format.'));
  }

  var requestURL = BASE_URL + epsg + '.' + format;
  // Note: We parse the SRID's XML to get the Site Name (avoids scraping)
  var nameURL = BASE_URL + epsg + '.xml';
  var opts = {
    timeout: 4000
  };

  return promisfiedGet(requestURL, opts)
  .then((res) => {
    if (res.statusCode !== 200) {
      return Bluebird.reject(new StatusCodeError(res.statusCode + ': ' + res.statusMessage));
    }
    returnObj[format] = res.body;
    return promisfiedGet(nameURL, {
      timeout: 4000
    })
    .then((res) => {
      // Parse XML for name
      if (res.body['gml:ProjectedCRS']) {
        returnObj.name = res.body['gml:ProjectedCRS']['gml:srsName'];
      }
      else if (res.body['gml:GeographicCRS']) {
        returnObj.name = res.body['gml:GeographicCRS']['gml:srsName'];
      }
      else {
        return Bluebird.reject(new NameError('Projection doesn\'t support requested format.'));
      }

      return returnObj;
    });
  }).catch((e) => {
    throw e;
  });
};

module.exports = new Ptolemy();
