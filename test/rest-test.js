'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const mongoose = require('mongoose');
const expect = chai.expect;
const request = chai.request;
const Dinosaur = require('../schema/dinosaur');

const dbPort = process.env.MONGLAB_URI;
require('../lib/server');

describe('404 handling tests', () => {

  it('should give a status of 404 if an unsupported route is hit', (done) => {
    request('localhost:3000')
    .get('/test')
    .end((err, res) => {
      expect(err).to.not.eql(null);
      expect(res).to.have.status(404);
      expect(res.text).to.eql('Page not found.');
      done();
    });
  });
});

describe('Dinosaur tests', () => {

  after((done) => {
    process.env.MONGOLAB_URI = dbPort;
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should retrieve a list of dinosaurs', (done) => {
    request('localhost:3000')
    .get('/dinosaur')
    .end((err, res) => {
      if (err) return;
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body.message).to.eql('Your scientists were so preoccupied with whether they could, they didn\'t stop to think if they should.');
      expect(Array.isArray(res.body.dinosaur)).to.eql(true);
      done();
    });
  });

  it('should create/post a dinosaur', (done) => {
    request('localhost:3000')
    .post('/dinosaur')
    .send({name: 'post dinosaur', carnivore: false, speed: 'sluggish', attackPower:0, defensePower:10})
    .end((err, res) => {
      if (err) return;
      let dinosaur = res.body.dinosaur;
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(dinosaur.name).to.eql('post dinosaur');
      expect(dinosaur.carnivore).to.eql(false);
      expect(dinosaur.speed).to.eql('sluggish');
      expect(dinosaur.attackPower).to.eql(0);
      expect(dinosaur.defensePower).to.eql(10);
      expect(res.body.message).to.eql('We\'ve done it!!!!! Life, uh, finds a way!');
      done();
    });
  });

  describe('tests that need Dinosaurs', () => {
    let testDinosaur;

    beforeEach((done) => {
      testDinosaur = new Dinosaur({name: 'test', carnivore: true, speed: 'quick', attackPower:3, defensePower:5});
      testDinosaur.save((err) => {
        if(err) return;
        done();
      });
    });

    it('should update a Dinosaur', (done) => {
      testDinosaur.name = 'updated';
      request('localhost:3000')
      .put('/dinosaur')
      .send(testDinosaur)
      .end((err, res) => {
        let dinosaur = res.body.dinosaur;
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(dinosaur.name).to.eql('updated');
        expect(dinosaur.carnivore).to.eql(true);
        expect(dinosaur.speed).to.eql('quick');
        expect(dinosaur.attackPower).to.eql(3);
        expect(dinosaur.defensePower).to.eql(5);
        expect(res.body.message).to.eql('Mutation successful! BETTER, FASTER, STRONGER!');
        done();
      });
    });

    it('should delete a Dinosaur', (done) => {
      request('localhost:3000')
      .delete('/dinosaur/' + testDinosaur._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(JSON.parse(res.text).message).to.eql('If you gotta go, you gotta go.');
        done();
      });
    });
  });
});
