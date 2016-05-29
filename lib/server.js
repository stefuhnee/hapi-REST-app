'use strict';

const Hapi = require('hapi');
const mongoose = require('mongoose');
const routes = require('../routes/rest-routes');

const server = new Hapi.Server();
const dbPort = process.env.MONGOLAB_URI || 'mongodb://localhost/dev_db';

mongoose.connect(dbPort);

server.connection({
  host: 'localhost',
  port: 3000
});

server.start((err) => {
  if (err) throw err;
  console.log(`Server up on ${server.info.uri}`);
});


server.route(routes);

module.exports = server;
