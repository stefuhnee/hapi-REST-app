'use strict';

const chai = require('chai');
const expect = chai.expect;
const request = chai.request;
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const mongoose = require('mongoose');

const dbPort = process.env.MONGLAB_URI;
require('../server');

describe('Dinosaur tests', () => {
  after((done) => {
    process.env.MONGOLAB_URI = dbPort;
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
  it('should read a dinosaur', (done) => {
    request('localhost:3000')
    .get('/dinosaur/')
    .end(err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      done();
    });
  });
  it('should create a dinosaur' (done) => {
    request('localhost:3000')
    .post('/dinosaur/')
    .send({name: 'post dinosaur', active: false})
    .end(err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body.name).to.eql('post dinosaur');
      done();
    });
  });
});

describe('test that need Dinosaurs', () => {
  let testDinosaur;
  beforeEach((done) => {
    let newDinosaur = new Dinosaur({name: 'test', active: true});
    new Dinosaur.save = ((err, dinosaur) => {
      testDinosaur = dinosaur;
      done();
    });
  });
  it('should update a Dinosaur', (done) => {
    testDinosaur.name = 'updated';
    request('localhost:3000')
    .put('/dinosaur')
    .end(err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body.message).to.eql('Mutation successful! BETTER, FASTER, STRONGER!');
      done();
    });
  });
  it('should delete a Dinosaur', (done) => {
    request('localhost:3000')
    .delete('/dinosaur/' + testDinosaur)
  })
})
