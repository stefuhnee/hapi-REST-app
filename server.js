'use strict';

const Hapi = require('hapi');
const mongoose = require('mongoose');
const server = new Hapi.Server();
const dbPort = process.env.MONGOLAB_URI || 'mongodb://localhost/dev_db';

mongoose.connect(dbPort);

server.connection({
  host: 'localhost',
  port: 3000
});
