var ptolemy = require('../'),
    should = require('should');

var wgs84_ogcwkt = 'GEOGCS["WGS 84",DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.257223563,AUTHORITY["EPSG","7030"]],AUTHORITY["EPSG","6326"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4326"]]';
var wgs84_name = "WGS 84";

describe('Basic Usage', function () {
  
  describe('when invalid projection format is passed', function () {
    it('returns an error complaining about the invalid projection format', function (done) {
      ptolemy.get('4326', 'fakeformat')
      .catch((e) => {
        should.exist(e);
        done();
      });
    });
  });

  describe('when invalid epsg srid is passed', function () {
    it('returns a validation error', function (done) {
      ptolemy.get('JGD2000', 'wkt')
      .catch((e) => {
        should.exist(e);
        done();
      });
    });
  });

  describe('when non-existent epsg srid is passed', function () {
    this.timeout(5000);
    it('returns a 404 error', function (done) {
      ptolemy.get('9999', 'wkt')
      .catch((e) => {
        should.exist(e);
        done();
      });
    });
  });

  describe('when valid epsg srid and projection format is passed', function () {
    it('returns the proper projection and site name in the format requested', function (done) {
      ptolemy.get('4326', 'wkt')
      .then((res) => {
        res.wkt.should.equal(wgs84_ogcwkt);
        res.name.should.equal(wgs84_name);
        done();
      })
      .catch((e) => {
        should.not.exist(e);
      });
    });
  });
});
