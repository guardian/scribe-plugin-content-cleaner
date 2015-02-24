var helpers = require('scribe-test-harness/helpers');
var initializeScribe = helpers.initializeScribe.bind(null, '../../bower_components/scribe/scribe');

before(function(){

});

beforeEach(function(){
  return initializeScribe();
});
