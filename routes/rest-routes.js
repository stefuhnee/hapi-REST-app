'use strict';

const Resource = require('../schema/resource');
const notFound = require('./not-found');

module.exports = [{
  method: '*',
  path: '/{p*}',
  handler: notFound
}];
