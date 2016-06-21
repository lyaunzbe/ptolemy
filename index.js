var needle = require('needle');
var Bluebird = require('bluebird');

// Promisify Needle.get()
var promisfiedGet = Bluebird.promisify(needle.get);

var BASE_URL = 'http://epsg.io/';
var Ptolemy = {};

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
  'gml',
  'xml',
  'proj4',
  'js',
  'usgs',
  'geoserver',
  'mapfile',
  'mapnik',
  'sql'
];

// UTIL FUNCTIONS
function isValidEPSG (srid) {
  if (srid.match("[0-9]+") && srid.length < 7) {
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
 * @return {function} callback Returns projection info requested
 */
Ptolemy.get = ((epsg, format) => {
	epsg = epsg.toString();
  var returnObj = {};
  returnObj.epsg = epsg;

  if (!isValidEPSG(epsg)) {
    throw Error('Invalid EPSG SRID.');
  }
  
  if (!(formatWhiteList.indexOf(format) > -1)) {
    throw Error('Invalid format.');
  }
	
	var requestURL = BASE_URL + epsg + '.' + format;
  // Note: We parse the SRID's XML to get the Site Name (avoids scraping)
	var nameURL = BASE_URL + epsg + '.xml';
  
	return promisfiedGet(requestURL, {timeout: 4000})
	.then((res) => {
    returnObj[format] = res.body;
    return promisfiedGet(nameURL, {timeout: 4000})
    .then((res) => {
      // Parse XML for name
      try {
        returnObj.name = res.body["gml:ProjectedCRS"]["gml:srsName"];
      }
      catch (e) {
        returnObj.name = res.body["gml:GeographicCRS"]["gml:srsName"];
      }

      return returnObj;
    });
	}).catch((e) => {
    throw e;
  });
});

module.exports = Ptolemy;
