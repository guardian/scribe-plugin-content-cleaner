var helpers = require('scribe-test-harness/helpers');
var loadScribe = require('./helpers.js');
var intialiseScribe = helpers.initializeScribe;

before(function() {

});

beforeEach(function() {
    return intialiseScribe('scribe');
});


beforeEach(function() {
    return loadScribe();
});
