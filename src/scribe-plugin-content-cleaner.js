module.exports = function(scribe) {
    'use strict';

    var COMMAND_NAME = "cleanup";

    var filters = [
        (text) => {
            return text.replace(/\s+/g, " ");
        },
        (text) => {
            return text.replace(/--/g, "&mdash;");


        },
        (test) => {
            return test.replace(/(<br\s*\/?>){3,}/gi, '<br>');
        }
    ];

    return function (scribe) {
        // for now this just exposes a list of
        // commands to do the text cleanup, rather than doing it some
        // weird way with sanitizers
        var cleanupCommand = new scribe.api.Command();

        cleanupCommand.execute = () => {
            var content = scribe.el.innerText;

            var temp = filters.reduce((val, fn) => {
                return fn(val);
            }, content);

            scribe.setContent(temp);
        };

        cleanupCommand.queryEnabled = () => {
            return true;
        };

        scribe.commands[COMMAND_NAME] = cleanupCommand;
    };
};
