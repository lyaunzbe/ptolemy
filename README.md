# ptolemy
[![Build Status](http://img.shields.io/travis/lyaunzbe/ptolemy.svg?style=flat-square)](https://travis-ci.org/lyaunzbe/ptolemy)
[![Build Status](http://img.shields.io/npm/v/ptolemy.svg?style=flat-square)](https://www.npmjs.org/package/ptolemy)

![ptolemy](http://i.imgur.com/OEqohGJ.png)

A simple way to retrieve geographic projection information, in a variety of formats, from an [EPSG SRID](http://en.wikipedia.org/wiki/SRID). Uses the [epsg.io](http://epsig.io/about/) website.

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

Usage
-----

```js
var ptolemy = require('ptolemy');

ptolemy.get('4326', 'ogcwkt', function (err, resp) {
  console.log(resp);
});

// Result
'GEOGCS["WGS 84",DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.257223563,AUTHORITY["EPSG","7030"]],AUTHORITY["EPSG","6326"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4326"]]'
```

Credits
---------
[http://epsg.io/](http://epsg.io/)

Copyright
---------

(c) 2015 Ben Lyaunzon Licensed under the MIT license.
