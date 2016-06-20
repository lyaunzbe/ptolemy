# ptolemy
[![Build Status](http://img.shields.io/travis/Skycatch/ptolemy.svg?style=flat-square)](https://travis-ci.org/Skycatch/ptolemy)
To update: [![Build Status](http://img.shields.io/npm/v/ptolemy.svg?style=flat-square)](https://www.npmjs.org/package/ptolemy)

![ptolemy](http://i.imgur.com/OEqohGJ.png)

A simple way to retrieve geographic projection information, in a variety of formats, from an [EPSG SRID](http://en.wikipedia.org/wiki/SRID). Uses the [EPSG.io](http://epsig.io/about/) database.

The following formats for projections are supported:
 
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

Install
-------

```
$ npm install ptolemy
```

Example
-----

```js
var ptolemy = require('ptolemy');

ptolemy.get('2004', 'proj4')
.then((res) => {
  console.log(res);
})
.catch((e) => {
	throw e;
});

// Result
{
  "epsg": 2004,
  "name": "Montserrat 1958 / British West Indies Grid",
  "proj4": "+proj=tmerc +lat_0=0 +lon_0=-62 +k=0.9995000000000001 +x_0=400000 +y_0=0 +ellps=clrk80 +towgs84=174,359,365,0,0,0,0 +units=m +no_defs"
}
```

Development + Testing
-------
```sh
# Develop library locally
$ npm install
$ npm link
# In project that requires Ptolemy
$ npm link ptolemy # Now points to locally cloned Ptolemy

# Test
$ npm test
```

Credits
---------
[EPSG.io](http://epsg.io/)

License
-------

[MIT License](LICENSE)
