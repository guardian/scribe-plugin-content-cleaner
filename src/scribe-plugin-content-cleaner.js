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
        (text) => {
            return text.replace(/(<br\s*\/?>){3,}/gi, '<br>');
        }
    ];

    return function (scribe) {
        // for now this just exposes a list of
        // commands to do the text cleanup, rather than doing it some
        // weird way with sanitizers
        var cleanupCommand = new scribe.api.Command('Cleanup');

        cleanupCommand.execute = () => {
            var content = scribe.el.innerHTML;

            var temp = filters.reduce((val, fn) => {
                return fn(val);
            }, content);

            scribe.setHTML(temp, true);
        };

        cleanupCommand.queryEnabled = () => {
            return true;
        };

        scribe.commands[COMMAND_NAME] = cleanupCommand;
    };
};
