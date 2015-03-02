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

describe('scribe-plugin-content-cleaner', () => {
    givenContentOf('<p>content --</p>', () => {
        when('the command is executed', () => {
            beforeEach(() =>  {
                scribeNode.click();
                return executeCommand('cleanup');
            });

            it('should replace the -- with an emdash', () => {
                return scribeNode.getInnerHTML().then((innerHTML) => {
                    expect(innerHTML).to.include('<p>content —</p>');
                });
            });
        });
    });


    givenContentOf('<p>word  a   b</p>', () => {
        when('the command is executed', () => {
            beforeEach(() =>  {
                scribeNode.click();
                return executeCommand('cleanup');
            });


            it('should make all double (or more) whitespaces single spaces', () => {
                return scribeNode.getInnerHTML().then((innerHTML) => {
                    expect(innerHTML).to.include('<p>word a b</p>');
                });
            });
        });
    });

    givenContentOf('<p><br/><br><br/></p>', () => {
        when('the command is executed', () => {
            beforeEach(() =>  {
                scribeNode.click();
                return executeCommand('cleanup');
            });


            it('should leave only a single BR', () => {
                return scribeNode.getInnerHTML().then((innerHTML) => {
                    expect(innerHTML).to.include('<p> <br></p>');
                });
            });
        });
    });
});
