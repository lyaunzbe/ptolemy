'use strict';

const Code = require('code');
const Lab = require('lab');

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

const BaseAdapter = require('../../lib/adapters/base');

describe('BaseAdapter', function () {
  describe('isValidCRS', function () {
    it('returns true when passed a valid crs', function (done) {
      const adapter = new BaseAdapter();
      expect(adapter.isValidCRS('epsg:4326')).to.equal(true);
      done();
    });

    it('returns false when passed an invalid crs', function (done) {
      const adapter = new BaseAdapter();
      expect(adapter.isValidCRS('invalid:4326')).to.equal(false);
      done();
    });
  });
});
