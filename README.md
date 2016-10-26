# ptolemy
[![Build Status](http://img.shields.io/travis/Skycatch/ptolemy.svg?style=flat-square)](https://travis-ci.org/Skycatch/ptolemy)
[![Build Status](http://img.shields.io/npm/v/ptolemy.svg?style=flat-square)](https://www.npmjs.org/package/ptolemy)

![ptolemy](http://i.imgur.com/OEqohGJ.png)

A simple way to retrieve geographic projection information, in a variety of formats, from an [EPSG SRID](http://en.wikipedia.org/wiki/SRID). Uses the [EPSG.io](http://epsig.io/about/) database.

The following formats for projections are supported (**Disclaimer**: Not all SRIDs will support every format.):

 * prettywkt (Well Known Text as HTML)
 * wkt (OGC WKT)
 * esriwkt (ESRI WKT)
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
const ptolemy = new Ptolemy({
  adapters: [{name: 'skycatch'}, {name: 'epsgio'}]
});

ptolemy.getProjection('epsg:2004', 'proj4')
.then((res) => {
  console.log(res);
})
.catch((e) => {
  throw e;
});

// Result
{
  "crs": "epsg:2004",
  "name": "Montserrat 1958 / British West Indies Grid",
  "proj4": "+proj=tmerc +lat_0=0 +lon_0=-62 +k=0.9995000000000001 +x_0=400000 +y_0=0 +ellps=clrk80 +towgs84=174,359,365,0,0,0,0 +units=m +no_defs"
}
```

### Ptolemy Configuration

- **adapters** `array` specify the source adapters that you want to use.
  - when specifying multiple adapters, ALL adapters will be queried. However only one of the responses will be returned because it is assumed that the projection information will be the same regardless of the source.
  - the `skycatch adapter` is incomplete and only uses hardcoded values right now

## THE FOLLOWING USAGE IS DEPRECATED
```js
var Ptolemy = require('ptolemy');

Ptolemy.get('epsg:2004', 'proj4')
.then((res) => {
  console.log(res);
})
.catch((e) => {
  throw e;
});

// Result
{
  "crs": "epsg:2004",
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

Resources for CRS Info

- http://spatialreference.org/
- http://epsg.io/
- http://www.epsg-registry.org for example http://www.epsg-registry.org/export.htm?wkt=urn:ogc:def:crs:EPSG::6675

> NOTE: The data from http://www.epsg-registry.org cannot be used without modification in Pix4D.

- https://github.com/JuliaGeo/Proj4.jl/blob/master/gen/epsg - a good place to check proj4 values

License
-------

[MIT License](LICENSE)
