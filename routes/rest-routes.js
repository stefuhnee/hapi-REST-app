'use strict';

const Dinosaur = require('../schema/dinosaur');
const notFound = require('./not-found');

module.exports = [
  {
    method: 'GET',
    path: '/dinosaur',
    handler: function(request, reply) {
      Dinosaur.find({}, (err, dinosaur) => {
        if (err) {
          console.log('Error', err);
          return reply('Error: extinction!!!!!!!');
        }
        return reply({
          statusCode: 200,
          message: 'The dinosaurs are roaming again!',
          dinosaur: dinosaur
        });
      });
    }
  },
  {
    method: '*',
    path: '/{p*}',
    handler: notFound
  }];
