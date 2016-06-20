# ptolemy
[![Build Status](http://img.shields.io/travis/Skycatch/ptolemy.svg?style=flat-square)](https://travis-ci.org/Skycatch/ptolemy)
To update: [![Build Status](http://img.shields.io/npm/v/ptolemy.svg?style=flat-square)](https://www.npmjs.org/package/ptolemy)

![ptolemy](http://i.imgur.com/OEqohGJ.png)

A simple way to retrieve geographic projection information, in a variety of formats, from an [EPSG SRID](http://en.wikipedia.org/wiki/SRID). Uses the [epsg.io](http://epsig.io/about/) database.

The following formats for projections are supported:
 
 * proj4
 * wkt
 * prettywkt (human-readable)
 * esriwkt
 * gml
 * mapnik
 * [proj4js](http://proj4js.org/) (returns js code - always be careful when using eval)

Install
-------

```
$ npm install ptolemy
```

Example
-----

```js
var ptolemy = require('ptolemy');

ptolemy.get('2004', 'proj4', function (err, resp) {
  console.log(resp);
});

// Result
{
  "epsg": 2004,
  "name": "Montserrat 1958 / British West Indies Grid",
  "proj4": "+proj=tmerc +lat_0=0 +lon_0=-62 +k=0.9995000000000001 +x_0=400000 +y_0=0 +ellps=clrk80 +towgs84=174,359,365,0,0,0,0 +units=m +no_defs"
}
```

Development Testing
-------
```sh
# Install library locally
$ npm install .
# Test
$ npm test
```

Credits
---------
[http://epsg.io/](http://epsg.io/)

Copyright
---------

[MIT License](LICENSE)
