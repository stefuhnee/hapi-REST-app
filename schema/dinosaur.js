'use strict';

const mongoose = require('mongoose');

const Dinosaur = mongoose.Schema({
  carnivore: Boolean,
  speed: String,
  defensePower: Number,
  attackPower: Number
});

module.exports = mongoose.model('dinosaur', Dinosaur);
