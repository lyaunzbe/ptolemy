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
