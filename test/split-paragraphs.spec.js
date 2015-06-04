var chai = require('chai');
var webdriver = require('selenium-webdriver');
var helpers = require('scribe-test-harness/helpers');

var expect = chai.expect;

var when = helpers.when;
var given = helpers.given;
var givenContentOf = helpers.givenContentOf;
var executeCommand = helpers.executeCommand;

var scribeNode;

var driver;

before(function () {
    driver = helpers.driver;
});

beforeEach(function() {
    scribeNode = helpers.scribeNode;
});

function clickCleanup() {
    scribeNode.click();
    return executeCommand('cleanup');
}

describe('Split sentences', () => {

    givenContentOf('<p>test?<br><br/><br><br/>word</p>', () => {
        when('the command is executed', () => {
            beforeEach(clickCleanup);


            it('should leave only a single BR', () => {
                return scribeNode.getInnerHTML().then((innerHTML) => {
                    expect(innerHTML).to.include('<p>test?<br>word</p>');
                });
            });
        });
    });

    givenContentOf('<p>Dramatic<br>ending!</p>', () => {
        when('the command is executed', () => {
            beforeEach(clickCleanup);


            it('should leave only a single BR', () => {
                return scribeNode.getInnerHTML().then((innerHTML) => {
                    expect(innerHTML).to.include('<p>Dramatic ending!</p>');
                });
            });
        });
    });

});
