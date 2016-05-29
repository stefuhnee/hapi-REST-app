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
          return reply('Error: extinction!!!!!!! (GET error)');
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
    method: 'POST',
    path: '/dinosaur',
    handler: function(request, reply) {
      let newDinosaur = new Dinosaur(request.payload);
      newDinosaur.save((err) => {
        if (err) {
          console.log('Error', err);
          return reply('You can\'t play God (POST error)!');
        }
        return reply({
          statusCode: 200,
          message: 'We\'ve done it!!!!! Nature will find a way!'
        });
      });
    }
  },
  {
    method: 'PUT',
    path: '/dinosaur/{id}',
    handler: function(request, reply) {
      let _id = request.params.id;
      Dinosaur.findOneAndUpdate({_id}, request.payload, (err) => {
        if (err) {
          console.log('Error', err);
          return reply('UNSTABLE MUTATION! (PUT Error)');
        }
        return reply({
          statusCode: 200,
          message: 'Mutation successful! BETTER, FASTER, STRONGER!'
        });
      });
    }
  },
  {
    method: 'DELETE',
    path: '/dinosaur/{id}',
    handler: function(request, reply) {
      let _id = request.params.id;
      Dinosaur.remove({_id}, (err) => {
        if (err) {
          console.log('Error', err);
          return reply('THERE IS NO ESCAPE (Delete Error)!');
        }
        return reply({
          statusCode: 200,
          message: 'You\'re safe..... FOR NOW!'
        });
      });
    }
  },
  {
    method: '*',
    path: '/{p*}',
    handler: notFound
  }];
