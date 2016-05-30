'use strict';

const Dinosaur = require('../schema/dinosaur');

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
      if (!request.payload) return reply('Bad request').code(400);
      let newDinosaur = new Dinosaur(request.payload);
      newDinosaur.save((err, dinosaur) => {
        if (err) {
          console.log('Error', err);
          return reply('You can\'t play God (POST error)!');
        }
        return reply({
          statusCode: 200,
          message: 'We\'ve done it!!!!! Life, uh, finds a way!',
          dinosaur: dinosaur
        });
      });
    }
  },
  {
    method: 'PUT',
    path: '/dinosaur',
    handler: function(request, reply) {
      let _id = request.params.id;
      if (!request.payload) return reply('Bad request').code(400);
      Dinosaur.findOneAndUpdate({_id}, request.payload, (err) => {
        if (err) {
          console.log('Error', err);
          return reply('UNSTABLE MUTATION! (PUT Error)');
        }
        return reply({
          statusCode: 200,
          message: 'Mutation successful! BETTER, FASTER, STRONGER!',
          dinosaur: request.payload
        });
      });
    }
  },
  {
    method: 'DELETE',
    path: '/dinosaur/{id}',
    handler: function(request, reply) {
      let _id = request.params.id;
      Dinosaur.remove({_id}, (err, dinosaur) => {
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
    handler: function(request, reply) {
      return reply('Page not found.').code(404);
    }
  }];
