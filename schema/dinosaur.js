'use strict';

const mongoose = require('mongoose');

const Dinosaur = mongoose.Schema({
  name: String,
  carnivore: Boolean,
  speed: String,
  defensePower: Number,
  attackPower: Number
});

module.exports = mongoose.model('dinosaur', Dinosaur);
