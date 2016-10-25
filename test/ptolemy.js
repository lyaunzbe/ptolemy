'use strict';

const Code = require('code');
const Lab = require('lab');
const Ptolemy = require('../');

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

const wgs84_ogcwkt = 'GEOGCS["WGS 84",DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.257223563,AUTHORITY["EPSG","7030"]],AUTHORITY["EPSG","6326"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4326"]]';
const wgs84_name = 'WGS 84';

describe('Ptolemy Basic Usage', function () {
  describe('when invalid projection format is passed', function () {
    it('returns an error complaining about the invalid projection format', function (done) {
      Ptolemy.get('4326', 'fakeformat', function (err) {
        expect(err).to.exist();
        expect(err.constructor.name).to.equal('UnknownCRSFormatError');
        done();
      });
    });
  });

  describe('when an unknown crs is passed', function () {
    it('returns a validation error', function (done) {
      Ptolemy.get('JGD2000', 'wkt', function (err) {
        expect(err).to.exist();
        expect(err.constructor.name).to.equal('UnknownCRSError');
        done();
      });
    });
  });

  describe('when unknown crs is passed', () => {
    it('returns an error', {timeout: 5000}, (done) => {
      Ptolemy.get('9999', 'wkt', function (err) {
        expect(err).to.exist();
        expect(err.constructor.name).to.equal('InvalidResponseError');
        done();
      });
    });
  });

  describe('when unknown crs is passed', () => {
    it('returns an error', {timeout: 5000}, (done) => {
      Ptolemy.get('9999', 'wkt', function (err) {
        expect(err).to.exist();
        expect(err.constructor.name).to.equal('InvalidResponseError');
        done();
      });
    });
  });

  describe('when valid epsg srid and projection format is passed', function () {
    it('returns the proper projection and site name in the format requested', {timeout: 5000}, function (done) {
      Ptolemy.get('epsg:4326', 'wkt', function (err, res) {
        expect(err).to.not.exist();

        expect(res.crs).to.equal('epsg:4326');
        expect(res.wkt).to.equal(wgs84_ogcwkt);
        expect(res.name).to.equal(wgs84_name);
        done();
      });
    });
  });
});

describe('Important coordinate reference systems', function () {
  describe('Well known coordinate reference systems', function () {
    it('returns EPSG:2450 data', {timeout: 5000}, function () {
      return testCommonCRS('EPSG:2450', {
        name: 'JGD2000 / Japan Plane Rectangular CS VIII',
        ogcwkt: 'PROJCS["JGD2000 / Japan Plane Rectangular CS VIII",GEOGCS["JGD2000",DATUM["Japanese_Geodetic_Datum_2000",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],TOWGS84[0,0,0,0,0,0,0],AUTHORITY["EPSG","6612"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4612"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",36],PARAMETER["central_meridian",138.5],PARAMETER["scale_factor",0.9999],PARAMETER["false_easting",0],PARAMETER["false_northing",0],AUTHORITY["EPSG","2450"],AXIS["Y",EAST],AXIS["X",NORTH]]'
      });
    });

    it('returns EPSG:3100 data', {timeout: 5000}, function () {
      return testCommonCRS('EPSG:3100', {
        name: 'JGD2000 / UTM zone 54N',
        ogcwkt: 'PROJCS["JGD2000 / UTM zone 54N",GEOGCS["JGD2000",DATUM["Japanese_Geodetic_Datum_2000",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],TOWGS84[0,0,0,0,0,0,0],AUTHORITY["EPSG","6612"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4612"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",0],PARAMETER["central_meridian",141],PARAMETER["scale_factor",0.9996],PARAMETER["false_easting",500000],PARAMETER["false_northing",0],AUTHORITY["EPSG","3100"],AXIS["Easting",EAST],AXIS["Northing",NORTH]]'
      });
    });

    it('returns EPSG:30176 data', {timeout: 5000}, function () {
      return testCommonCRS('EPSG:30176', {
        name: 'Tokyo / Japan Plane Rectangular CS XVI',
        ogcwkt: 'PROJCS["Tokyo / Japan Plane Rectangular CS XVI",GEOGCS["Tokyo",DATUM["Tokyo",SPHEROID["Bessel 1841",6377397.155,299.1528128,AUTHORITY["EPSG","7004"]],AUTHORITY["EPSG","6301"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4301"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",26],PARAMETER["central_meridian",124],PARAMETER["scale_factor",0.9999],PARAMETER["false_easting",0],PARAMETER["false_northing",0],AUTHORITY["EPSG","30176"],AXIS["Y",EAST],AXIS["X",NORTH]]'
      });
    });
  });

  describe('Custom coordinate reference systems', function () {
    it('returns EPSG:6669 data', {timeout: 5000}, function () {
      return testCustomCRS('EPSG:6669', {
        name: 'JGD2011 / Japan Plane Rectangular CS I',
        ogcwkt: 'PROJCS["JGD2011 / Japan Plane Rectangular CS I",GEOGCS["JGD2011",DATUM["Japanese Geodetic Datum 2011",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],TOWGS84[0,0,0,0,0,0,0],AUTHORITY["EPSG","1128"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4612"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",33],PARAMETER["central_meridian",129.5],PARAMETER["scale_factor",0.9999],PARAMETER["false_easting",0],PARAMETER["false_northing",0],AUTHORITY["EPSG","6669"],AXIS["Y",EAST],AXIS["X",NORTH]]'
      });
    });
  });

  describe('Custom coordinate reference systems', function () {
    it('returns EPSG:6687 data', {timeout: 5000}, function () {
      return testCustomCRS('EPSG:6687', {
        name: 'JGD2011 / Japan Plane Rectangular CS XIX',
        ogcwkt: 'PROJCS["JGD2011 / Japan Plane Rectangular CS XIX",GEOGCS["JGD2011",DATUM["Japanese Geodetic Datum 2011",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],TOWGS84[0,0,0,0,0,0,0],AUTHORITY["EPSG","1128"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4612"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",26],PARAMETER["central_meridian",154],PARAMETER["scale_factor",0.9999],PARAMETER["false_easting",0],PARAMETER["false_northing",0],AUTHORITY["EPSG","6687"],AXIS["Y",EAST],AXIS["X",NORTH]]'
      });
    });
  });
});

const testCommonCRS = function (crs, expected) {
  const ptolemy = new Ptolemy();

  return ptolemy.getProjection(crs, 'wkt')
  .then((res) => {
    expect(res.crs).to.equal(crs.toLowerCase());
    expect(res.name).to.equal(expected.name);
  });
};

const testCustomCRS = function (crs, expected) {
  const ptolemy = new Ptolemy({
    adapters: [{name: 'skycatch'}, {name: 'epsgio'}]
  });

  return ptolemy.getProjection(crs, 'wkt')
  .then((res) => {
    expect(res.crs).to.equal(crs.toLowerCase());
    expect(res.name).to.equal(expected.name);
  });
};
