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
    givenContentOf('<p>content --</p>', function () {
        console.log("Running it statement...");
        it('should replace the -- with an &emdash', function () {
            console.log("Doing the async script...");
            console.log("Scribe node: ", scribeNode);
            return scribeNode.getInnerHTML().then(function (innerHTML) {
                console.log("HTML: ", innerHTML);
                expect(innerHTML).to.have('<p>content &emdash;</p>');
            });
        });
    });
});
