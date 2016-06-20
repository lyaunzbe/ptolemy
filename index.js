var needle = require('needle');
var Bluebird = require('bluebird');
var xml2js = require('xml2js');

// Promisify Needle.get()
var promisfiedGet = Bluebird.promisify(needle.get);

var BASE_URL = 'http://epsg.io/';
var Ptolemy = {};

var formatWhiteList = [
  'proj4',
  'wkt',
  'prettywkt',
  'esriwkt',
  'gml',
  'mapnik',
  'proj4js'
];

/**
 * CURRENTLY SUPPORTED PROJECTION FORMATS:
 * prettywkt (Well Known Text as HTML)
 * ogcwkt
 * esriwkt
 * ogcgml
 * xml
 * proj4
 * proj4js (always be careful when using eval)
 * usgs
 * geoserver
 * mapfile (MapServer - MAPfile)
 * mapnik
 * sql (PostGIS)
 */

function isValidEPSG (srid) {
  if (srid.match("[0-9]+") && srid.length < 7) {
    return true;
  } else {
    return false;
  }
}

Ptolemy.get = ((epsg, format) => {
	epsg = epsg.toString();
	
	var requestURL = BASE_URL + epsg + "." + format;
	return promisfiedGet(requestURL, {timeout:4000})
	.then((res) => {
    return res;
	}).catch((e) => {
    throw e;
  });

	//if(!validateEPSG(epsg)) {
	//	return Error;
	//}

});

/**
 * Provide an EPSG SRID and the requested projection format you want to retrieve.
 * 
 * @param  {string or number} epsg The EPSG SRID
 * @param  {string} info The projection info being requested
 * @return {function} callback Returns projection info requested
 */

//Ptolemy.get = function(epsg, format, callback) {
//  epsg = epsg.toString();
//  if (validateEPSG(epsg)) {
//    if (formatWhiteList.indexOf(format) > -1) {
//      var requestURI = BASE_URI + epsg + '.' + format;
//      needle.get(requestURI, {timeout:4000}, function(error, response) {
//        if (!error && response && response.statusCode == 200){
//          callback(null, response.body);
//        } else if (response && response.statusCode) {
//          callback(response.statusCode + ' : ' + response.body);
//        } else {
//          callback(error);
//        }
//      });
//    } else {
//      callback('Please make sure you are requesting one of the supported formats.');
//    }
//  } else {
//    callback('Please make sure you are providing a valid EPSG SRID');
//  }
//};

module.exports = Ptolemy;
