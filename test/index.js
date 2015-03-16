var ptolemy = require('../'),
    should = require('should');

var wgs84_ogcwkt = 'GEOGCS["WGS 84",DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.257223563,AUTHORITY["EPSG","7030"]],AUTHORITY["EPSG","6326"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4326"]]';

describe('Basic Usage', function () {
  
  describe('when invalid projection format is passed', function () {
    it('returns an error complaining about the invalid projection format', function (done) {
      ptolemy.get('4326', 'html', function (err, resp) {
        should.exist(err);
        done();
      });
    });

  });

  describe('when invalid epsg srid is passed', function () {
    it('returns a validation error', function (done) {
      ptolemy.get('JGD2000', 'ogcwkt', function (err, resp) {
        should.exist(err);
        done();
      });
    });
  });

  describe('when non-existant epsg srid is passed', function () {
    it('returns a 404 error', function (done) {
      ptolemy.get('9999', 'ogcwkt', function (err, resp) {
        should.exist(err);
        done();
      });
    });
  });

  describe('when valid epsg srid and projection format is passed', function () {
    it('returns the proper projection in the format requested', function (done) {
      ptolemy.get('4326', 'ogcwkt', function (err, resp) {
        should.not.exist(err);
        resp.should.equal(wgs84_ogcwkt);
        done();
      });
    });
  });
});