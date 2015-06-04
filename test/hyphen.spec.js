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

describe('Hyphen cleaining', () => {
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

    ['<p>1900 - 1950</p>',
        '<p>1900 -- 1950</p>',
        '<p>1900--1950</p>',
        '<p>1900 --1950</p>',
        '<p>1900-- 1950</p>'].forEach((inputString) => {
        givenContentOf(inputString, () => {
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

    ['<p>1607–1833</p>',
        '<p>1607– 1833</p>',
        '<p>1607 –1833</p>'].forEach((inputString) => {
        givenContentOf(inputString, () => {
            when('the command is executed', () => {
                beforeEach(clickCleanup);

                it('should add spacing and an endash', () => {
                    return scribeNode.getInnerHTML().then((innerHTML) => {
                        expect(innerHTML).to.include('<p>1607 – 1833</p>');
                    })
                });
            })
        });
    });


    givenContentOf('<p>happy--ending</p>', () => {
        when('the command is executed', () => {
            beforeEach(clickCleanup);

            it('should add spacing and an endash', () => {
                return scribeNode.getInnerHTML().then((innerHTML) => {
                    expect(innerHTML).to.include('<p>happy – ending</p>');
                })
            });
        })
    });


    givenContentOf('<p>happy--ending mother-in-law 1923 -- 1926 <i>Hello --Joe Smith</i></p><p>Pages 86-- 90</p>', () => {
        when('the command is executed', () => {
            beforeEach(clickCleanup);

            it('should add spacing and an endash', () => {
                return scribeNode.getInnerHTML().then((innerHTML) => {
                    expect(innerHTML).to.include('<p>happy – ending mother-in-law 1923 – 1926 <i>Hello – Joe Smith</i></p><p>Pages 86 – 90</p>');
                })
            });
        })
    });


});
