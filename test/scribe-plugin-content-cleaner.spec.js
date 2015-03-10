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

    givenContentOf('<p>word&nbsp;&nbsp;a&nbsp;&nbsp;&nbsp;b</p>', () => {
        when('the command is executed', () => {
            beforeEach(() =>  {
                scribeNode.click();
                return executeCommand('cleanup');
            });


            it('should make all double (or more) &nbsps; single spaces', () => {
                return scribeNode.getInnerHTML().then((innerHTML) => {
                    expect(innerHTML).to.include('<p>word a b</p>');
                });
            });
        });
    });

    givenContentOf('<p>word</p><p> </p><p><br></p>', () => {
        when('the command is executed', () => {
            beforeEach(() =>  {
                scribeNode.click();
                return executeCommand('cleanup');
            });


            it('should remove all empty paragraphs', () => {
                return scribeNode.getInnerHTML().then((innerHTML) => {
                    expect(innerHTML).to.include('<p>word</p>');
                });
            });
        });
    });


    givenContentOf('<p><br><br/><br><br/></p>', () => {
        when('the command is executed', () => {
            beforeEach(() =>  {
                scribeNode.click();
                return executeCommand('cleanup');
            });


            it('should leave only a single BR', () => {
                return scribeNode.getInnerHTML().then((innerHTML) => {
                    expect(innerHTML).to.include('<p><br></p>');
                });
            });
        });
    });

    givenContentOf('<p>some content</p><p>and more</p>', () => {
        when('the command is executed', () => {
            beforeEach(() =>  {
                scribeNode.click();
                return executeCommand('cleanup');
            });


            it('should leave multiple paragraphs alone', () => {
                return scribeNode.getInnerHTML().then((innerHTML) => {
                    expect(innerHTML).to.include('<p>some content</p><p>and more</p>');
                });
            });
        });
    });

    givenContentOf('<p>some <gu-note>content</gu-note></p>', () => {
        when('the command is executed', () => {
            beforeEach(() =>  {
                scribeNode.click();
                return executeCommand('cleanup');
            });

            it('should not remove any notes', () => {
                return scribeNode.getInnerHTML().then((innerHTML) => {
                    expect(innerHTML).to.include('<p>some <gu-note>content</gu-note></p>');
                });
            });
        });
    });



});
