#!/usr/bin/env node

'use strict';

const Ptolemy = require('../lib/ptolemy');

const argv = require('yargs')
.command('fetch', 'fetch a projection', (yargs) => {
  return yargs
  .describe('epsg', 'EPSG code').demandOption('epsg')
  .describe('format', 'Return formt').default('format', 'proj4');
})
.demandCommand()
.argv;

const ptolemy = new Ptolemy({
  adapters: [{name: 'skycatch'}, {name: 'epsgio'}]
});

ptolemy.getProjection(argv.epsg, argv.format)
.then((res) => {
  console.log(res);
})
.catch((e) => {
  throw e;
});
