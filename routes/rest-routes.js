'use strict';

const Dinosaur = require('../schema/dinosaur');
const notFound = require('./not-found');

module.exports = [{
  method: '*',
  path: '/{p*}',
  handler: notFound
}];
