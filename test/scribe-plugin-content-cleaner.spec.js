var chai = require('chai');
var webdriver = require('selenium-webdriver');
var helpers = require('scribe-test-harness/helpers');

var expect = chai.expect;

var when = helpers.when;
var given = helpers.given;
var givenContentOf = helpers.givenContentOf;

var scribeNode;
beforeEach(function() {
  scribeNode = helpers.scribeNode;
});

describe('scribe-plugin-content-cleaner', function() {
    givenContentOf('<p>--</p>', function () {
        it('should replace the -- with an &emdash', function () {
            return scribeNode.getInnerHTML().then(function (innerHTML) {
                expect(innerHTML).to.have('<p>&emdash;</p>');
            });
        });
    });

});
