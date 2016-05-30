'use strict';

const chai = require('chai');
const expect = chai.expect;
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const mongoose = require('mongoose');
const request = chai.request;
const Dinosaur = require('../schema/dinosaur');

const dbPort = process.env.MONGLAB_URI;
require('../lib/server');

describe('Dinosaur tests', () => {
  after((done) => {
    process.env.MONGOLAB_URI = dbPort;
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
  it('should read a dinosaur', (done) => {
    request('localhost:3000')
    .get('/dinosaur')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      done();
    });
  });
  it('should create a dinosaur', (done) => {
    request('localhost:3000')
    .post('/dinosaur')
    .send({name: 'post dinosaur', active: false})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(JSON.parse(res.text).message).to.include('We\'ve done it!!!!! Nature will find a way!');
      done();
    });
  });

  describe('test that need Dinosaurs', () => {
    let testDinosaur;
    beforeEach((done) => {
      let newDinosaur = new Dinosaur({name: 'test', carnivore: true});
      newDinosaur.save((err, dinosaur) => {
        if(err) return;
        testDinosaur = dinosaur;
        done();
      });
    });
    it('should update a Dinosaur', (done) => {
      testDinosaur.name = 'updated';
      request('localhost:3000')
      .put('/dinosaur')
      .send(testDinosaur)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(JSON.parse(res.text).message).to.eql('Mutation successful! BETTER, FASTER, STRONGER!');
        done();
      });
    });
    it('should delete a Dinosaur', (done) => {
      request('localhost:3000')
      .delete('/dinosaur/' + testDinosaur._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(JSON.parse(res.text).message).to.eql('You\'re safe..... FOR NOW!');
        done();
      });
    });
  });
});
