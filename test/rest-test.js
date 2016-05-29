'use strict';

const chai = require('chai');
const expect = chai.expect;
const request = chai.request;
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const mongoose = require('mongoose');

const dbPort = process.env.MONGLAB_URI;
require('../server');
