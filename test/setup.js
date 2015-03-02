var helpers = require('scribe-test-harness/helpers');
var initializeScribe = helpers.initializeScribe.bind(null, 'scribe');
var loadPlugin = require('./helpers/load-plugin.js');

beforeEach(function(){
  return initializeScribe();
});

beforeEach(function(){
  return loadPlugin();
});
