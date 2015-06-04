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

describe('scribe-plugin-content-cleaner', () => {
    givenContentOf('<p>content -- </p>', () => {
        when('the command is executed', () => {
            beforeEach(clickCleanup);

            it('should replace the -- with an endash', () => {
                return scribeNode.getInnerHTML().then((innerHTML) => {
                    expect(innerHTML).to.include('<p>content – </p>');
                });
            });
        });
    });

    givenContentOf('<p>1900 - 1950</p>', () => {
        when('the command is executed', () => {
            beforeEach(clickCleanup);

            it('should add spacing and an endash', () => {
                return scribeNode.getInnerHTML().then((innerHTML) => {
                    expect(innerHTML).to.include('<p>1900 – 1950</p>');
                })
            });
        })
    });


    givenContentOf('<p>1900 -- 1950</p>', () => {
        when('the command is executed', () => {
            beforeEach(clickCleanup);

            it('should add spacing and an endash', () => {
                return scribeNode.getInnerHTML().then((innerHTML) => {
                    expect(innerHTML).to.include('<p>1900 – 1950</p>');
                })
            });
        })
    });

    givenContentOf('<p>1900--1950</p>', () => {
        when('the command is executed', () => {
            beforeEach(clickCleanup);

            it('should add spacing and an endash', () => {
                return scribeNode.getInnerHTML().then((innerHTML) => {
                    expect(innerHTML).to.include('<p>1900 – 1950</p>');
                })
            });
        })
    });

    givenContentOf('<p>1900-1950</p>', () => {
        when('the command is executed', () => {
            beforeEach(clickCleanup);

            it('should add spacing and an endash', () => {
                return scribeNode.getInnerHTML().then((innerHTML) => {
                    expect(innerHTML).to.include('<p>1900 – 1950</p>');
                })
            });
        })
    });

});
